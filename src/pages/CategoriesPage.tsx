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
		<div className="flex h-screen flex-col">
			<div className="border-ui-200 flex items-center border-b p-2">Your Categories</div>
			<div className="grow overflow-auto">
				<div className="mx-auto flex max-w-[1440px] flex-col gap-6 p-8">
					<div>
						<div>Income</div>
						<ul>
							{incomeCategories.map((category) => (
								<li>{category.name}</li>
							))}
						</ul>
					</div>
					<div>
						<div>Expenses</div>
						<ul>
							{expensesCategories.map((category) => (
								<li>{category.name}</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}
