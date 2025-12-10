import { bgColorMap600 } from '@/lib/constants'
import { cn } from '@/lib/utils'
import type { Category } from '@/services/apiCategories'
import { CATEGORY_ICONS } from '@/features/categories/icons'

type CategoryItemProps = {
	category: Category
}

export default function CategoryItem({ category }: CategoryItemProps) {
	const { name, icon, color } = category
	const Icon = CATEGORY_ICONS.find((categoryIcon) => categoryIcon.id === icon)?.icon

	return (
		<li className="hover:bg-ui-50 flex w-20 flex-col items-center gap-1 rounded-lg py-3">
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
	)
}
