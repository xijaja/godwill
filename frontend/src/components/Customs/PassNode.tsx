import {Handle, NodeProps, Position} from 'reactflow'
import React, {memo} from 'react'

// eslint-disable-next-line react-refresh/only-export-components
const PassNode: React.FC<NodeProps> = () => {
	return (
		<>
			<Handle type="target" position={Position.Left} className='bg-green-500 w-2 h-2 border-0' />
			
			<div className="w-28">
				<div className="bg-gray-400 text-white p-2 rounded-full">
					<p className="text-center">通过</p>
				</div>
			</div>
		</>
	)
}

// eslint-disable-next-line react-refresh/only-export-components
export default memo(PassNode);