import { Navigate } from 'react-router'
import { useUser } from '@/features/auth/useUser'
import { Spinner } from '@/components/ui/spinner'

type ProtectedRouteProps = {
	children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
	const { user, isLoading } = useUser()

	if (isLoading) {
		return (
			<div className="flex h-screen w-full items-center justify-center">
				<Spinner className="text-accent-600 size-12" />
			</div>
		)
	}

	if (!user) {
		return <Navigate to="/login" replace />
	}

	return children
}
