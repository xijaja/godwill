import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Sidebar from "@components/Layouts/Sidebar";
import Flow from "@components/Flow/Flow";
import { useMemo } from 'react'
import {useParams} from 'react-router'


export default function FlowPage() {
	const {flowID } = useParams()

	// todo 获取数据
	useMemo(() =>  {
		console.log("useMemo")
	}, []);

	return (
		<>
			<div>{flowID}</div>
			<DndProvider backend={HTML5Backend}>
				<div className="flex">
					<Sidebar />
					<Flow />
				</div>
			</DndProvider>
		</>
	)
}