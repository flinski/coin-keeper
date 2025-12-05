import { cn } from '@/lib/utils'

type PageHeaderProps = {
	children?: React.ReactNode
	title?: string
	className?: string
}

export default function PageHeader({ children, title, className }: PageHeaderProps) {
	return (
		<header
			className={cn(
				'bg-ui-50 border-ui-200 flex items-center justify-between border-b px-6 py-3',
				className
			)}
		>
			<h1 className="text-xl font-semibold">{title}</h1>
			<div>{children}</div>
		</header>
	)
}
