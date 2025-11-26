import { Outlet } from 'react-router'
import Sidebar from '@/ui/Sidebar'

export default function AppLayout() {
	return (
		<div className="flex h-screen">
			<Sidebar />
			<main className="bg-ui-0 grow">
				<Outlet />
			</main>
		</div>
	)
}
