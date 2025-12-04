import { formatCurrency } from '@/lib/utils'
import type { Account } from '@/services/apiAccounts'

type AccountTotalProps = {
	accounts: Account[]
}

export default function AccountTotal({ accounts }: AccountTotalProps) {
	const total = accounts.reduce((acc, cur) => acc + cur.balance, 0)

	return (
		<div className="flex flex-col gap-2">
			<div className="text-ui-500 text-lg">Total balance</div>
			<div className="text-ui-900 text-6xl font-bold tabular-nums">{formatCurrency(total)}</div>
		</div>
	)
}
