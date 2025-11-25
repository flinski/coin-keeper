import { cn } from '@/lib/utils'

type LogoProps = {
	size?: number
	color?: string
	strokeWidth?: number
	className?: string
}

export default function LogoIcon({
	size = 24,
	color = 'currentColor',
	strokeWidth = 2,
	className = '',
}: LogoProps) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={cn('', className)}
		>
			<g clipPath="url(#clip0_8_31)">
				<path
					d="M12 2.99995C10.8181 2.99995 9.64776 3.23274 8.55583 3.68504C7.46389 4.13733 6.47173 4.80027 5.636 5.636C4.80027 6.47174 4.13733 7.46389 3.68503 8.55583C3.23274 9.64777 2.99994 10.8181 2.99994 12C2.99994 13.1819 3.23274 14.3522 3.68503 15.4442C4.13733 16.5361 4.80027 17.5283 5.636 18.364C6.47173 19.1997 7.46389 19.8627 8.55583 20.315C9.64777 20.7673 10.8181 21.0001 12 21.0001C14.387 21.0001 16.6762 20.0518 18.364 18.364C20.0518 16.6762 21.0001 14.387 21.0001 12C21.0001 9.61304 20.0518 7.32384 18.364 5.636C16.6762 3.94817 14.387 2.99995 12 2.99995Z"
					stroke={color}
					strokeWidth={strokeWidth}
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M18.0005 12C18.0006 11.212 17.8454 10.4317 17.5439 9.70362C17.2423 8.97558 16.8004 8.31406 16.2431 7.75685C15.6859 7.19963 15.0244 6.75764 14.2964 6.45611C13.5683 6.15458 12.788 5.99942 12 5.99949"
					stroke={color}
					strokeWidth={strokeWidth}
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</g>
			<defs>
				<clipPath id="clip0_8_31">
					<rect width={size} height={size} fill="white" />
				</clipPath>
			</defs>
		</svg>
	)
}
