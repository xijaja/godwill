package model

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

// Product 产品表
type Product struct {
	ID                  uuid.UUID `gorm:"comment:id;type:uuid;primary key;" json:"id"`
	Name                string    `gorm:"comment:产品名称;" json:"name"`
	Desc                string    `gorm:"comment:产品描述;" json:"desc"`
	AdmissionStrategy   string    `gorm:"comment:准入策略;" json:"admission_strategy"`
	GrantCreditStrategy string    `gorm:"comment:授信策略;" json:"grant_credit_strategy"`
	UseCreditStrategy   string    `gorm:"comment:用信策略;" json:"use_credit_strategy"`
	QuotaAdjustStrategy string    `gorm:"comment:调额策略;" json:"quota_adjust_strategy"`
	PriceAdjustStrategy string    `gorm:"comment:调价策略;" json:"price_adjust_strategy"`
	CollectionStrategy  string    `gorm:"comment:催收策略;" json:"collection_strategy"`
	SomeTimesAt
}

// BeforeCreate 在创建前调用，用于生成 uuid
func (p *Product) BeforeCreate(_ *gorm.DB) (err error) {
	p.ID = uuid.New()
	return
}

// FindOne 获取产品信息
func (p *Product) FindOne(id string) *Product {
	db.First(&p, "id=? AND deleted_at is null", id)
	return p
}

// FindAll 查询产品信息
func (p *Product) FindAll() (products []Product) {
	db.Order("id").Where("deleted_at is null").Find(&products)
	return products
}

// CreateOne 创建一个产品
func (p *Product) CreateOne() *Product {
	db.Create(&p)
	return p
}

// UpdateOne 更新一个产品
func (p *Product) UpdateOne(id string) *Product {
	db.Model(&p).Where("id=? AND deleted_at is null", id).Updates(p)
	return p
}
