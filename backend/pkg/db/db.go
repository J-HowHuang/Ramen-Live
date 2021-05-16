package db

import (
	"log"
	"os"
	_ "github.com/joho/godotenv/autoload"
)

func init() {
	db_ip := os.Getenv("DB_IP")
	log.Println(db_ip)
}

func GetUserInformation(userid string) map[string]interface{} {
	data := make(map[string]interface{})
	data["username"] = "kaikai"
	data["useravatar"] = "pekora"
	return data;
}