import { EllipsisVertical, Trash2 } from 'lucide-react'
import { cn, formatCurrency } from '@/lib/utils'
import { type Transaction } from '@/services/apiTransactions'
import { CATEGORY_ICONS } from '../categories/icons'
import { bgColorMap200, textColorMap700 } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { useDeleteTransaction } from './useDeleteTransaction'

type TransactionRowProps = {
	transaction: Transaction
}

export default function TransactionRow({ transaction }: TransactionRowProps) {
	const { deleteTransaction } = useDeleteTransaction()
	const { account, category, type, amount, comment, transfer_account } = transaction
	const { name: accountName } = account
	const categoryName = category ? category.name : ''
	const categoryIcon = category ? category.icon : ''
	const categoryColor = category ? category.color : ''
	const Icon = CATEGORY_ICONS.find((icon) => icon.id === categoryIcon)?.icon

	return (
		<li className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_32px] items-center gap-4 rounded-sm px-2">
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
			<div className="flex items-center justify-end">
				<DropdownMenu modal={false}>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon-sm" className="size-8 rounded-md">
							<EllipsisVertical />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="">
						<DropdownMenuItem
							onClick={() => deleteTransaction(transaction.id)}
							className="focus:bg-red-50"
						>
							<Trash2 className="text-ui-950 size-4" />
							<span className="text-sm font-medium">Delete</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</li>
	)
}
