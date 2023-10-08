package utils

import "github.com/google/uuid"

// IsUUid 判断是否为 UUID 格式
func IsUUid(id string) bool {
	_, err := uuid.Parse(id)
	return err == nil
}
