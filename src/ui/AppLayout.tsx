import { Outlet } from 'react-router'
import Sidebar from '@/ui/Sidebar'

export default function AppLayout() {
	return (
		<div className="grid h-screen grid-cols-[260px_1fr]">
			<Sidebar />
			<main className="bg-ui-100 overflow-auto">
				<Outlet />
			</main>
		</div>
	)
}
