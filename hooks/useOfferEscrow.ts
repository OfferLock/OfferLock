import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useAccount, useReadContracts } from 'wagmi'
import { OFFER_ESCROW_ABI, CONTRACT_ADDRESS } from '@/constants/contracts'
import { useCallback } from 'react'

export function useAuditor() {
    return useReadContract({
        address: CONTRACT_ADDRESS,
        abi: OFFER_ESCROW_ABI,
        functionName: 'auditor',
    })
}

export function useNextOrderId() {
    return useReadContract({
        address: CONTRACT_ADDRESS,
        abi: OFFER_ESCROW_ABI,
        functionName: 'nextOrderId',
    })
}

export function useOrder(orderId: bigint) {
    // Read basic order info
    const orderResult = useReadContract({
        address: CONTRACT_ADDRESS,
        abi: OFFER_ESCROW_ABI,
        functionName: 'orders',
        args: [orderId],
    })

    // Read milestone count
    const countResult = useReadContract({
        address: CONTRACT_ADDRESS,
        abi: OFFER_ESCROW_ABI,
        functionName: 'getMilestoneCount',
        args: [orderId],
    })

    return {
        order: orderResult,
        milestoneCount: countResult,
    }
}

// Hook to fetch milestone amounts - usually we'd want to fetch these if we know the count
export function useMilestoneAmounts(orderId: bigint, count: number) {
    const contracts = Array.from({ length: count }).map((_, idx) => ({
        address: CONTRACT_ADDRESS,
        abi: OFFER_ESCROW_ABI,
        functionName: 'getMilestoneAmount',
        args: [orderId, BigInt(idx)],
    }))

    return useReadContracts({
        contracts,
    })
}

export function useAllOrders() {
    const { data: nextId } = useNextOrderId()

    const orderIds = nextId ? Array.from({ length: Number(nextId) }, (_, i) => BigInt(i)) : []

    const contracts = orderIds.map(id => ({
        address: CONTRACT_ADDRESS,
        abi: OFFER_ESCROW_ABI,
        functionName: 'orders',
        args: [id],
    }))

    return useReadContracts({
        contracts,
        query: {
            enabled: !!nextId && Number(nextId) > 0,
        }
    })
}

export function useWriteOfferEscrow() {
    const { writeContractAsync, data: hash, isPending } = useWriteContract()
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
    })

    const createOrder = useCallback(async (student: string, provider: string, amounts: bigint[]) => {
        return writeContractAsync({
            address: CONTRACT_ADDRESS,
            abi: OFFER_ESCROW_ABI,
            functionName: 'createOrder',
            args: [student as `0x${string}`, provider as `0x${string}`, amounts],
        })
    }, [writeContractAsync])

    const deposit = useCallback(async (orderId: bigint, value: bigint) => {
        return writeContractAsync({
            address: CONTRACT_ADDRESS,
            abi: OFFER_ESCROW_ABI,
            functionName: 'deposit',
            args: [orderId],
            value: value,
        })
    }, [writeContractAsync])

    const releaseNextMilestone = useCallback(async (orderId: bigint) => {
        return writeContractAsync({
            address: CONTRACT_ADDRESS,
            abi: OFFER_ESCROW_ABI,
            functionName: 'releaseNextMilestone',
            args: [orderId],
        })
    }, [writeContractAsync])

    const refund = useCallback(async (orderId: bigint) => {
        return writeContractAsync({
            address: CONTRACT_ADDRESS,
            abi: OFFER_ESCROW_ABI,
            functionName: 'refund',
            args: [orderId],
        })
    }, [writeContractAsync])

    return {
        createOrder,
        deposit,
        releaseNextMilestone,
        refund,
        hash,
        isPending,
        isConfirming,
        isConfirmed,
    }
}
