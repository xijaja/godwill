package apis

import (
	"github.com/gofiber/fiber/v2"
	"godwill/code"
	"godwill/db/model"
	"godwill/utils"
)

type product struct{}

// GetOneOrManyInfo 获取产品信息
func (p *product) GetOneOrManyInfo(c *fiber.Ctx) error {
	// 声明请求参数结构体
	req := struct {
		ProductID string `json:"product_id"`
	}{}
	_ = c.BodyParser(&req) // 绑定请求参数
	// 如果没有指定产品 ID 则获取全部产品信息，否则获取单个
	var product model.Product
	if req.ProductID == "" {
		return c.JSON(code.Ok.Reveal(fiber.Map{
			"msg":      "查询产品信息成功",
			"products": product.FindAll(),
		}))
	}
	// 验证 ProductID 格式
	if !utils.IsUUid(req.ProductID) {
		return c.JSON(code.Ok.Reveal(fiber.Map{
			"msg": "product_id 参数错误",
		}))
	}
	return c.JSON(code.Ok.Reveal(fiber.Map{
		"msg":     "查询产品信息成功",
		"product": product.FindOne(req.ProductID),
	}))
}

// AddOrUpdate 添加或更新产品信息
func (p *product) AddOrUpdate(c *fiber.Ctx) error {
	// 声明请求参数结构体
	req := struct {
		ProductID   string `json:"product_id"`
		ProductName string `validate:"required" json:"product_name"`
		ProductDesc string `json:"product_desc"`
	}{}
	_ = c.BodyParser(&req) // 绑定请求参数
	// 验证请求参数
	if failedErr := code.Validator(req); failedErr != nil {
		return c.JSON(code.Bad.Reveal(fiber.Map{
			"failed": failedErr,
		}))
	}

	// 如果没有 ID 则是添加，否则是更新
	if req.ProductID == "" {
		pd := model.Product{
			Name: req.ProductName,
			Desc: req.ProductDesc,
		}
		pd.CreateOne()
		return c.JSON(code.Ok.Reveal(fiber.Map{
			"msg": "创建成功",
		}))
	}
	// 更新前验证格式
	if !utils.IsUUid(req.ProductID) {
		return c.JSON(code.Ok.Reveal(fiber.Map{
			"msg": "product_id 参数错误",
		}))
	}
	// 更新
	pd := model.Product{
		Name: req.ProductName,
		Desc: req.ProductDesc,
	}
	pd.UpdateOne(req.ProductID)
	// 构建返回
	return c.JSON(code.Ok.Reveal(fiber.Map{
		"msg": "更新成功",
	}))
}
