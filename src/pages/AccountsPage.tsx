import { useAccounts } from '@/features/accounts/useAccounts'
import AccountList from '@/features/accounts/AccountList'
import AccountTotal from '@/features/accounts/AccountTotal'
import AddAccountDialog from '@/features/accounts/AddAccountDialog'

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

	console.log(accounts)

	return (
		<div className="flex h-screen flex-col">
			<div className="border-ui-200 flex items-center border-b p-2">Your Accounts</div>
			<div className="grow overflow-auto">
				<div className="mx-auto flex max-w-[1440px] flex-col gap-6 p-8">
					<AccountTotal accounts={accounts} />
					<div className="flex items-center justify-between">
						<div></div>
						<AddAccountDialog />
					</div>
					<AccountList accounts={accounts} />
				</div>
			</div>
		</div>
	)
}
