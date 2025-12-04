import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useCreateAccount } from '@/features/accounts/useCreateAccount'
import { cn } from '@/lib/utils'
import { colorMap600, colors } from '@/lib/constants'

type Inputs = {
	name: string
	balance: string
}

export default function AddAccountDialog() {
	const [open, setOpen] = useState(false)
	const [activeColor, setActiveColor] = useState('emerald')
	const { register, handleSubmit, reset } = useForm<Inputs>()
	const { createAccount, isLoading } = useCreateAccount()

	const onSubmit: SubmitHandler<Inputs> = ({ name, balance }) => {
		createAccount(
			{ name, balance: Number(balance), color: activeColor },
			{
				onSuccess: () => {
					reset()
					setOpen(false)
				},
			}
		)
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>
					<span>Add account</span>
				</Button>
			</DialogTrigger>

			<DialogContent>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="font-inter text-ui-950 bg-ui-0 leading-text flex flex-col gap-6 antialiased"
				>
					<DialogHeader>
						<DialogTitle className="text-xl font-semibold">Add account</DialogTitle>
					</DialogHeader>

					<div className="flex flex-col gap-5">
						<div className="flex flex-col gap-2">
							<Label className="text-base">Account name</Label>
							<Input
								type="text"
								disabled={isLoading}
								{...register('name', { required: 'This field is required' })}
							/>
						</div>
						<div className="flex flex-col gap-2">
							<Label className="text-base">Amount</Label>
							<Input
								type="number"
								disabled={isLoading}
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
							<Button variant="outline" disabled={isLoading}>
								Cancel
							</Button>
						</DialogClose>
						<Button type="submit" disabled={isLoading}>
							Add
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
