package apis

import (
	"github.com/gofiber/fiber/v2"
	"godwill/code"
	"godwill/middle"
)

// Api 路由组，访问以下所有路由都需加上 /api
func Api(api fiber.Router) {
	api.Get("/", hello)   // 保留的路由，用以验活
	api.Get("/hi", hello) // 保留的路由，用以验活

	api.Post("/login", login)                // 登录 fixme: 仅作演示
	api.Post("/sth", middle.Auth(), postSth) // 带有权限验证 fixme: 仅作演示

	apiV1 := api.Group("/v1") // middle.Auth()

	var d *decision // 决策
	apiV1.Post("/decision/info", d.GetOneOrManyInfo)
	apiV1.Post("/decision/aou", d.AddOrUpdate)
	apiV1.Post("/decision/:id", d.Run)

	var p *product // 产品
	apiV1.Post("/product/info", p.GetOneOrManyInfo)
	apiV1.Post("/product/aou", p.AddOrUpdate)
}

// 服务端 api 路由
func hello(c *fiber.Ctx) error {
	return c.JSON(code.Ok.Reveal(fiber.Map{"msg": "👊 Yes, Iam working!"}))
}
