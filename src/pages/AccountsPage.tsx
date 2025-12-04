import { useAccounts } from '@/features/accounts/useAccounts'
import AccountList from '@/features/accounts/AccountList'
import AccountTotal from '@/features/accounts/AccountTotal'
import AddAccountDialog from '@/features/accounts/AddAccountDialog'
import { Button } from '@/components/ui/button'

export default function AccountsPage() {
	const { accounts, error, isLoading } = useAccounts()

	if (isLoading) {
		return <div>Loading...</div>
	}

	if (error) {
		return <div>Error: {error.message}</div>
	}

	if (!accounts) {
		return <div>Accounts not found</div>
	}

	console.log('accounts:', accounts)

	return (
		<div>
			<div className="mx-auto flex max-w-7xl flex-col gap-12 p-8">
				<AccountTotal accounts={accounts} />
				<div className="flex flex-col gap-6">
					<div className="text-4xl font-semibold">Your accounts</div>
					<div className="flex items-center justify-between">
						<Button variant="outline">Sort</Button>
						<AddAccountDialog />
					</div>
					<AccountList accounts={accounts} />
				</div>
			</div>
		</div>
	)
}
