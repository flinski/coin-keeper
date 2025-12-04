import Logo from '@/ui/Logo'
import SidebarNav from '@/ui/SidebarNav'

export default function Sidebar() {
	return (
		<aside className="bg-ui-0 border-ui-200 row-[-1/1] flex flex-col border-r">
			<div>
				<Logo />
			</div>
			<SidebarNav />
			<div>User</div>
		</aside>
	)
}
