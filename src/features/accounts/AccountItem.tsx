import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { EllipsisVertical, Pencil, Trash2 } from 'lucide-react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'
import { useDeleteAccount } from '@/features/accounts/useDeleteAccount'
import type { Account } from '@/services/apiAccounts'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useEditAccount } from '@/features/accounts/useEditAccount'
import { cn, formatCurrency } from '@/lib/utils'
import { colorMap600, colorMap700, colorMap800, colors } from '@/lib/constants'

type Inputs = {
	name: string
	balance: string
}

type AccountItemProps = {
	account: Account
}

export default function AccountItem({ account }: AccountItemProps) {
	const { id, name, balance, color } = account

	const [activeColor, setActiveColor] = useState(color)
	const [openEdit, setOpenEdit] = useState(false)
	const [openDelete, setOpenDelete] = useState(false)
	const { register, handleSubmit } = useForm<Inputs>({
		defaultValues: { name, balance: String(balance) },
	})
	const { editAccount, isLoading: isEditLoading } = useEditAccount()
	const { deleteAccount, isLoading: isDeleteLoading } = useDeleteAccount()

	const onSubmit: SubmitHandler<Inputs> = ({ name, balance }) => {
		editAccount(
			{ id: account.id, name, balance: Number(balance), color: activeColor },
			{
				onSuccess: () => {
					setOpenEdit(false)
				},
			}
		)
	}

	return (
		<>
			<li key={id}>
				<AspectRatio
					ratio={1.586 / 1}
					className={cn(
						'text-ui-50 relative flex flex-col gap-2 overflow-hidden rounded-2xl p-6 shadow-lg',
						colorMap800[color]
					)}
				>
					<div
						className={cn(
							'absolute top-[-50%] right-[20%] size-120 rounded-full',
							colorMap700[color]
						)}
					></div>
					<div
						className={cn(
							'bg-accent-600 absolute top-[-35%] right-[25%] size-110 rounded-full',
							colorMap600[color]
						)}
					></div>

					<header className="relative flex items-center justify-between text-2xl">
						<div className="text-lg">{name}</div>
						<DropdownMenu modal={false}>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" size="icon" className="hover:bg-ui-0/10 hover:text-ui-50">
									<EllipsisVertical className="size-5" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="">
								<DropdownMenuItem onClick={() => setOpenEdit(true)}>
									<Pencil size={16} />
									<span>Edit</span>
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => setOpenDelete(true)}>
									<Trash2 size={16} />
									<span>Delete</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</header>
					<p className="relative grow text-4xl font-semibold tabular-nums">
						{formatCurrency(balance)}
					</p>
					<footer className="relative font-medium tracking-wider uppercase">
						Vladislav Flinski
					</footer>
				</AspectRatio>
			</li>

			<Dialog open={openEdit} onOpenChange={setOpenEdit}>
				<DialogContent>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="font-inter text-ui-950 bg-ui-0 leading-text flex flex-col gap-6 antialiased"
					>
						<DialogHeader>
							<DialogTitle className="text-xl font-semibold">Edit account</DialogTitle>
						</DialogHeader>
						<div className="flex flex-col gap-5">
							<div className="flex flex-col gap-2">
								<Label className="text-base">Account name</Label>
								<Input
									type="text"
									disabled={isEditLoading}
									{...register('name', { required: 'This field is required' })}
								/>
							</div>
							<div className="flex flex-col gap-2">
								<Label className="text-base">Amount</Label>
								<Input
									type="number"
									disabled={isEditLoading}
									{...register('balance', { required: 'This field is required' })}
								/>
							</div>
							<div className="flex flex-col gap-2">
								<Label className="text-base">Color</Label>
								<ul className="flex flex-wrap justify-center gap-2">
									{colors.map((color) => {
										return (
											<li
												key={color}
												onClick={() => setActiveColor(color)}
												className={cn(
													'size-8 cursor-pointer rounded-full',
													colorMap600[color],
													activeColor === color && 'outline-ui-900 outline-3'
												)}
											></li>
										)
									})}
								</ul>
							</div>
						</div>
						<DialogFooter>
							<DialogClose asChild>
								<Button variant="outline" disabled={isEditLoading}>
									Cancel
								</Button>
							</DialogClose>
							<Button type="submit" disabled={isEditLoading}>
								Save changes
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>

			<AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently delete {account.name} account and
							remove your data from our servers.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel disabled={isDeleteLoading}>Cancel</AlertDialogCancel>
						<AlertDialogAction disabled={isDeleteLoading} onClick={() => deleteAccount(account.id)}>
							Continue
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	)
}
