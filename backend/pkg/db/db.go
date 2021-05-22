package db

import (
	_ "github.com/joho/godotenv/autoload"
	"go.mongodb.org/mongo-driver/mongo"
)

var db *mongo.Client

func InitDB(client *mongo.Client) {
	db = client
}
