import { useQuery } from '@tanstack/react-query'
import { getAccount } from '@/services/apiAccounts'

export function useAccount(id: string) {
	const {
		data: account,
		error,
		isPending: isLoading,
	} = useQuery({
		queryKey: ['account', id],
		queryFn: () => getAccount(id),
	})

	return { account, error, isLoading }
}
