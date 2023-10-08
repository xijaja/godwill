import {Handle, NodeProps, Position} from 'reactflow'
import React, {memo} from 'react'

// eslint-disable-next-line react-refresh/only-export-components
const StartNode: React.FC<NodeProps> = () => {
	return (
		<>
			<div className="w-28">
				<div className="bg-gray-400 text-white p-2 rounded-full">
					<p className="text-center">开始</p>
				</div>
			</div>

			<div>
				{/* bg-white w-3 h-3 border-2 border-green-500 */}
				<Handle id="start" type="source" position={Position.Right} className='bg-green-500 w-2 h-2 border-0'/>
			</div>
		</>
	)
}

// eslint-disable-next-line react-refresh/only-export-components
export default memo(StartNode);