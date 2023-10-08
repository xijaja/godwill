package access

import (
	"fmt"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"log"
	"os"
	"time"
)

// InitPostgresSQL 初始化 PostgresSQL 数据库
func InitPostgresSQL(host, user, port, pass, base string) *gorm.DB {
	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Shanghai",
		host, user, pass, base, port,
	)
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger:                 newLogger, // Gorm SQL 日志全局模式
		SkipDefaultTransaction: true,      // 禁用默认事务，提升性能
		PrepareStmt:            true,      // 执行 SQL 时缓存，提高调用速度
	})
	if err != nil {
		panic("初始化 PostgresSQL 数据库恐慌：" + err.Error())
	}
	return db
}

// Gorm SQL 日志全局模式
var newLogger = logger.New(
	log.New(os.Stdout, "\r\n", log.LstdFlags), // io writer 日志输出的目标，前缀和日志包含的内容
	logger.Config{
		SlowThreshold:             time.Second,   // 慢 SQL 阈值
		LogLevel:                  logger.Silent, // 日志级别
		IgnoreRecordNotFoundError: true,          // 忽略 ErrRecordNotFound（记录未找到）错误
		Colorful:                  false,         // 禁用彩色打印
	},
)
