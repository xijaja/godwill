import {Handle, NodeProps, Position} from 'reactflow'
import React, {memo} from 'react'
import {useNodeStore} from '@store/store.ts'

// eslint-disable-next-line react-refresh/only-export-components
const CustomNode: React.FC<NodeProps> = ({id, data, xPos, yPos}) => {
	const updateNodeText = useNodeStore((state) => state.updateNodeText);

	return (
		<>
			<Handle type="target" position={Position.Left} className='bg-green-500 w-2 h-2 border-0'/>

			<div className="border rounded-md w-52 bg-white">
				<div className="bg-gray-400 text-white p-2 rounded-t-md">标题: {data.label}</div>
				<div className="p-4 text-sm">
					<p>文本: {data.text}</p>
					<input
						type="text"
						value={data.text}
						className="border rounded-md w-full p-1 mt-2"
						onChange={(e)=> updateNodeText(id, e.target.value)}
					/>
					<p>位置: {xPos.toFixed(2)}, {yPos.toFixed(2)}</p>
				</div>
			</div>

			<div className="flex flex-col">
				<Handle type="source" position={Position.Right} id="a" className='mt-4 w-2 h-2 bg-gray-300 border-0'/>
				<Handle type="source" position={Position.Right} id="b" className="mt-8 w-2 h-2 bg-gray-300 border-0"/>
			</div>
		</>
	)
}

// eslint-disable-next-line react-refresh/only-export-components
export default memo(CustomNode);