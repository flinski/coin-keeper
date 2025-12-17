import { Spinner } from '@/components/ui/spinner'
import AddCategoryDialog from '@/features/categories/AddCategoryDialog'
import CategoryList from '@/features/categories/CategoryList'
import { useCategories } from '@/features/categories/useCategories'
import Container from '@/ui/Container'
import ErrorMessage from '@/ui/ErrorMessage'
import PageHeader from '@/ui/PageHeader'

export default function CategoriesPage() {
	const { categories, error, isLoading } = useCategories()

	if (isLoading) {
		return (
			<div className="flex h-full items-center justify-center">
				<Spinner className="text-accent-600 size-12" />
			</div>
		)
	}

	if (error) {
		return <ErrorMessage message={`Error: ${error.message}`} screen={true} />
	}

	if (!categories) {
		return <ErrorMessage message="Something went wrong. Please try again later." screen={true} />
	}

	console.log('categories:', categories)

	const incomeCategories = categories.filter((category) => category.type === 'income')
	const expensesCategories = categories.filter((category) => category.type === 'expenses')

	return (
		<div>
			<PageHeader title="Your categories">
				<AddCategoryDialog />
			</PageHeader>
			<Container>
				<div className="flex gap-4">
					<div className="bg-ui-50 border-ui-200 flex basis-[50%] flex-col gap-4 rounded-xl border p-6">
						<div className="text-3xl font-semibold">Income</div>
						<CategoryList categories={incomeCategories} />
					</div>
					<div className="bg-ui-50 border-ui-200 flex basis-[50%] flex-col gap-4 rounded-xl border p-6">
						<div className="text-3xl font-semibold">Expenses</div>
						<CategoryList categories={expensesCategories} />
					</div>
				</div>
			</Container>
		</div>
	)
}
