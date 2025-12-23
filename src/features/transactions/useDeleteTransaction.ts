import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteTransaction as deleteTransactionApi } from '@/services/apiTransactions'

export function useDeleteTransaction() {
	const queryClient = useQueryClient()

	const { mutate: deleteTransaction, isPending: isLoading } = useMutation({
		mutationFn: deleteTransactionApi,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['transactions'],
			})
		},
	})

	return { deleteTransaction, isLoading }
}
