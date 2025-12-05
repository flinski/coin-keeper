import { bgColorMap600 } from '@/lib/constants'
import { cn } from '@/lib/utils'
import type { Category } from '@/services/apiCategories'

type CategoryItemProps = {
	category: Category
}

export default function CategoryItem({ category }: CategoryItemProps) {
	const { name, color } = category

	return (
		<li className="bg-ui-50 flex items-center gap-2 rounded-lg px-3 py-2 font-medium shadow-sm">
			<span className={cn('size-2 rounded-full', bgColorMap600[color])}></span>
			<span className="">{name}</span>
		</li>
	)
}
