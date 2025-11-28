import { AspectRatio } from '@/components/ui/aspect-ratio'
import { useAccounts } from '@/features/accounts/useAccounts'

export default function AccountList() {
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
		<ul className="grid grid-cols-3 gap-6">
			{accounts.map((account) => (
				<li key={account.id}>
					<AspectRatio ratio={2 / 1} className="rounded-xl border p-6 shadow-sm">
						<header className="mb-4 text-2xl font-semibold">{account.name}</header>
						<div className="text-4xl">{account.balance}$</div>
					</AspectRatio>
				</li>
			))}
		</ul>
	)
}
