import { Outlet } from 'react-router'
import Header from '@/ui/Header'
import Sidebar from '@/ui/Sidebar'

export default function AppLayout() {
	return (
		<div className="grid h-screen grid-cols-[260px_1fr] grid-rows-[56px_auto]">
			<Header />
			<Sidebar />
			<main className="bg-ui-50 overflow-auto">
				<Outlet />
			</main>
		</div>
	)
}
