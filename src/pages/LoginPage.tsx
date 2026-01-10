import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import Logo from '@/ui/Logo'
import SigninForm from '@/features/auth/SigninForm'

export default function LoginPage() {
	return (
		<div className="flex h-screen">
			<div className="bg-accent-100 basis-1/2 p-8">
				<Logo />
			</div>
			<div className="flex basis-1/2 flex-col p-8">
				<div className="flex justify-end">
					<Link to="/register">
						<Button variant="ghost" className="hover:bg-ui-100">
							Sign Up
						</Button>
					</Link>
				</div>

				<div className="flex grow flex-col justify-center">
					<div className="mx-auto flex w-full max-w-[350px] flex-col gap-6">
						<div className="flex flex-col gap-2 text-center">
							<h1 className="text-2xl font-semibold">Sign in to your account</h1>
							<p className="text-ui-500 text-sm">
								Enter your email and password below to sign in to your account
							</p>
						</div>

						<SigninForm />
					</div>
				</div>
			</div>
		</div>
	)
}
