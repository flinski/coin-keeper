import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { useSignout } from '@/features/auth/useSignout'
import { useUser } from '@/features/auth/useUser'
import ErrorMessage from '@/ui/ErrorMessage'
import { LogOut } from 'lucide-react'

export default function SidebarUser() {
	const { isLoading: isLoadingUser, error, user } = useUser()
	const { isLoading: isLoadingSignout, signout } = useSignout()

	const isLoading = isLoadingUser || isLoadingSignout

	if (isLoading) {
		return (
			<div className="flex h-full items-center justify-center">
				<Spinner className="text-accent-600 size-6" />
			</div>
		)
	}

	if (error) {
		return <ErrorMessage message={`Error: ${error.message}`} screen={true} />
	}

	if (!user) {
		return <ErrorMessage message="Something went wrong. Please try again later." screen={true} />
	}

	const { fullName, email } = user.user_metadata

	return (
		<div className="flex items-center justify-between p-3">
			<div className="leading-tight">
				<div className="font-medium">{fullName}</div>
				<div className="text-ui-950/50 text-sm font-medium">{email}</div>
			</div>
			<Button
				onClick={() => signout()}
				variant="ghost"
				size="icon-sm"
				className="hover:bg-red-100 hover:text-red-700"
			>
				<LogOut />
			</Button>
		</div>
	)
}
