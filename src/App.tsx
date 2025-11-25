import { BrowserRouter, Navigate, Route, Routes } from 'react-router'

import AppLayout from '@/ui/AppLayout'
import DashboardPage from '@/pages/DashboardPage'
import NotFoundPage from '@/pages/NotFoundPage'
import TransactionsPage from '@/pages/TransactionsPage'
import AccountsPage from '@/pages/AccountsPage'
import CategoriesPage from '@/pages/CategoriesPage'

export default function App() {
	return (
		<div className="font-inter text-ui-950 bg-ui-50 leading-text antialiased">
			<BrowserRouter>
				<Routes>
					<Route element={<AppLayout />}>
						<Route index element={<Navigate replace to="dashboard" />} />
						<Route path="dashboard" element={<DashboardPage />} />
						<Route path="transactions" element={<TransactionsPage />} />
						<Route path="accounts" element={<AccountsPage />} />
						<Route path="categories" element={<CategoriesPage />} />
					</Route>
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</BrowserRouter>
		</div>
	)
}
