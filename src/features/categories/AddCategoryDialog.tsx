import { useState } from 'react'
import { Controller, useForm, type SubmitHandler } from 'react-hook-form'
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useCreateCategory } from '@/features/categories/useCreateCategory'
import { bgColorMap600, colors } from '@/lib/constants'
import { cn } from '@/lib/utils'
import CategoryIconSectionList from '@/features/categories/CategoryIconSectionList'

type Inputs = {
	name: string
	type: string
}

export default function AddCategoryDialog() {
	const [open, setOpen] = useState(false)
	const [selectedIcon, setSelectedIcon] = useState('badge-cent')
	const [selectedColor, setSelectedColor] = useState('emerald')
	const { register, handleSubmit, reset, control } = useForm<Inputs>({
		defaultValues: { type: 'expenses' },
	})
	const { createCategory, isLoading } = useCreateCategory()

	const onSubmit: SubmitHandler<Inputs> = ({ name, type }) => {
		createCategory(
			{ name, type, icon: selectedIcon, color: selectedColor },
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
					<span>Add category</span>
				</Button>
			</DialogTrigger>

			<DialogContent>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="font-inter text-ui-950 bg-ui-50 leading-text flex flex-col gap-6 antialiased"
				>
					<DialogHeader>
						<DialogTitle className="text-xl font-semibold">Add category</DialogTitle>
					</DialogHeader>

					<div className="flex flex-col gap-5">
						<div className="flex flex-col gap-2">
							<Label className="text-base">Category name</Label>
							<Input
								type="text"
								disabled={isLoading}
								{...register('name', { required: 'This field is required' })}
							/>
						</div>
						<div className="flex flex-col gap-3">
							<Label className="text-base">Category type</Label>
							<Controller
								name="type"
								control={control}
								render={({ field }) => (
									<RadioGroup
										defaultValue="expenses"
										value={field.value}
										onValueChange={field.onChange}
									>
										<div className="flex items-center gap-2">
											<RadioGroupItem value="income" id="income" />
											<Label htmlFor="income" className="cursor-pointer">
												Income
											</Label>
										</div>
										<div className="flex items-center gap-2">
											<RadioGroupItem value="expenses" id="expenses" />
											<Label htmlFor="expenses" className="cursor-pointer">
												Expenses
											</Label>
										</div>
									</RadioGroup>
								)}
							/>
						</div>
						<div className="flex flex-col gap-3">
							<Label className="text-base">Icons</Label>
							<CategoryIconSectionList
								selectedColor={selectedColor}
								selectedIcon={selectedIcon}
								onSelectedIcon={setSelectedIcon}
							/>
						</div>
						<div className="flex flex-col gap-2">
							<Label className="text-base">Color</Label>
							<ul className="flex flex-wrap justify-center gap-2">
								{colors.map((color) => {
									return (
										<li
											key={color}
											onClick={() => setSelectedColor(color)}
											className={cn(
												'size-8 cursor-pointer rounded-full',
												bgColorMap600[color],
												selectedColor === color && 'outline-ui-900 outline-3'
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
