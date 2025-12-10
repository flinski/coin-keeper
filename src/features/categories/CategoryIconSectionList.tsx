import { CATEGORY_ICONS } from '@/features/categories/icons'
import CategoryIconSection from '@/features/categories/CategoryIconSection'
import { categoryIconsToIconsByCategory } from '@/lib/utils'

type CategoryIconSectionListProps = {
	selectedColor: string
	selectedIcon: string
	onSelectedIcon: React.Dispatch<React.SetStateAction<string>>
}

export default function CategoryIconSectionList({
	selectedColor,
	selectedIcon,
	onSelectedIcon,
}: CategoryIconSectionListProps) {
	const iconsByCategory = categoryIconsToIconsByCategory(CATEGORY_ICONS)

	return (
		<ul className="flex max-h-[164px] flex-col gap-4 overflow-auto">
			{iconsByCategory.map(({ category, icons }) => (
				<CategoryIconSection
					category={category}
					icons={icons}
					selectedColor={selectedColor}
					selectedIcon={selectedIcon}
					onSelectedIcon={onSelectedIcon}
				/>
			))}
		</ul>
	)
}
