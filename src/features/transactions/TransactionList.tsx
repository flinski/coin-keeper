import { groupTransactionsByDate } from '@/lib/utils'
import type { Transaction } from '@/services/apiTransactions'
import TransactionGroup from './TransactionGroup'

type TransactionListProps = {
	transactions: Transaction[]
}

export default function TransactionList({ transactions }: TransactionListProps) {
	const groupedTransactions = groupTransactionsByDate(transactions)

	return (
		<ul className="flex flex-col gap-6">
			{Object.entries(groupedTransactions).map(([date, transactionsByDate]) => (
				<TransactionGroup key={date} date={date} transactions={transactionsByDate} />
			))}
		</ul>
	)
}
