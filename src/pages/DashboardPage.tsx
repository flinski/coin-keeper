import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig,
} from '@/components/ui/chart'
import { Spinner } from '@/components/ui/spinner'
import { useCurrentMonthTransactions } from '@/features/dashboard/useCurrentMonthTransactions'
import { formatCurrency } from '@/lib/utils'
import Container from '@/ui/Container'
import ErrorMessage from '@/ui/ErrorMessage'
import PageHeader from '@/ui/PageHeader'

import { LabelList, Pie, PieChart } from 'recharts'

export default function DashboardPage() {
	const {
		currentMonthTransactions: currentMonthIncomeTransactions,
		error: incomeError,
		isLoading: isIncomeLoading,
	} = useCurrentMonthTransactions('income')
	const {
		currentMonthTransactions: currentMonthExpensesTransactions,
		error: expensesError,
		isLoading: isExpensesLoading,
	} = useCurrentMonthTransactions('expenses')

	const transactions = currentMonthIncomeTransactions && currentMonthExpensesTransactions
	const isLoading = isIncomeLoading || isExpensesLoading
	const error = incomeError || expensesError

	if (isLoading) {
		return (
			<div className="flex h-full items-center justify-center">
				<Spinner className="text-accent-600 size-12" />
			</div>
		)
	}

	if (error) {
		return <ErrorMessage message={`Error: ${error.message}`} screen={true} />
	}

	if (!transactions) {
		return <ErrorMessage message="Something went wrong. Please try again later." screen={true} />
	}

	const incomeChartConfig: ChartConfig = {
		amount: {
			label: 'Amount',
		},
	}

	currentMonthIncomeTransactions.forEach((transaction) => {
		incomeChartConfig[transaction.categoryName] = {
			label: transaction.categoryName,
			color: transaction.fill,
		}
	})

	const expensesChartConfig: ChartConfig = {
		amount: {
			label: 'Amount',
		},
	}

	currentMonthExpensesTransactions.forEach((transaction) => {
		expensesChartConfig[transaction.categoryName] = {
			label: transaction.categoryName,
			color: transaction.fill,
		}
	})

	const sumIncome = currentMonthIncomeTransactions.reduce(
		(acc, transaction) => acc + transaction.amount,
		0
	)

	const sumExpenses = currentMonthExpensesTransactions.reduce(
		(acc, transaction) => acc + transaction.amount,
		0
	)

	return (
		<div>
			<PageHeader title="Dashboard"></PageHeader>
			<Container>
				<div className="flex gap-4">
					<div className="bg-ui-50 border-ui-200 flex basis-[50%] flex-col gap-4 rounded-xl border p-6">
						<div className="text-3xl font-semibold">Income</div>
						<div>
							<div className="flex flex-col items-center">
								<div className="text-ui-950/50 text-sm font-medium">Total income</div>
								<div className="font-bold">{formatCurrency(sumIncome)}</div>
							</div>
							<ChartContainer config={incomeChartConfig} className="min-h-[200px] w-full">
								<PieChart>
									<Pie
										data={currentMonthIncomeTransactions}
										dataKey="amount"
										nameKey="categoryName"
										innerRadius={70}
										stroke="var(--color-ui-950)"
									>
										<LabelList
											dataKey="amount"
											stroke="none"
											fontSize={14}
											className="fill-ui-950 font-semibold"
											formatter={(amount: number) => {
												const percent = `${Math.round((amount / sumIncome) * 100)}%`

												return percent
											}}
										/>
									</Pie>
									<ChartLegend
										content={<ChartLegendContent nameKey="categoryName" />}
										className="text-ui-950 -translate-y-2 flex-wrap gap-2 text-sm font-medium *:basis-1/4 *:justify-center"
									/>
									<ChartTooltip content={<ChartTooltipContent hideLabel />} />
								</PieChart>
							</ChartContainer>
						</div>
					</div>
					<div className="bg-ui-50 border-ui-200 flex basis-[50%] flex-col gap-4 rounded-xl border p-6">
						<div className="text-3xl font-semibold">Expenses</div>
						<div>
							<div className="flex flex-col items-center">
								<div className="text-ui-950/50 text-sm font-medium">Total Expenses</div>
								<div className="font-bold">{formatCurrency(sumExpenses)}</div>
							</div>
							<ChartContainer config={expensesChartConfig} className="min-h-[200px] w-full">
								<PieChart>
									<Pie
										data={currentMonthExpensesTransactions}
										dataKey="amount"
										nameKey="categoryName"
										innerRadius={70}
										stroke="var(--color-ui-950)"
									>
										<LabelList
											dataKey="amount"
											stroke="none"
											fontSize={14}
											className="fill-ui-950 font-semibold"
											formatter={(amount: number) => {
												const percent = `${Math.round((amount / sumExpenses) * 100)}%`

												return percent
											}}
										/>
									</Pie>
									<ChartLegend
										content={<ChartLegendContent nameKey="categoryName" />}
										className="text-ui-950 -translate-y-2 flex-wrap gap-2 text-sm font-medium *:basis-1/4 *:justify-center"
									/>
									<ChartTooltip content={<ChartTooltipContent hideLabel />} />
								</PieChart>
							</ChartContainer>
						</div>
					</div>
				</div>
			</Container>
		</div>
	)
}
