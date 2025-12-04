import { NavLink } from 'react-router'
import { Banknote, LifeBuoy, Rows3, Wallet } from 'lucide-react'
import { cn } from '@/lib/utils'

const links = [
	{
		text: 'Dashboard',
		icon: LifeBuoy,
		path: '/dashboard',
	},
	{
		text: 'Transactions',
		icon: Banknote,
		path: '/transactions',
	},
	{
		text: 'Accounts',
		icon: Wallet,
		path: '/accounts',
	},
	{
		text: 'Categories',
		icon: Rows3,
		path: '/categories',
	},
]

export default function SidebarNav() {
	return (
		<nav className="grow">
			<p className="text-ui-500 px-4 pt-4 text-xs font-medium tracking-wide uppercase">Menu</p>
			<ul className="p-2">
				{links.map(({ text, icon, path }) => {
					const Icon = icon

					return (
						<li key={path}>
							<NavLink
								to={path}
								className={({ isActive }) =>
									cn(
										'hover:bg-accent-50 flex items-center gap-2 rounded-md p-2 leading-tight',
										isActive && 'text-accent-600'
									)
								}
							>
								<Icon size={16} />
								<span>{text}</span>
							</NavLink>
						</li>
					)
				})}
			</ul>
		</nav>
	)
}
