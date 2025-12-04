import LogoIcon from '@/ui/LogoIcon'

export default function Logo() {
	return (
		<div className="flex h-14 items-center gap-x-2 px-4 text-xl">
			<LogoIcon className="text-accent-600 shrink-0" />
			<span className="font-semibold">Coin Keeper</span>
		</div>
	)
}
