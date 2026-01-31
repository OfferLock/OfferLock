// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title 留学中介托管支付合约（OfferEscrow）
/// @notice 支持多里程碑：拿 offer、完成注册、成功入学等

contract OfferEscrow {
    // 订单状态
    enum OrderStatus {
        Created,    // 已创建，待学生打款
        Funded,     // 学生已打款
        InProgress, // 部分里程碑已释放
        Completed,  // 所有里程碑释放完成
        Refunded    // 已退款
    }

    // 订单数据结构
    struct Order {
        address student;          // 学生
        address provider;         // 中介/服务商
        uint256 totalAmount;      // 订单总金额（约定值）
        uint256 depositedAmount;  // 实际已打入的金额
        uint256[] milestoneAmounts; // 每个里程碑应释放的金额
        uint256 releasedAmount;   // 已经释放给中介的金额
        uint256 currentMilestone; // 当前进行到第几个里程碑（索引）
        OrderStatus status;       // 状态
        bool exists;              // 是否存在
    }

    // 订单 ID 自增
    uint256 public nextOrderId;

    // 订单存储
    mapping(uint256 => Order) public orders;

    // 审核方（可以是平台运营 / AI Agent 的控制钱包）
    address public auditor;

    // 事件
    event OrderCreated(
        uint256 indexed orderId,
        address indexed student,
        address indexed provider,
        uint256 totalAmount
    );

    event FundDeposited(
        uint256 indexed orderId,
        address indexed student,
        uint256 amount
    );

    event MilestoneReleased(
        uint256 indexed orderId,
        uint256 milestoneIndex,
        uint256 amount
    );

    event Refunded(
        uint256 indexed orderId,
        uint256 amount
    );

    event AuditorChanged(address indexed oldAuditor, address indexed newAuditor);

    // 只允许审核方执行的 modifier
    modifier onlyAuditor() {
        require(msg.sender == auditor, "Not auditor");
        _;
    }

    // 确保订单存在的 modifier
    modifier onlyExistingOrder(uint256 _orderId) {
        require(orders[_orderId].exists, "Order not found");
        _;
    }

    constructor(address _auditor) {
        require(_auditor != address(0), "Auditor cannot be zero");
        auditor = _auditor;
    }

    /// @notice 审核方创建订单，配置学生、中介、里程碑金额
    /// @param _student 学生地址
    /// @param _provider 中介地址
    /// @param _milestoneAmounts 每个里程碑对应的金额数组
    function createOrder(
        address _student,
        address _provider,
        uint256[] calldata _milestoneAmounts
    ) external onlyAuditor returns (uint256) {
        require(_student != address(0), "Invalid student");
        require(_provider != address(0), "Invalid provider");
        require(_milestoneAmounts.length > 0, "No milestones");

        uint256 total;
        for (uint256 i = 0; i < _milestoneAmounts.length; i++) {
            require(_milestoneAmounts[i] > 0, "Milestone amount zero");
            total += _milestoneAmounts[i];
        }

        uint256 orderId = nextOrderId;
        nextOrderId++;

        Order storage o = orders[orderId];
        o.student = _student;
        o.provider = _provider;
        o.totalAmount = total;
        o.depositedAmount = 0;
        o.milestoneAmounts = _milestoneAmounts;
        o.releasedAmount = 0;
        o.currentMilestone = 0;
        o.status = OrderStatus.Created;
        o.exists = true;

        emit OrderCreated(orderId, _student, _provider, total);
        return orderId;
    }

    /// @notice 学生给订单打款（一次性打满 totalAmount 的简单版本）
    function deposit(uint256 _orderId) external payable onlyExistingOrder(_orderId) {
        Order storage o = orders[_orderId];

        require(msg.sender == o.student, "Only student can deposit");
        require(o.status == OrderStatus.Created || o.status == OrderStatus.Funded, "Wrong status");
        require(msg.value > 0, "No value sent");
        require(o.depositedAmount + msg.value <= o.totalAmount, "Too much");

        o.depositedAmount += msg.value;

        if (o.depositedAmount == o.totalAmount) {
            o.status = OrderStatus.Funded;
        }

        emit FundDeposited(_orderId, msg.sender, msg.value);
    }

    /// @notice 审核方确认某个里程碑完成并释放资金给中介
    /// @param _orderId 订单 ID
    function releaseNextMilestone(uint256 _orderId)
        external
        onlyAuditor
        onlyExistingOrder(_orderId)
    {
        Order storage o = orders[_orderId];

        require(
            o.status == OrderStatus.Funded || o.status == OrderStatus.InProgress,
            "Order not funded"
        );
        require(o.currentMilestone < o.milestoneAmounts.length, "All milestones done");

        uint256 index = o.currentMilestone;
        uint256 amount = o.milestoneAmounts[index];

        require(o.depositedAmount - o.releasedAmount >= amount, "Insufficient balance");

        o.releasedAmount += amount;
        o.currentMilestone++;

        if (o.currentMilestone == o.milestoneAmounts.length) {
            o.status = OrderStatus.Completed;
        } else {
            o.status = OrderStatus.InProgress;
        }

        // 转钱给中介
        (bool success, ) = o.provider.call{value: amount}("");
        require(success, "Transfer failed");

        emit MilestoneReleased(_orderId, index, amount);
    }

    /// @notice 审核方触发退款（例如中介服务终止）
    /// @dev 简化处理：直接把剩余未释放金额全部退给学生
    function refund(uint256 _orderId)
        external
        onlyAuditor
        onlyExistingOrder(_orderId)
    {
        Order storage o = orders[_orderId];

        require(
            o.status == OrderStatus.Created ||
            o.status == OrderStatus.Funded ||
            o.status == OrderStatus.InProgress,
            "Refund not allowed"
        );

        uint256 refundable = o.depositedAmount - o.releasedAmount;
        require(refundable > 0, "Nothing to refund");

        o.status = OrderStatus.Refunded;

        (bool success, ) = o.student.call{value: refundable}("");
        require(success, "Refund transfer failed");

        emit Refunded(_orderId, refundable);
    }

    /// @notice 更换审核方地址（比如从运营钱包换成新的 Agent 管理钱包）
    function changeAuditor(address _newAuditor) external onlyAuditor {
        require(_newAuditor != address(0), "Invalid auditor");
        address old = auditor;
        auditor = _newAuditor;
        emit AuditorChanged(old, _newAuditor);
    }

    /// @notice 查询订单里程碑数量（因为 milestoneAmounts 是动态数组）
    function getMilestoneCount(uint256 _orderId)
        external
        view
        onlyExistingOrder(_orderId)
        returns (uint256)
    {
        return orders[_orderId].milestoneAmounts.length;
    }

    /// @notice 查询某个里程碑金额
    function getMilestoneAmount(uint256 _orderId, uint256 _index)
        external
        view
        onlyExistingOrder(_orderId)
        returns (uint256)
    {
        return orders[_orderId].milestoneAmounts[_index];
    }
}
