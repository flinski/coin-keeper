import { useNavigate } from 'react-router'
import { useMutation } from '@tanstack/react-query'
import { signup as signupApi } from '@/services/apiAuth'

export function useSignup() {
	const navigate = useNavigate()

	const { mutate: signup, isPending: isLoading } = useMutation({
		mutationFn: signupApi,
		onSuccess: (user) => {
			console.log('User:', user)
			navigate('/dashboard')
		},
	})

	return { signup, isLoading }
}
