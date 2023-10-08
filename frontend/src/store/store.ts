import {
	Connection,
	Edge,
	EdgeChange,
	Node,
	NodeChange,
	addEdge,
	OnNodesChange,
	OnEdgesChange,
	OnConnect,
	applyNodeChanges,
	applyEdgeChanges,
} from 'reactflow';
import {create} from 'zustand'


const initialNodes = [
	{id: '1', position: {x: 0, y: 0}, data: {label: '1', text: "你好1"}, type: 'start'},
	{id: '2', position: {x: 50, y: 100}, data: {label: '2', text: "你好2"}, type: 'custom'},
	{id: '3', position: {x: 300, y: 150}, data: {label: '3', text: "你好3"}, type: 'pass'},
];
const initialEdges: Edge[] = [
	{id: 'e1-2', source: '1', target: '2'},
];

export type RFState = {
	nodes: Node[];
	edges: Edge[];
	onNodesChange: OnNodesChange;
	onEdgesChange: OnEdgesChange;
	onConnect: OnConnect;
	updateNodeText: (nodeId:string, text: string) => void;
	addNode: (node: Node) => void;
}

// 这是我们的useStore挂钩，我们可以在组件中使用它来获取存储和调用操作的一部分
export const useNodeStore = create<RFState>((set, get) => ({
	nodes: initialNodes,
	edges: initialEdges,
	onNodesChange: (changes: NodeChange[]) => {
		set({
			nodes: applyNodeChanges(changes, get().nodes),
		});
	},
	onEdgesChange: (changes: EdgeChange[]) => {
		set({
			edges: applyEdgeChanges(changes, get().edges),
		});
	},
	onConnect: (connection: Connection) => {
		set({
			edges: addEdge(connection, get().edges),
		});
	},
	updateNodeText: (nodeId:string, text: string) => {
		set({
			nodes: get().nodes.map((node) => {
				if (node.id === nodeId) {
					node.data = { ...node.data, text: text };
				}
				return node;
			}),
		});
	},
	addNode: (node: Node) => {
		set({
			nodes: [...get().nodes, node],
		});
	}
}));