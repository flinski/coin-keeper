import { cn, formatCurrency } from '@/lib/utils'
import type { Account } from '@/services/apiAccounts'

type AccountTotalProps = {
	accounts: Account[]
}

export default function AccountTotal({ accounts }: AccountTotalProps) {
	const total = accounts.reduce((acc, cur) => acc + cur.balance, 0)

	return (
		<div className="flex flex-col gap-2">
			<div className="text-ui-950/50 text-lg font-medium">Total balance</div>
			<div
				className={cn(
					'text-6xl font-bold tabular-nums',
					total > 0 && 'text-emerald-600',
					total < 0 && 'text-rose-600'
				)}
			>
				{formatCurrency(total)}
			</div>
		</div>
	)
}
