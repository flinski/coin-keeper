import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteAccount as deleteAccountApi } from '@/services/apiAccounts'

export function useDeleteAccount() {
	const queryClient = useQueryClient()

	const { mutate: deleteAccount, isPending: isLoading } = useMutation({
		mutationFn: deleteAccountApi,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['accounts'],
			})
		},
	})

	return { deleteAccount, isLoading }
}
