import { useNavigate } from 'react-router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { signin as signinApi } from '@/services/apiAuth'

export function useSignin() {
	const navigate = useNavigate()
	const queryClient = useQueryClient()

	const { mutate: signin, isPending: isLoading } = useMutation({
		mutationFn: signinApi,
		onSuccess: (user) => {
			console.log('User:', user)
			queryClient.setQueryData(['user'], user.user)
			navigate('/dashboard', { replace: true })
		},
	})

	return { signin, isLoading }
}
