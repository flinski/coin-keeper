import { useQuery } from '@tanstack/react-query'
import { getCurrentMonthTransactions } from '@/services/apiDashboard'

export function useCurrentMonthTransactions(type: string) {
	const {
		data: currentMonthTransactions,
		error,
		isPending: isLoading,
	} = useQuery({ queryKey: ['dashboard', type], queryFn: () => getCurrentMonthTransactions(type) })

	return { currentMonthTransactions, error, isLoading }
}
