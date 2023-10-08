import Layout from '@components/Layouts/Layout.tsx'
import {doFetch} from '@lib/dofetch.ts'
import {useMemo, useState} from 'react'
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@components/ui/table"
import btnClass from '@lib/buttons.ts'


const getStrategyList = async () => {
	const resp = await doFetch({
		api: '/v1/decision/info',
		method: 'POST',
		body: {}
	})
	return resp.data.strategys
}


export default function StrategyPage() {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_strategyList, setStrategyList] = useState<[]>([])

	useMemo(async () => {
		setStrategyList(await getStrategyList())
	}, []).then(r => r);

	return (
		<>
			<Layout>
				<button className={btnClass()}>添加策略</button>
				<Table className="mt-6">
					<TableHeader>
						<TableRow>
							<TableHead className="w-[100px]">ID</TableHead>
							<TableHead>策略名称</TableHead>
							<TableHead>策略类型</TableHead>
							<TableHead>版本</TableHead>
							<TableHead className="text-right">操作</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell className="font-medium">INV001</TableCell>
							<TableCell>小额贷用信策略</TableCell>
							<TableCell>用信策略</TableCell>
							<TableCell>v1.2</TableCell>
							<TableCell className="text-right">编辑</TableCell>
						</TableRow>
					</TableBody>
					<TableCaption>没有更多辣～</TableCaption>
				</Table>
			</Layout>
		</>
	)
}