import { signout as signoutApi } from '@/services/apiAuth'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'

export function useSignout() {
	const navigate = useNavigate()
	const queryClient = useQueryClient()

	const { mutate: signout, isPending: isLoading } = useMutation({
		mutationFn: signoutApi,
		onSuccess: () => {
			queryClient.removeQueries()
			navigate('/login', { replace: true })
		},
	})

	return { signout, isLoading }
}
