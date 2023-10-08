import 'reactflow/dist/style.css';
import ReactFlow, { Controls, DefaultEdgeOptions, MiniMap } from "reactflow";
import CustomNode from "../Customs/CustomNode";
import StartNode from "../Customs/StartNode";
import PassNode from "../Customs/PassNode";
import { useDrop } from "react-dnd";
import {useNodeStore, type RFState} from '@store/store.ts'
import {shallow} from 'zustand/shallow'


// 节点类型
const nodeTypes = {
	custom: CustomNode,
	start: StartNode,
	pass: PassNode,
}

// 节点状态
const selector = (state: RFState) => ({
	nodes: state.nodes,
	edges: state.edges,
	onNodesChange: state.onNodesChange,
	onEdgesChange: state.onEdgesChange,
	onConnect: state.onConnect,
})

// 默认链接线样式
const defaultEdgeOptions: DefaultEdgeOptions = {
	animated: true,
};

// 节点类型
interface NodeType {
	label: string;
	type: string;
}

export default function Flow() {
	const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useNodeStore(selector, shallow);
	const addNode = useNodeStore((state) => state.addNode);
  const [, dropRef] = useDrop({
    accept: "node",
    drop: (item: NodeType, monitor) => {
			const offset = monitor.getClientOffset();
			const x = offset?.x && offset?.x-300 || 300
			const y = offset?.y && offset?.y-30 || 300

			const node = {
				id: Date.now().toString(),
				type: item?.type,
				position: { x, y },
				data: { label: 'New Node', text: 'New Text' },
			}
			addNode(node);
    }
  })

  return (
    <>
      <div className="p-2 border rounded" style={{ width: '100vw', height: '59vw' }}>
        <ReactFlow
          ref={dropRef}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          defaultEdgeOptions={defaultEdgeOptions}
        >
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>

      <div className="flex">
				<div className="text-sm text-gray-600 border rounded p-2 w-1/2">
					Nodes 节点数据:
					<pre className="text-gray-600">
						{JSON.stringify(nodes, null, 2)}
					</pre>
				</div>
				<div className="text-sm text-gray-600 border rounded p-2 w-1/2">
					Edges 连接数据:
					<pre className="text-gray-600">
						{JSON.stringify(edges, null, 2)}
					</pre>
				</div>
			</div>
    </>
  )
}