package core

import "sync"

// Scanner 节点扫描器
func Scanner(nodeList Nodes) (Skewers [][]string) {
	// 从 nodeList 中找到 id 为 0 的节点，作为根节点
	rootNode := nodeList.FindNodeByID("0")
	if rootNode.Id == "" {
		panic("根节点不存在")
	}

	// 遍历 nodeList
	iterateOverNode(rootNode, nodeList, func(currentNodeID string, nextNodeId string) {
		// 遍历 Skewers 中每一项，如果最后一个元素等于 rootNode 的 id，则添加到这一项中
		for i, skewer := range Skewers {
			if skewer[len(skewer)-1] == currentNodeID {
				// 复制一份
				newSkewer := make([]string, len(skewer))
				copy(newSkewer, skewer)
				// 添加
				newSkewer = append(newSkewer, nextNodeId)
				// 验证被更新了的串中是否有重复元素
				if checkRepeat(newSkewer) {
					panic("节点串中有重复的节点")
				}
			}
			// 删除原来的
			Skewers = append(Skewers[:i], Skewers[i+1:]...)
		}

	})
	return Skewers
}

// 遍历节点
func iterateOverNode(rootNode Node, nodeList Nodes, add func(currentNodeID string, nextNodeId string)) {
	nextNodeIds := nodeList.GetNextNode(rootNode)
	if len(nextNodeIds) == 0 {
		return
	}
	for _, nextNodeId := range nextNodeIds {
		// 添加
		add(nextNodeId, nextNodeId)
		// 获取这个节点
		thenNode := nodeList.FindNodeByID(nextNodeId)
		// 递归
		var wg sync.WaitGroup
		wg.Add(1)
		go func() {
			iterateOverNode(thenNode, nodeList, add)
			wg.Done()
		}()
		wg.Wait()
	}
}

// 验证字符串数组中是否有重复的元素
func checkRepeat(arr []string) bool {
	var repeat bool
	for i, v := range arr {
		for j := i + 1; j < len(arr); j++ {
			if v == arr[j] {
				repeat = true
				break
			}
		}
	}
	return repeat
}
