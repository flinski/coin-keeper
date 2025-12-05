import AddCategoryDialog from '@/features/categories/AddCategoryDialog'
import CategoryList from '@/features/categories/CategoryList'
import { useCategories } from '@/features/categories/useCategories'

export default function CategoriesPage() {
	const { categories, error, isLoading } = useCategories()

	if (isLoading) {
		return <div>Loading...</div>
	}

	if (error) {
		return <div>Error: {error.message}</div>
	}

	if (!categories) {
		return <div>Categories not found</div>
	}

	console.log('categories:', categories)

	const incomeCategories = categories.filter((category) => category.type === 'income')
	const expensesCategories = categories.filter((category) => category.type === 'expenses')

	return (
		<div>
			<div className="mx-auto flex max-w-7xl flex-col gap-12 p-8">
				<div className="flex flex-col gap-6">
					<div className="flex items-center justify-between">
						<div></div>
						<AddCategoryDialog />
					</div>
					<div className="flex">
						<div className="flex basis-[50%] flex-col gap-6">
							<div className="text-4xl font-semibold">Income</div>
							<CategoryList categories={incomeCategories} />
						</div>
						<div className="flex basis-[50%] flex-col gap-6">
							<div className="text-4xl font-semibold">Expenses</div>
							<CategoryList categories={expensesCategories} />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
