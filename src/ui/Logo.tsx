import LogoIcon from '@/ui/LogoIcon'

export default function Logo() {
	return (
		<div className="border-ui-200 flex items-center gap-x-2 border-b p-2">
			<LogoIcon className="shrink-0" />
			<span className="font-semibold">Coin Keeper</span>
		</div>
	)
}
