import type { Account } from '@/services/apiAccounts'
import AccountItem from '@/features/accounts/AccountItem'

type AccountListProps = {
	accounts: Account[]
}

export default function AccountList({ accounts }: AccountListProps) {
	return (
		<ul className="grid grid-cols-3 gap-6">
			{accounts.map((account) => (
				<AccountItem key={account.id} account={account} />
			))}
		</ul>
	)
}
