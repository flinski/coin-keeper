import Logo from '@/ui/Logo'
import SidebarNav from '@/ui/SidebarNav'

export default function Sidebar() {
	return (
		<aside className="bg-ui-50 border-ui-200 flex w-[260px] shrink-0 flex-col border-r">
			<div className="border-b">
				<Logo />
			</div>
			<SidebarNav />
			<div>User</div>
		</aside>
	)
}
