import { bgColorMap600 } from '@/lib/constants'
import { cn } from '@/lib/utils'
import type { LucideProps } from 'lucide-react'

type CategoryIconItemProps = {
	icon: {
		id: string
		icon: React.ForwardRefExoticComponent<
			Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
		>
	}
	selectedColor: string
	selectedIcon: string
	onSelectedIcon: React.Dispatch<React.SetStateAction<string>>
}

export default function CategoryIconItem({
	icon,
	selectedColor,
	selectedIcon,
	onSelectedIcon,
}: CategoryIconItemProps) {
	const Icon = icon.icon

	return (
		<li>
			<div
				onClick={() => onSelectedIcon(icon.id)}
				className={cn(
					'bg-ui-950/10 inline-flex cursor-pointer items-center justify-center rounded-full p-2',
					selectedIcon === icon.id && `${bgColorMap600[selectedColor]} text-ui-50`
				)}
			>
				<Icon size={20} />
			</div>
		</li>
	)
}
