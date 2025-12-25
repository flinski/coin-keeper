import supabase from '@/services/supabase'
import { getAccount } from './apiAccounts'

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
		balance: number
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
		balance: number
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
        color,
				balance
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
        color,
				balance
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

	if (type === 'expenses') {
		const account = await getAccount(account_id)
		const newBalance = account.balance - amount

		const { error } = await supabase
			.from('accounts')
			.update({ balance: newBalance })
			.eq('id', account_id)
			.eq('user_id', user.id)

		if (error) {
			console.error(error.message)
			throw new Error(error.message)
		}
	}

	if (type === 'income') {
		const account = await getAccount(account_id)
		const newBalance = account.balance + amount

		const { error } = await supabase
			.from('accounts')
			.update({ balance: newBalance })
			.eq('id', account_id)
			.eq('user_id', user.id)

		if (error) {
			console.error(error.message)
			throw new Error(error.message)
		}
	}

	if (type === 'transfer') {
		const account = await getAccount(account_id)
		const transferAccount = await getAccount(transfer_account_id as string)
		const newAccountBalance = account.balance - amount
		const newTransferAccountBalance = transferAccount.balance + amount

		const { error: accountError } = await supabase
			.from('accounts')
			.update({ balance: newAccountBalance })
			.eq('id', account_id)
			.eq('user_id', user.id)

		const { error: transferAccountError } = await supabase
			.from('accounts')
			.update({ balance: newTransferAccountBalance })
			.eq('id', transfer_account_id)
			.eq('user_id', user.id)

		const error = accountError || transferAccountError

		if (error) {
			console.error(error.message)
			throw new Error(error.message)
		}
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

export async function deleteTransaction(transaction: Transaction) {
	const { id, type, account, transfer_account, amount } = transaction

	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) {
		throw new Error('User is not authenticated')
	}

	if (type === 'expenses') {
		const { error } = await supabase
			.from('accounts')
			.update({ balance: account.balance + amount })
			.eq('id', account.id)
			.eq('user_id', user.id)

		if (error) {
			console.error(error.message)
			throw new Error(error.message)
		}
	}

	if (type === 'income') {
		const { error } = await supabase
			.from('accounts')
			.update({ balance: account.balance - amount })
			.eq('id', account.id)
			.eq('user_id', user.id)

		if (error) {
			console.error(error.message)
			throw new Error(error.message)
		}
	}

	if (type === 'transfer') {
		const accountBalance = account.balance + amount
		const transferAccountBalance = transfer_account!.balance - amount

		const { error: accountError } = await supabase
			.from('accounts')
			.update({ balance: accountBalance })
			.eq('id', account.id)
			.eq('user_id', user.id)

		const { error: transferAccountError } = await supabase
			.from('accounts')
			.update({ balance: transferAccountBalance })
			.eq('id', transfer_account!.id)
			.eq('user_id', user.id)

		const error = accountError || transferAccountError

		if (error) {
			console.error(error.message)
			throw new Error(error.message)
		}
	}

	const { error } = await supabase.from('transactions').delete().eq('id', id).eq('user_id', user.id)

	if (error) {
		console.error(error.message)
		throw new Error(error.message)
	}
}
