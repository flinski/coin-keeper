import AccountList from '@/features/accounts/AccountList'
import AddAccountDialog from '@/features/accounts/AddAccountDialog'

export default function AccountsPage() {
	return (
		<div className="flex h-screen flex-col">
			<div className="border-ui-200 flex items-center border-b p-2">Your Accounts</div>
			<div className="grow overflow-auto">
				<div className="mx-auto flex max-w-[1440px] flex-col gap-6 p-8">
					<div className="flex items-center justify-between">
						<div></div>
						<AddAccountDialog />
					</div>
					<AccountList />
				</div>
			</div>
		</div>
	)
}
