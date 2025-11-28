import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getCurrentUser } from '@/services/apiAuth'
import { useEffect } from 'react'
import supabase from '@/services/supabase'

export function useUser() {
	const queryClient = useQueryClient()

	const {
		isPending: isLoading,
		error,
		data: user,
	} = useQuery({
		queryKey: ['user'],
		queryFn: getCurrentUser,
	})

	useEffect(() => {
		const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
			if (session?.user) {
				queryClient.setQueryData(['user'], session.user)
			} else {
				queryClient.setQueryData(['user'], null)
			}
		})

		return () => authListener.subscription.unsubscribe()
	}, [queryClient])

	return { user, error, isLoading, isAuthenticated: Boolean(user) }
}
