package apis

import "github.com/gofiber/fiber/v2"

type user struct{}

// Register 注册
func (u *user) Register(c *fiber.Ctx) error {
	return nil
}

// Login 登录
func (u *user) Login(c *fiber.Ctx) error {
	return nil
}

// Logout 登出
func (u *user) Logout(c *fiber.Ctx) error {
	return nil
}

// Add 添加用户
func (u *user) Add(c *fiber.Ctx) error {
	return nil
}

// GetOne 查询单个用户
func (u *user) GetOne(c *fiber.Ctx) error {
	return nil
}

// GetAll 查询所有用户
func (u *user) GetAll(c *fiber.Ctx) error {
	return nil
}

// UpdateOne 更新单个用户: 启用禁用、修改密码、修改头像、修改角色
func (u *user) UpdateOne(c *fiber.Ctx) error {
	return nil
}

// DeleteOne 删除单个用户
func (u *user) DeleteOne(c *fiber.Ctx) error {
	return nil
}
