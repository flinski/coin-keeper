import { clsx, type ClassValue } from 'clsx'
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
