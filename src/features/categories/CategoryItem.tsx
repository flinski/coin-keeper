import { useState } from 'react'
import { Controller, useForm, type SubmitHandler } from 'react-hook-form'
import { Pencil, Trash2 } from 'lucide-react'
import { bgColorMap600, colors } from '@/lib/constants'
import { cn } from '@/lib/utils'
import type { Category } from '@/services/apiCategories'
import { CATEGORY_ICONS } from '@/features/categories/icons'
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
import { useDeleteCategory } from '@/features/categories/useDeleteCategory'
import { useEditCategory } from '@/features/categories/useEditCategory'
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
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import CategoryIconSectionList from './CategoryIconSectionList'

type Inputs = {
	name: string
	type: string
	color: string
	icon: string
}

type CategoryItemProps = {
	category: Category
}

export default function CategoryItem({ category }: CategoryItemProps) {
	const { id, name, type, icon, color } = category
	const Icon = CATEGORY_ICONS.find((categoryIcon) => categoryIcon.id === icon)?.icon
	const [openEdit, setOpenEdit] = useState(false)
	const [openDelete, setOpenDelete] = useState(false)
	const [selectedIcon, setSelectedIcon] = useState(icon)
	const [selectedColor, setSelectedColor] = useState(color)
	const { register, handleSubmit, control } = useForm<Inputs>({
		defaultValues: { name, type, icon, color },
	})
	const { editCategory, isLoading: isEditLoading } = useEditCategory()
	const { deleteCategory, isLoading: isDeleteLoading } = useDeleteCategory()

	const onSubmit: SubmitHandler<Inputs> = ({ name, type }) => {
		editCategory(
			{ id, name, type, icon: selectedIcon, color: selectedColor },
			{
				onSuccess: () => {
					setOpenEdit(false)
				},
			}
		)
	}

	return (
		<>
			<DropdownMenu modal={false}>
				<DropdownMenuTrigger asChild>
					<li className="hover:bg-ui-100 relative flex min-w-20 flex-col items-center gap-1 rounded-lg px-2 py-4">
						<div
							className={cn(
								'text-ui-50 inline-flex items-center justify-center rounded-full p-2',
								bgColorMap600[color]
							)}
						>
							{Icon && <Icon size={24} />}
						</div>
						<div>{name}</div>
					</li>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem onClick={() => setOpenEdit(true)} className="focus:bg-accent-100">
						<Pencil size={16} className="text-ui-950" />
						<span className="text-base">Edit</span>
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setOpenDelete(true)} className="focus:bg-accent-100">
						<Trash2 size={16} className="text-ui-950" />
						<span className="text-base">Delete</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<Dialog open={openEdit} onOpenChange={setOpenEdit}>
				<DialogContent>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="font-inter text-ui-950 bg-ui-50 leading-text flex flex-col gap-6 antialiased"
					>
						<DialogHeader>
							<DialogTitle className="text-xl font-semibold">Edit category</DialogTitle>
						</DialogHeader>

						<div className="flex flex-col gap-5">
							<div className="flex flex-col gap-2">
								<Label className="text-base">Category name</Label>
								<Input
									type="text"
									disabled={isEditLoading}
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
								<Button variant="outline" disabled={isEditLoading}>
									Cancel
								</Button>
							</DialogClose>
							<Button
								type="submit"
								disabled={isEditLoading}
								className="bg-accent-600 hover:bg-accent-600/90"
							>
								Edit
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
							This will permanently delete <span className="text-ui-950 font-medium">"{name}"</span>{' '}
							category and remove your data from our servers.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel disabled={isDeleteLoading}>Cancel</AlertDialogCancel>
						<AlertDialogAction
							disabled={isDeleteLoading}
							onClick={() => deleteCategory(id)}
							className="bg-red-600 hover:bg-red-600/90"
						>
							Continue
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	)
}
