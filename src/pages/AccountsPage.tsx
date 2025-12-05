import { useAccounts } from '@/features/accounts/useAccounts'
import AccountList from '@/features/accounts/AccountList'
import AccountTotal from '@/features/accounts/AccountTotal'
import AddAccountDialog from '@/features/accounts/AddAccountDialog'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import ErrorMessage from '@/ui/ErrorMessage'
import Container from '@/ui/Container'
import PageHeader from '@/ui/PageHeader'

export default function AccountsPage() {
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

	return (
		<div>
			<PageHeader title="Your accounts">
				<div className="flex items-center gap-3">
					<Button variant="outline">Sort</Button>
					<AddAccountDialog />
				</div>
			</PageHeader>
			<Container className="flex flex-col gap-12">
				<AccountTotal accounts={accounts} />
				<div className="flex flex-col gap-6">
					<AccountList accounts={accounts} />
				</div>
			</Container>
		</div>
	)
}
