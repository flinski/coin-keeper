import { CATEGORY_ICONS } from '@/features/categories/icons'
import { clsx, type ClassValue } from 'clsx'
import type { LucideProps } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function formatCurrency(
	value: number,
	currency: string = 'USD',
	locale: string = 'en-US',
	minimumFractionDigits: number = 2,
	maximumFractionDigits: number = 2
): string {
	return new Intl.NumberFormat(locale, {
		style: 'currency',
		currency,
		minimumFractionDigits,
		maximumFractionDigits,
	}).format(value)
}

export function getIconComponent(id: string) {
	return CATEGORY_ICONS.find((icon) => icon.id === id)?.icon
}

export function categoryIconsToIconsByCategory(
	categoryIcons: {
		id: string
		icon: React.ForwardRefExoticComponent<
			Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
		>
		category: string
	}[]
) {
	const map: Record<
		string,
		{
			id: string
			icon: React.ForwardRefExoticComponent<
				Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
			>
		}[]
	> = {}

	for (const item of categoryIcons) {
		if (!map[item.category]) {
			map[item.category] = []
		}

		map[item.category].push({
			id: item.id,
			icon: item.icon,
		})
	}

	return Object.entries(map).map(([category, icons]) => ({
		category,
		icons,
	}))
}
