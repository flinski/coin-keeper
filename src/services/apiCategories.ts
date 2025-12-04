import supabase from '@/services/supabase'

export type Category = {
	id: string
	created_at: string
	user_id: string
	name: string
	type: string
}

type CategoryCreation = {
	name: string
	type: string
}

type CategoryUpdate = {
	id: string
	name: string
}

export async function getCategories() {
	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) {
		throw new Error('User is not authenticated')
	}

	const { data, error } = await supabase
		.from('categories')
		.select('*')
		.eq('user_id', user.id)
		.order('created_at', { ascending: true })

	if (error) {
		console.error(error.message)
		throw new Error(error.message)
	}

	return data as Category[]
}

export async function createCategory({ name, type }: CategoryCreation) {
	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) {
		throw new Error('User is not authenticated')
	}

	const { data, error } = await supabase
		.from('categories')
		.insert({ user_id: user.id, name, type })
		.select()
		.single()

	if (error) {
		console.error(error.message)
		throw new Error(error.message)
	}

	return data as Category
}

export async function editCategory({ id, name }: CategoryUpdate) {
	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) {
		throw new Error('User is not authenticated')
	}

	const { data, error } = await supabase
		.from('categories')
		.update({ name })
		.eq('id', id)
		.eq('user_id', user.id)
		.select()
		.single()

	if (error) {
		console.error(error.message)
		throw new Error(error.message)
	}

	return data as Category
}

export async function deleteCategory(id: string) {
	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) {
		throw new Error('User is not authenticated')
	}

	const { error } = await supabase.from('categories').delete().eq('id', id).eq('user_id', user.id)

	if (error) {
		console.error(error.message)
		throw new Error(error.message)
	}
}
