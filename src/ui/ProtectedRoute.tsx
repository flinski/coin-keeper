import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useUser } from '@/features/auth/useUser'
import { Spinner } from '@/components/ui/spinner'

type ProtectedRouteProps = {
	children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
	const navigate = useNavigate()
	const { isAuthenticated, isLoading } = useUser()

	useEffect(() => {
		if (!isAuthenticated && !isLoading) {
			navigate('/login')
		}
	}, [isAuthenticated, isLoading, navigate])

	if (isLoading) {
		return (
			<div className="flex h-screen w-full items-center justify-center">
				<Spinner className="text-ui-500 size-8" />
			</div>
		)
	}

	if (isAuthenticated) return children
}
