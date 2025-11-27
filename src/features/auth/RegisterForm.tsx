import { type SubmitHandler, useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useSignup } from '@/features/auth/useSignup'
import { Spinner } from '@/components/ui/spinner'

type Inputs = {
	fullName: string
	email: string
	password: string
}

export default function RegisterForm() {
	const { register, handleSubmit } = useForm<Inputs>()
	const { signup, isLoading } = useSignup()

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		console.log('Inputs:', data)
		signup(data)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
			<div className="flex flex-col gap-5">
				<div className="flex flex-col gap-3">
					<Label>Full Name</Label>
					<Input
						type="text"
						placeholder="John Doe"
						disabled={isLoading}
						{...register('fullName', { required: 'This field is required' })}
					/>
				</div>
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
							minLength: {
								value: 6,
								message: 'Password needs a minimum of 6 characters',
							},
						})}
					/>
				</div>
			</div>

			<Button disabled={isLoading}>
				{isLoading ? (
					<div className="flex items-center gap-2">
						<Spinner className="text-ui-50" />
						<span>Creating...</span>
					</div>
				) : (
					'Sign Up'
				)}
			</Button>
		</form>
	)
}
