import { getCurrentMonthRange } from '@/lib/utils'
import supabase from '@/services/supabase'

export type DashboardCategoryStat = {
	categoryId: string
	categoryName: string
	fill: string
	amount: number
}

type Category = {
	id: string
	name: string
	color: string
}

export async function getCurrentMonthTransactions(type: string) {
	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) {
		throw new Error('User is not authenticated')
	}

	const { from, to } = getCurrentMonthRange()

	const { data, error } = await supabase
		.from('transactions')
		.select(
			`
			amount,
			category:categories (
				id,
        name,
        color
			)
		`
		)
		.eq('user_id', user.id)
		.eq('type', type)
		.gte('transaction_date', from)
		.lt('transaction_date', to)

	if (error) {
		console.error(error.message)
		throw new Error(error.message)
	}

	console.log(data)
	const map = new Map<string, DashboardCategoryStat>()

	data.forEach((transaction) => {
		const category = transaction.category as unknown as Category
		if (!category) return

		const existing = map.get(category.id)

		if (existing) {
			existing.amount += transaction.amount
		} else {
			map.set(category.id, {
				categoryId: category.id,
				categoryName: category.name,
				fill: `var(--color-${category.color}-400)`,
				amount: transaction.amount,
			})
		}
	})

	return Array.from(map.values())
}
