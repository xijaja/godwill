package apis

import (
	"github.com/gofiber/fiber/v2"
	"godwill/code"
	"godwill/db/model"
	"godwill/utils"
)

type decision struct{}

// GetOneOrManyInfo 获取产品信息
func (d *decision) GetOneOrManyInfo(c *fiber.Ctx) error {
	// 声明请求参数结构体
	req := struct {
		StrategyID string `json:"strategy_id"`
	}{}
	// 绑定请求参数
	_ = c.BodyParser(&req)
	// 如果没有策略 ID 则获取全部策略，否则获取单个策略
	var strategy model.Strategy
	if req.StrategyID == "" {
		return c.JSON(code.Ok.Reveal(fiber.Map{
			"msg":       "查询产品信息成功",
			"strategys": strategy.FindAll(),
		}))
	}
	// 验证 StrategyID 格式
	if !utils.IsUUid(req.StrategyID) {
		return c.JSON(code.Ok.Reveal(fiber.Map{
			"msg": "product_id 参数错误",
		}))
	}
	return c.JSON(code.Ok.Reveal(fiber.Map{
		"msg":      "查询产品信息成功",
		"strategy": strategy.FindOne(req.StrategyID),
	}))
}

// AddOrUpdate 添加一个决策
func (d *decision) AddOrUpdate(c *fiber.Ctx) error {
	// 声明请求参数结构体
	req := struct {
		ProductID  string                 `validate:"required,uuid" json:"product_id"`
		StrategyID string                 `json:"strategy_id"`
		NodeList   map[string]interface{} `validate:"required" json:"node_list"`
		EdgeList   map[string]interface{} `validate:"required" json:"edge_list"`
	}{}
	// 绑定请求参数
	_ = c.BodyParser(&req)
	// 验证请求参数
	if failedErr := code.Validator(req); failedErr != nil {
		return c.JSON(code.Bad.Reveal(fiber.Map{
			"failed": failedErr,
		}))
	}

	// todo： 验证请求参数，验证数据格式，保存数据
	return nil
}

// Run 执行决策引擎
func (d *decision) Run(c *fiber.Ctx) error {
	// 获取路由参数
	// idStr := c.Params("id")

	// idStr 必须为 uuid 格式
	// if isUUid(idStr) {
	// 	return c.JSON(code.Bad.Reveal(fiber.Map{"msg": "id 格式错误"}))
	// }

	// 执行决策引擎
	// core.EngineRun(idStr)

	return c.JSON(code.Ok.Reveal(fiber.Map{
		"msg": "👊 Yes, Iam working!",
	}))
}

// Delete 删除一个决策
func (d *decision) Delete(c *fiber.Ctx) error {
	return nil
}
