import type { Account } from '@/services/apiAccounts'
import AccountItem from '@/features/accounts/AccountItem'
import { useUser } from '@/features/auth/useUser'

type AccountListProps = {
	accounts: Account[]
}

export default function AccountList({ accounts }: AccountListProps) {
	const { user, error, isLoading } = useUser()

	if (isLoading) {
		return <div>Loading...</div>
	}

	if (error) {
		return <div>Error: {error.message}</div>
	}

	if (!user) {
		return <div>User is not authenticated</div>
	}

	return (
		<ul className="grid grid-cols-3 gap-6">
			{accounts.map((account) => (
				<AccountItem key={account.id} account={account} username={user.user_metadata.fullName} />
			))}
		</ul>
	)
}
