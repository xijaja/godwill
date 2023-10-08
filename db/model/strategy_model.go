package model

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

// StrategyType 策略类型
type StrategyType string

const (
	Admission   StrategyType = "admission"    // 准入策略
	GrantCredit StrategyType = "grant_credit" // 授信策略

	UseCredit   StrategyType = "use_credit"   // 用信策略
	QuotaAdjust StrategyType = "quota_adjust" // 调额策略
	PriceAdjust StrategyType = "price_adjust" // 调价策略

	Collection StrategyType = "collection" // 催收策略
	Other      StrategyType = "other"      // 其他策略
)

// Strategy 策略表
type Strategy struct {
	ID              uuid.UUID         `gorm:"comment:id;type:uuid;primary key;" json:"id"`
	Name            string            `gorm:"comment:策略名称;" json:"name"`
	StrategyType    StrategyType      `sql:"create type strategy_type as enum('admission','grant_credit','use_credit','quota_adjust','price_adjust','collection','other');" gorm:"comment:策略类型;default:other" json:"strategy_type"`
	StrategyVersion []StrategyVersion `gorm:"comment:关联版本关系;ForeignKey:StrategyID;references:ID"`
	SomeTimesAt
}

// BeforeCreate 在创建前调用，用于生成 uuid
func (s *Strategy) BeforeCreate(_ *gorm.DB) (err error) {
	s.ID = uuid.New()
	return
}

// FindOne 获取产品信息
func (s *Strategy) FindOne(id string) *Strategy {
	db.First(&s, "id=? AND deleted_at is null", id)
	return s
}

// FindAll 查询产品信息
func (s *Strategy) FindAll() (strategyList []Strategy) {
	db.Order("id").Where("deleted_at is null").Find(&strategyList)
	return strategyList
}
