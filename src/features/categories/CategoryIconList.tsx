import type { ForwardRefExoticComponent, RefAttributes } from 'react'
import type { LucideProps } from 'lucide-react'
import CategoryIconItem from './CategoryIconItem'

type CategoryIconListProps = {
	icons: {
		id: string
		icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>
	}[]
	selectedColor: string
	selectedIcon: string
	onSelectedIcon: React.Dispatch<React.SetStateAction<string>>
}

export default function CategoryIconList({
	icons,
	selectedColor,
	selectedIcon,
	onSelectedIcon,
}: CategoryIconListProps) {
	return (
		<ul className="flex flex-wrap gap-2">
			{icons.map((icon) => (
				<CategoryIconItem
					icon={icon}
					selectedColor={selectedColor}
					selectedIcon={selectedIcon}
					onSelectedIcon={onSelectedIcon}
				/>
			))}
		</ul>
	)
}
