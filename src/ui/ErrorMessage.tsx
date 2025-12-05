import { cn } from '@/lib/utils'

type ErrorMessageProps = {
	message?: string
	className?: string
	screen?: boolean
}

export default function ErrorMessage({
	message = '',
	className,
	screen = false,
}: ErrorMessageProps) {
	if (screen) {
		return (
			<div className="flex h-full w-full items-center justify-center">
				<div className={cn('text-ui-500', className)}>{message}</div>
			</div>
		)
	}

	return <div className={cn('text-ui-500', className)}>{message}</div>
}
