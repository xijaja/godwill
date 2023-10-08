package model

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

// StrategyVersion 策略版本表
// 同一个策略只能有一个发布的版本
type StrategyVersion struct {
	ID         uuid.UUID              `gorm:"comment:id;type:uuid;primary key;" json:"id"`
	Version    string                 `gorm:"comment:策略版本;" json:"version"`
	NodeList   map[string]interface{} `gorm:"comment:节点列表;type:json;" json:"node_list"` // 节点列表，json 格式
	EdgeList   map[string]interface{} `gorm:"comment:连线列表;type:json;" json:"edge_list"` // 连线列表，json 格式
	IsPublish  bool                   `gorm:"comment:是否发布;type:bool;default:false" json:"is_publish"`
	PublishAt  *LocalTime             `gorm:"comment:发布时间;type:timestamp(0);" json:"publish_at,omitempty"`
	StrategyID uuid.UUID              `gorm:"comment:关联策略ID;type:uuid;" json:"strategy_id"` // 关联策略ID
	SomeTimesAt
}

// BeforeCreate 在创建前调用，用于生成 uuid
func (sv *StrategyVersion) BeforeCreate(_ *gorm.DB) (err error) {
	sv.ID = uuid.New()
	return
}
