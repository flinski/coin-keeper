import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTransaction as createTransactionApi } from '@/services/apiTransactions'

export function useCreateTransaction() {
	const queryClient = useQueryClient()

	const { mutate: createTransaction, isPending: isLoading } = useMutation({
		mutationFn: createTransactionApi,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['transactions'] })
		},
	})

	return { createTransaction, isLoading }
}
