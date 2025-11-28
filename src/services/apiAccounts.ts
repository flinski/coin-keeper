import supabase from '@/services/supabase'

type Account = {
	id: string
	created_at: string
	user_id: string
	name: string
	balance: number
}

export async function getAccounts() {
	const { data, error } = await supabase
		.from('accounts')
		.select('*')
		.order('created_at', { ascending: true })

	if (error) {
		console.error(error.message)
		throw new Error(error.message)
	}

	const accounts: Account[] = data

	return accounts
}

type AccountCreation = {
	name: string
	balance: number
}

export async function createAccount({ name, balance }: AccountCreation) {
	const {
		data: { user },
	} = await supabase.auth.getUser()
	const { data, error } = await supabase
		.from('accounts')
		.insert({ user_id: user?.id, name, balance })
		.select()
		.single()

	if (error) {
		console.error(error.message)
		throw new Error(error.message)
	}

	console.log(data)

	return data
}
