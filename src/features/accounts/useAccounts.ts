import { useQuery } from '@tanstack/react-query'
import { getAccounts } from '@/services/apiAccounts'

export function useAccounts() {
	const {
		data: accounts,
		error,
		isPending: isLoading,
	} = useQuery({
		queryKey: ['accounts'],
		queryFn: getAccounts,
	})

	return { accounts, error, isLoading }
}
