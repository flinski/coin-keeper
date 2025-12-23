import { Spinner } from '@/components/ui/spinner'
import AddTransactionDialog from '@/features/transactions/AddTransactionDialog'
import TransactionList from '@/features/transactions/TransactionList'
import { useTransactions } from '@/features/transactions/useTransactions'
import Container from '@/ui/Container'
import ErrorMessage from '@/ui/ErrorMessage'
import PageHeader from '@/ui/PageHeader'

export default function TransactionsPage() {
	const { transactions, error, isLoading } = useTransactions()

	if (isLoading) {
		return (
			<div className="flex h-full items-center justify-center">
				<Spinner className="text-accent-600 size-12" />
			</div>
		)
	}

	if (error) {
		return <ErrorMessage message={`Error: ${error.message}`} screen={true} />
	}

	if (!transactions) {
		return <ErrorMessage message="Something went wrong. Please try again later." screen={true} />
	}

	console.log('transactions:', transactions)

	return (
		<div>
			<PageHeader title="Your transactions">
				<AddTransactionDialog />
			</PageHeader>
			<Container>
				<div className="bg-ui-50 border-ui-200 flex flex-col gap-2 rounded-xl border px-5 py-6">
					<div className="grid grid-cols-5 items-center gap-4 rounded-sm px-2 py-1 font-medium">
						<div>Account</div>
						<div>Type</div>
						<div>Category</div>
						<div>Comment</div>
						<div className="text-right">Amount</div>
					</div>
					<TransactionList transactions={transactions} />
				</div>
			</Container>
		</div>
	)
}
