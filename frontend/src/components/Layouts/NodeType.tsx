import {useDrag} from "react-dnd";

export interface NodeTypeProps {
	label: string;
	type: string;
}

export default function NodeType({ label, type}: NodeTypeProps) {
	const [, drag] = useDrag(() => ({
		type: "node",
		item: { type, label},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(), // 是否正在拖拽
		}),
	})); // 拖动

	return (
		<>
			<div
				ref={drag}
				className="flex flex-col cursor-pointer w-52 mx-auto items-center justify-center border-b-2 p-2 hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600"
			>
				<p>{type}</p>
				<p>{label}</p>
			</div>
		</>
	)
}