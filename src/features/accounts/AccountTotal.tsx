import type { Account } from '@/services/apiAccounts'

type AccountTotalProps = {
	accounts: Account[]
}

export default function AccountTotal({ accounts }: AccountTotalProps) {
	const total = accounts.reduce((acc, cur) => acc + cur.balance, 0)

	return (
		<div className="flex flex-col items-center gap-1">
			<div className="text-ui-500 text-xl">Total:</div>
			<div className="text-4xl">{total}$</div>
		</div>
	)
}
