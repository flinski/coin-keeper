import supabase from '@/services/supabase'

type SignupDetails = {
	fullName: string
	email: string
	password: string
}

export async function signup({ fullName, email, password }: SignupDetails) {
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: {
				fullName,
			},
		},
	})

	if (error) {
		console.error(error.message)
		throw new Error(error.message)
	}

	return data
}

export async function signin({ email, password }: { email: string; password: string }) {
	const { data, error } = await supabase.auth.signInWithPassword({ email, password })

	if (error) {
		console.error(error.message)
		throw new Error(error.message)
	}

	return data
}

export async function signout() {
	const { error } = await supabase.auth.signOut()

	if (error) {
		console.error(error.message)
		throw new Error(error.message)
	}
}

export async function getCurrentUser() {
	const { data: session } = await supabase.auth.getSession()

	if (!session.session) return null

	const { data, error } = await supabase.auth.getUser()

	if (error) {
		console.error(error.message)
		throw new Error(error.message)
	}

	return data.user
}
