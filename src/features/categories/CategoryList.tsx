import type { Category } from '@/services/apiCategories'
import CategoryItem from '@/features/categories/CategoryItem'

type CategoryListProps = {
	categories: Category[]
}

export default function CategoryList({ categories }: CategoryListProps) {
	return (
		<ul className="flex gap-2">
			{categories.map((category) => (
				<CategoryItem key={category.id} category={category} />
			))}
		</ul>
	)
}
