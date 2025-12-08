import { useSearchParams } from 'react-router'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

type SortByProps = {
	options: {
		value: string
		label: string
	}[]
	placeholder?: string
}

export default function SortBy({ options, placeholder = '' }: SortByProps) {
	const [searchParams, setSearchParams] = useSearchParams()
	const sortBy = searchParams.get('sortBy') ?? ''

	const handleChange = (value: string) => {
		searchParams.set('sortBy', value)
		setSearchParams(searchParams)
	}

	return (
		<Select onValueChange={handleChange} defaultValue={sortBy}>
			<SelectTrigger className="bg-ui-50">
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent className="bg-ui-50">
				{options.map((option) => (
					<SelectItem key={option.value} value={option.value}>
						{option.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}
