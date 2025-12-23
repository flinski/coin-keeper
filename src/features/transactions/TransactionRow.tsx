import { cn, formatCurrency } from '@/lib/utils'
import type { Transaction } from '@/services/apiTransactions'
import { CATEGORY_ICONS } from '../categories/icons'
import { bgColorMap200, textColorMap700 } from '@/lib/constants'

type TransactionRowProps = {
	transaction: Transaction
}

export default function TransactionRow({ transaction }: TransactionRowProps) {
	const { account, category, type, amount, comment, transfer_account } = transaction
	const { name: accountName } = account
	const categoryName = category ? category.name : ''
	const categoryIcon = category ? category.icon : ''
	const categoryColor = category ? category.color : ''
	const Icon = CATEGORY_ICONS.find((icon) => icon.id === categoryIcon)?.icon

	return (
		<li className="hover:bg-ui-100 grid grid-cols-5 items-center gap-4 rounded-sm px-2 py-1">
			<div>{accountName}</div>
			<div
				className={cn(
					'font-medium capitalize',
					type === 'income' && 'text-emerald-600',

					type === 'transfer' && 'text-blue-600'
				)}
			>
				{type}
			</div>
			{category ? (
				<div className="flex items-center">
					<div
						className={cn(
							'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-sm font-medium',
							bgColorMap200[categoryColor],
							textColorMap700[categoryColor]
						)}
					>
						{Icon && <Icon size={16} />}
						<div>{categoryName}</div>
					</div>
				</div>
			) : (
				<div>{transfer_account?.name}</div>
			)}
			<div className="text-ui-950/50">{comment}</div>
			<div
				className={cn(
					'text-right font-semibold tabular-nums',
					type === 'income' && 'text-emerald-600'
				)}
			>
				{formatCurrency(amount)}
			</div>
		</li>
	)
}
