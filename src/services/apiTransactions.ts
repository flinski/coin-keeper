import supabase from '@/services/supabase'

export type Transaction = {
	id: string
	created_at: string
	user_id: string
	transaction_date: string
	type: string
	amount: number
	comment: string
	account: {
		id: string
		name: string
		color: string
	}
	category: {
		id: string
		name: string
		type: string
		icon: string
		color: string
	} | null
	transfer_account: {
		id: string
		name: string
		color: string
	} | null
}

export type TransactionDb = {
	id: string
	created_at: string
	user_id: string
	transaction_date: string
	type: string
	amount: number
	account_id: string
	transfer_account_id: string | null
	category_id: string | null
	comment: string
}

export type TransactionCreation = {
	transaction_date: string
	type: string
	amount: number
	account_id: string
	transfer_account_id: string | undefined
	category_id: string | undefined
	comment: string
}

export type TransactionUpdate = {
	id: string
}

export async function getTransactions() {
	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) {
		throw new Error('User is not authenticated')
	}

	const { data, error } = await supabase
		.from('transactions')
		.select(
			`
			id,
			created_at,
			user_id,
			transaction_date,
			type,
			amount,
			comment,

			account:accounts!transactions_account_id_fkey (
        id,
        name,
        color
      ),

			category:categories!transactions_category_id_fkey (
        id,
        name,
        type,
        icon,
        color
      ),

			transfer_account:accounts!transactions_transfer_account_id_fkey (
        id,
        name,
        color
      )
			`
		)
		.eq('user_id', user.id)
		.order('transaction_date', { ascending: false })

	if (error) {
		console.error(error.message)
		throw new Error(error.message)
	}

	return data as unknown as Transaction[]
}

export async function createTransaction({
	transaction_date,
	type,
	amount,
	account_id,
	transfer_account_id,
	category_id,
	comment,
}: TransactionCreation) {
	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) {
		throw new Error('User is not authenticated')
	}

	const { data, error } = await supabase
		.from('transactions')
		.insert({
			user_id: user.id,
			transaction_date,
			type,
			amount,
			account_id,
			transfer_account_id,
			category_id,
			comment,
		})
		.select()
		.single()

	if (error) {
		console.error(error.message)
		throw new Error(error.message)
	}

	return data as TransactionDb
}

export async function deleteTransaction(id: string) {
	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) {
		throw new Error('User is not authenticated')
	}

	const { error } = await supabase.from('transactions').delete().eq('id', id).eq('user_id', user.id)

	if (error) {
		console.error(error.message)
		throw new Error(error.message)
	}
}
