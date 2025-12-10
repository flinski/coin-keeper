import type { ForwardRefExoticComponent, RefAttributes } from 'react'
import type { LucideProps } from 'lucide-react'
import { Label } from '@/components/ui/label'
import CategoryIconList from '@/features/categories/CategoryIconList'

type CategoryIconSectionProps = {
	category: string
	icons: {
		id: string
		icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>
	}[]
	selectedColor: string
	selectedIcon: string
	onSelectedIcon: React.Dispatch<React.SetStateAction<string>>
}

export default function CategoryIconSection({
	category,
	icons,
	selectedColor,
	selectedIcon,
	onSelectedIcon,
}: CategoryIconSectionProps) {
	return (
		<li className="flex flex-col gap-3">
			<Label className="text-small">{category}</Label>
			<CategoryIconList
				icons={icons}
				selectedColor={selectedColor}
				selectedIcon={selectedIcon}
				onSelectedIcon={onSelectedIcon}
			/>
		</li>
	)
}
