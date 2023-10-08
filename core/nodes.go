package core

type Node struct {
	Id       string `json:"id"`
	Title    string `json:"title"`
	Position struct {
		X int `json:"x"`
		Y int `json:"y"`
	} `json:"position"`
	// model 模型, scorecard 评分卡, TripartiteScore 三方评分,
	// Features 特征: 本平台用户身上的数据字段
	// Result 结果: 通过 true 或 拒绝 false
	// 运算：加法运算 add, 减法运算 sub, 乘法运算 mul, 除法运算 div, 求模运算 mod
	// 取值运算：取绝对值运算 abs, 取最大值运算 max, 取最小值运算 min, 取随机数运算 random, 取向上取整运算 ceil, 取向下取整运算 floor, 取四舍五入运算 round
	// 比较运算: 大于 gt, 小于 lt, 等于 eq, 大于等于 ge, 小于等于 le, 不等于 ne
	// 逻辑运算: 并且 and, 或者 or
	// 数值：number, 字符串：string, 布尔：bool
	// 分流：switch
	NodeType string `json:"nodeType"`
	Anchors  []struct {
		Id          string   `json:"id"`
		AnchorsType string   `json:"anchorsType"` // input, output
		Connections []string `json:"connections"`
		Value       string   `json:"value"` // 如果是模型则是模型ID，如果是评分卡则是评分卡ID
	} `json:"anchors"` // 词条锚点
}

type Nodes struct {
	Nodes []Node `json:"nodes"`
}

// FindNodeByID 从 nodeList 中对应节点
func (list *Nodes) FindNodeByID(id string) Node {
	var targetNode Node
	for _, node := range list.Nodes {
		if node.Id == id {
			targetNode = node
			break
		}
	}
	return targetNode
}

// GetNextNode 获取节点的下一个节点
func (list *Nodes) GetNextNode(node Node) []string {
	var nextNodes []string
	for _, anchor := range node.Anchors {
		if anchor.AnchorsType == "output" {
			nextNodes = append(nextNodes, anchor.Connections[0])
		}
	}
	return nextNodes
}
