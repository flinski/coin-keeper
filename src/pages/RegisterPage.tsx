import { Button } from '@/components/ui/button'

import RegisterForm from '@/features/auth/RegisterForm'
import Logo from '@/ui/Logo'
import { Link } from 'react-router'

export default function RegisterPage() {
	return (
		<div className="flex h-screen">
			<div className="bg-ui-100 basis-1/2 p-8">
				<Logo />
			</div>
			<div className="flex basis-1/2 flex-col p-8">
				<div className="flex justify-end">
					<Link to="/login">
						<Button variant="ghost" className="hover:bg-ui-100">
							Sign In
						</Button>
					</Link>
				</div>

				<div className="flex grow flex-col justify-center">
					<div className="mx-auto flex w-full max-w-[350px] flex-col gap-6">
						<div className="flex flex-col gap-2 text-center">
							<h1 className="text-2xl font-semibold">Create an account</h1>
							<p className="text-ui-500 text-sm">Enter your details below to create your account</p>
						</div>

						<RegisterForm />

						<p className="text-ui-500 px-6 text-center text-sm">
							By clicking continue, you agree to our Terms of Service and Privacy Policy.
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
