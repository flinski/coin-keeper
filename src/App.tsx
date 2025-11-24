import { BrowserRouter, Navigate, Route, Routes } from 'react-router'

import AppLayout from '@/ui/AppLayout'
import DashboardPage from '@/pages/DashboardPage'

export default function App() {
	return (
		<div className="font-inter text-ui-950 bg-ui-50 antialiased">
			<BrowserRouter>
				<Routes>
					<Route element={<AppLayout />}>
						<Route index element={<Navigate replace to="dashboard" />} />
						<Route path="dashboard" element={<DashboardPage />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	)
}
