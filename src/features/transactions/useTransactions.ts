import { getTransactions } from '@/services/apiTransactions'
import { useQuery } from '@tanstack/react-query'

export function useTransactions() {
	const {
		data: transactions,
		error,
		isPending: isLoading,
	} = useQuery({ queryKey: ['transactions'], queryFn: getTransactions })

	return { transactions, error, isLoading }
}
