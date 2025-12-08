import { useSearchParams } from 'react-router'
import { useAccounts } from '@/features/accounts/useAccounts'
import AccountList from '@/features/accounts/AccountList'
import AccountTotal from '@/features/accounts/AccountTotal'
import AddAccountDialog from '@/features/accounts/AddAccountDialog'
import { Spinner } from '@/components/ui/spinner'
import ErrorMessage from '@/ui/ErrorMessage'
import Container from '@/ui/Container'
import PageHeader from '@/ui/PageHeader'
import SortBy from '@/ui/SortBy'

const sortByOptions = [
	{ value: 'date-asc', label: 'Date (old first)' },
	{ value: 'date-desc', label: 'Date (new first)' },
	{ value: 'balance-asc', label: 'Balance (low first)' },
	{ value: 'balance-desc', label: 'Balance (high first)' },
]

export default function AccountsPage() {
	const [searchParams] = useSearchParams()
	const { accounts, error, isLoading } = useAccounts()

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

	if (!accounts) {
		return <ErrorMessage message="Something went wrong. Please try again later." screen={true} />
	}

	console.log('accounts:', accounts)

	const sortBy = searchParams.get('sortBy') ?? 'date-asc'
	const [field, direction] = sortBy.split('-')
	const modifier = direction === 'asc' ? 1 : -1
	const sortedAccounts = accounts.sort((a, b) => {
		switch (field) {
			case 'date':
				return (new Date(a.created_at).getTime() - new Date(b.created_at).getTime()) * modifier

			case 'balance':
				return (a.balance - b.balance) * modifier

			default:
				return 0
		}
	})

	return (
		<div>
			<PageHeader title="Your accounts">
				<div className="flex items-center gap-3">
					<SortBy options={sortByOptions} placeholder="Sort by" />
					<AddAccountDialog />
				</div>
			</PageHeader>
			<Container className="flex flex-col gap-12">
				<AccountTotal accounts={accounts} />
				<div className="flex flex-col gap-6">
					<AccountList accounts={sortedAccounts} />
				</div>
			</Container>
		</div>
	)
}
