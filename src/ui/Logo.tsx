import LogoIcon from '@/ui/LogoIcon'

export default function Logo() {
	return (
		<div className="flex items-center gap-x-2 p-2">
			<LogoIcon className="shrink-0" />
			<span className="font-semibold">Coin Keeper</span>
		</div>
	)
}
