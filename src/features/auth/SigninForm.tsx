import { type SubmitHandler, useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useSignin } from '@/features/auth/useSignin'
import { Spinner } from '@/components/ui/spinner'

type Inputs = {
	email: string
	password: string
}

export default function SigninForm() {
	const { register, handleSubmit } = useForm<Inputs>()
	const { signin, isLoading } = useSignin()

	const onSubmit: SubmitHandler<Inputs> = ({ email, password }) => {
		console.log('Login Inputs:', { email, password })

		if (!email || !password) return

		signin({ email, password })
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
			<div className="flex flex-col gap-5">
				<div className="flex flex-col gap-3">
					<Label>Email</Label>
					<Input
						type="email"
						placeholder="johndoe@gmail.com"
						disabled={isLoading}
						{...register('email', {
							required: 'This field is required',
							pattern: {
								value: /\S+@\S+\.\S+/,
								message: 'Please provide a valid email address',
							},
						})}
					/>
				</div>
				<div className="flex flex-col gap-3">
					<Label>Password</Label>
					<Input
						type="password"
						placeholder="Password"
						disabled={isLoading}
						{...register('password', {
							required: 'This field is required',
						})}
					/>
				</div>
			</div>

			<Button disabled={isLoading} className="bg-accent-600 hover:bg-accent-600/90">
				{isLoading ? (
					<div className="flex items-center gap-2">
						<Spinner className="text-ui-50" />
						<span>Loading...</span>
					</div>
				) : (
					'Sign In'
				)}
			</Button>
		</form>
	)
}
