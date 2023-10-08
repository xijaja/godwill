import NodeType, { NodeTypeProps } from "./NodeType";


export default function Sidebar() {
  // 侧边栏节点
  const nodes: NodeTypeProps[] = [
    {
      label: "消息",
      type: "custom",
    },
    {
      label: "通过",
      type: "pass",
    },
  ];

  return (
    <>
      <div className="border-2 border-[#DBDBDB]">
        {/* 遍历节点类型 */}
        {nodes.map((node, index) => (
          <NodeType key={index} {...node} />
        ))}
      </div>
    </>
  )
}