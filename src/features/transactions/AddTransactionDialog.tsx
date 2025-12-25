import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { useCreateTransaction } from './useCreateTransaction'
import { Controller, useForm, type SubmitHandler } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { bgColorMap600 } from '@/lib/constants'
import { cn, formatCurrency } from '@/lib/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { useAccounts } from '../accounts/useAccounts'
import { useCategories } from '../categories/useCategories'
import { CATEGORY_ICONS } from '../categories/icons'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ChevronDown } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'

type Inputs = {
	transaction_date: string
	type: string
	amount: string
	account_id: string
	transfer_account_id: string | undefined
	comment: string
}

export default function AddTransactionDialog() {
	const [open, setOpen] = useState(false)
	const [openPopover, setOpenPopover] = useState(false)
	const [date, setDate] = useState<Date | undefined>(undefined)
	const [categoryId, setCategoryId] = useState<string | undefined>(undefined)
	const [type, setType] = useState('expenses')
	const { createTransaction, isLoading } = useCreateTransaction()
	const { accounts } = useAccounts()
	const { categories } = useCategories()

	const { register, handleSubmit, reset, control } = useForm<Inputs>()

	const onSubmit: SubmitHandler<Inputs> = ({
		amount,
		account_id,
		transfer_account_id,
		comment,
	}) => {
		if ((type === 'expenses' || type === 'income') && !categoryId) return
		if (!date) return

		createTransaction(
			{
				transaction_date: date.toISOString(),
				type,
				amount: Number(amount),
				account_id,
				transfer_account_id,
				category_id: categoryId,
				comment,
			},
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
				<Button className="bg-accent-600 hover:bg-accent-600/90">
					<span>Add transaction</span>
				</Button>
			</DialogTrigger>

			<DialogContent>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="font-inter text-ui-950 leading-text flex flex-col gap-6 antialiased"
				>
					<DialogHeader>
						<DialogTitle className="text-xl font-semibold">Add transaction</DialogTitle>
					</DialogHeader>

					<div className="flex flex-col gap-5">
						<Tabs
							value={type}
							onValueChange={(value) => {
								setType(value)
								setCategoryId(undefined)
							}}
						>
							<TabsList className="w-full">
								<TabsTrigger value="expenses">Expenses</TabsTrigger>
								<TabsTrigger value="income">Income</TabsTrigger>
								<TabsTrigger value="transfer">Transfer</TabsTrigger>
							</TabsList>
							<TabsContent value="expenses" className="flex flex-col gap-6">
								<div className="flex flex-col gap-2">
									<Label className="text-base">Amount</Label>
									<Input
										type="number"
										disabled={isLoading}
										{...register('amount', { required: 'This field is required' })}
									/>
								</div>
								<div className="flex flex-col gap-2">
									<Label className="text-base">Account</Label>
									<Controller
										name="account_id"
										control={control}
										render={({ field }) => (
											<Select
												value={field.value}
												onValueChange={field.onChange}
												disabled={isLoading}
												required
											>
												<SelectTrigger className="data-placeholder:text-ui-950/50 font-medium">
													<SelectValue placeholder="Select an account" />
												</SelectTrigger>
												<SelectContent>
													{accounts &&
														accounts.map((account) => (
															<SelectItem key={account.id} value={account.id}>
																<span className="font-medium">{account.name}</span>{' '}
																<span className="text-ui-950/50 font-medium">
																	({formatCurrency(account.balance)})
																</span>
															</SelectItem>
														))}
												</SelectContent>
											</Select>
										)}
									/>
								</div>
								<div className="flex flex-col gap-2">
									<Label className="text-base">Categories</Label>
									<ul className="flex flex-wrap">
										{categories &&
											categories
												.filter((category) => category.type === 'expenses')
												.map((category) => {
													const Icon = CATEGORY_ICONS.find(
														(categoryIcon) => categoryIcon.id === category.icon
													)?.icon

													return (
														<li
															onClick={() => setCategoryId(category.id)}
															className={cn(
																'hover:bg-ui-100 relative flex min-w-20 cursor-pointer flex-col items-center gap-1 rounded-lg border-3 border-transparent px-2 py-4',
																categoryId === category.id && 'border-accent-600 border-3'
															)}
														>
															<div
																className={cn(
																	'text-ui-50 inline-flex items-center justify-center rounded-full p-2',
																	bgColorMap600[category.color]
																)}
															>
																{Icon && <Icon size={24} />}
															</div>
															<div>{category.name}</div>
														</li>
													)
												})}
									</ul>
								</div>
								<div className="flex flex-col gap-2">
									<Label className="text-base">Date</Label>
									<Popover open={openPopover} onOpenChange={setOpenPopover}>
										<PopoverTrigger asChild>
											<Button
												variant="outline"
												id="date"
												className="flex w-40 items-center justify-between self-start"
											>
												{date ? (
													date.toLocaleDateString()
												) : (
													<span className="text-ui-950/50">Select date</span>
												)}
												<ChevronDown />
											</Button>
										</PopoverTrigger>
										<PopoverContent>
											<Calendar
												mode="single"
												selected={date}
												captionLayout="dropdown"
												onSelect={(date) => {
													setDate(date)
													setOpenPopover(false)
													console.log(date)
												}}
											/>
										</PopoverContent>
									</Popover>
								</div>
								<div className="flex flex-col gap-2">
									<Label className="text-base">Comment</Label>
									<Input type="text" disabled={isLoading} {...register('comment')} />
								</div>
							</TabsContent>
							<TabsContent value="income" className="flex flex-col gap-6">
								<div className="flex flex-col gap-2">
									<Label className="text-base">Amount</Label>
									<Input
										type="number"
										disabled={isLoading}
										{...register('amount', { required: 'This field is required' })}
									/>
								</div>
								<div className="flex flex-col gap-2">
									<Label className="text-base">Account</Label>
									<Controller
										name="account_id"
										control={control}
										render={({ field }) => (
											<Select
												value={field.value}
												onValueChange={field.onChange}
												disabled={isLoading}
												required
											>
												<SelectTrigger className="data-placeholder:text-ui-950/50 font-medium">
													<SelectValue placeholder="Select an account" />
												</SelectTrigger>
												<SelectContent>
													{accounts &&
														accounts.map((account) => (
															<SelectItem key={account.id} value={account.id}>
																<span className="font-medium">{account.name}</span>{' '}
																<span className="text-ui-950/50 font-medium">
																	({formatCurrency(account.balance)})
																</span>
															</SelectItem>
														))}
												</SelectContent>
											</Select>
										)}
									/>
								</div>
								<div className="flex flex-col gap-2">
									<Label className="text-base">Categories</Label>
									<ul className="flex flex-wrap">
										{categories &&
											categories
												.filter((category) => category.type === 'income')
												.map((category) => {
													const Icon = CATEGORY_ICONS.find(
														(categoryIcon) => categoryIcon.id === category.icon
													)?.icon

													return (
														<li
															onClick={() => setCategoryId(category.id)}
															className={cn(
																'hover:bg-ui-100 relative flex min-w-20 cursor-pointer flex-col items-center gap-1 rounded-lg border-3 border-transparent px-2 py-4',
																categoryId === category.id && 'border-accent-600 border-3'
															)}
														>
															<div
																className={cn(
																	'text-ui-50 inline-flex items-center justify-center rounded-full p-2',
																	bgColorMap600[category.color]
																)}
															>
																{Icon && <Icon size={24} />}
															</div>
															<div>{category.name}</div>
														</li>
													)
												})}
									</ul>
								</div>
								<div className="flex flex-col gap-2">
									<Label className="text-base">Date</Label>
									<Popover open={openPopover} onOpenChange={setOpenPopover}>
										<PopoverTrigger asChild>
											<Button
												variant="outline"
												id="date"
												className="flex w-40 items-center justify-between self-start"
											>
												{date ? (
													date.toLocaleDateString()
												) : (
													<span className="text-ui-950/50">Select date</span>
												)}
												<ChevronDown />
											</Button>
										</PopoverTrigger>
										<PopoverContent>
											<Calendar
												mode="single"
												selected={date}
												captionLayout="dropdown"
												onSelect={(date) => {
													setDate(date)
													setOpenPopover(false)
													console.log(date)
												}}
											/>
										</PopoverContent>
									</Popover>
								</div>
								<div className="flex flex-col gap-2">
									<Label className="text-base">Comment</Label>
									<Input type="text" disabled={isLoading} {...register('comment')} />
								</div>
							</TabsContent>
							<TabsContent value="transfer" className="flex flex-col gap-6">
								<div className="flex flex-col gap-2">
									<Label className="text-base">Amount</Label>
									<Input
										type="number"
										disabled={isLoading}
										{...register('amount', { required: 'This field is required' })}
									/>
								</div>
								<div className="flex flex-col gap-2">
									<Label className="text-base">Transfer from account</Label>
									<Controller
										name="account_id"
										control={control}
										render={({ field }) => (
											<Select
												value={field.value}
												onValueChange={field.onChange}
												disabled={isLoading}
												required
											>
												<SelectTrigger className="data-placeholder:text-ui-950/50 font-medium">
													<SelectValue placeholder="Select an account" />
												</SelectTrigger>
												<SelectContent>
													{accounts &&
														accounts.map((account) => (
															<SelectItem key={account.id} value={account.id}>
																<span className="font-medium">{account.name}</span>{' '}
																<span className="text-ui-950/50 font-medium">
																	({formatCurrency(account.balance)})
																</span>
															</SelectItem>
														))}
												</SelectContent>
											</Select>
										)}
									/>
								</div>
								<div className="flex flex-col gap-2">
									<Label className="text-base">Transfer to account</Label>
									<Controller
										name="transfer_account_id"
										control={control}
										render={({ field }) => (
											<Select
												value={field.value}
												onValueChange={field.onChange}
												disabled={isLoading}
												required
											>
												<SelectTrigger className="data-placeholder:text-ui-950/50 font-medium">
													<SelectValue placeholder="Select an account" />
												</SelectTrigger>
												<SelectContent>
													{accounts &&
														accounts.map((account) => (
															<SelectItem key={account.id} value={account.id}>
																<span className="font-medium">{account.name}</span>{' '}
																<span className="text-ui-950/50 font-medium">
																	({formatCurrency(account.balance)})
																</span>
															</SelectItem>
														))}
												</SelectContent>
											</Select>
										)}
									/>
								</div>
								<div className="flex flex-col gap-2">
									<Label className="text-base">Date</Label>
									<Popover open={openPopover} onOpenChange={setOpenPopover}>
										<PopoverTrigger asChild>
											<Button
												variant="outline"
												id="date"
												className="flex w-40 items-center justify-between self-start"
											>
												{date ? (
													date.toLocaleDateString()
												) : (
													<span className="text-ui-950/50">Select date</span>
												)}
												<ChevronDown />
											</Button>
										</PopoverTrigger>
										<PopoverContent>
											<Calendar
												mode="single"
												selected={date}
												captionLayout="dropdown"
												onSelect={(date) => {
													setDate(date)
													setOpenPopover(false)
													console.log(date)
												}}
											/>
										</PopoverContent>
									</Popover>
								</div>
								<div className="flex flex-col gap-2">
									<Label className="text-base">Comment</Label>
									<Input type="text" disabled={isLoading} {...register('comment')} />
								</div>
							</TabsContent>
						</Tabs>
					</div>

					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline" disabled={isLoading}>
								Cancel
							</Button>
						</DialogClose>
						<Button
							type="submit"
							disabled={isLoading}
							className="bg-accent-600 hover:bg-accent-600/90"
						>
							Add
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
