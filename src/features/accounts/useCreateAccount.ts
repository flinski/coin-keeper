import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAccount as createAccountApi } from '@/services/apiAccounts'

export function useCreateAccount() {
	const queryClient = useQueryClient()

	const { mutate: createAccount, isPending: isLoading } = useMutation({
		mutationFn: createAccountApi,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['accounts'] })
		},
	})

	return { createAccount, isLoading }
}
