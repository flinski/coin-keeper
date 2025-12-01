import { useMutation, useQueryClient } from '@tanstack/react-query'
import { editAccount as editAccountApi } from '@/services/apiAccounts'

export function useEditAccount() {
	const queryClient = useQueryClient()

	const { mutate: editAccount, isPending: isLoading } = useMutation({
		mutationFn: editAccountApi,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['accounts'] })
		},
	})

	return { editAccount, isLoading }
}
