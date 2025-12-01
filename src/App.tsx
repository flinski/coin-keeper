import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import AppLayout from '@/ui/AppLayout'
import ProtectedRoute from '@/ui/ProtectedRoute'

import DashboardPage from '@/pages/DashboardPage'
import NotFoundPage from '@/pages/NotFoundPage'
import TransactionsPage from '@/pages/TransactionsPage'
import AccountsPage from '@/pages/AccountsPage'
import CategoriesPage from '@/pages/CategoriesPage'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'

const queryClient = new QueryClient()

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Routes>
					<Route
						element={
							<ProtectedRoute>
								<AppLayout />
							</ProtectedRoute>
						}
					>
						<Route index element={<Navigate replace to="dashboard" />} />
						<Route path="dashboard" element={<DashboardPage />} />
						<Route path="transactions" element={<TransactionsPage />} />
						<Route path="accounts" element={<AccountsPage />} />
						<Route path="categories" element={<CategoriesPage />} />
					</Route>
					<Route path="login" element={<LoginPage />} />
					<Route path="register" element={<RegisterPage />} />
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</BrowserRouter>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}
