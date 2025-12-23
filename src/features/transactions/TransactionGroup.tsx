import { format } from 'date-fns'
import type { Transaction } from '@/services/apiTransactions'
import TransactionRow from './TransactionRow'

type TransactionGroupProps = {
	date: string
	transactions: Transaction[]
}

export default function TransactionGroup({ date, transactions }: TransactionGroupProps) {
	return (
		<li>
			<div className="text-ui-950/50 mb-1 pl-2 text-sm font-semibold">
				{format(new Date(date), 'E, MMMM d').toUpperCase()}
			</div>
			<ul>
				{transactions.map((transaction) => (
					<TransactionRow key={transaction.id} transaction={transaction} />
				))}
			</ul>
		</li>
	)
}
