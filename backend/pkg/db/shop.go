package db

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func CreateShop(newShop map[string]interface{}) map[string]interface{} {
	shops := db.Database("RamenDB").Collection("shops")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	_, err := shops.InsertOne(ctx, newShop)
	if err != nil {
		// handle errors
	}
	ret := make(map[string]interface{})
	ret["status"] = "success"
	ret["shop_info"] = newShop

	return ret
}

func GetShop(shopId string) map[string]interface{} {
	shops := db.Database("RamenDB").Collection("shops")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	objID, _ := primitive.ObjectIDFromHex(shopId)
	res := shops.FindOne(ctx, bson.D{{"_id", objID}})
	var shopInfo map[string]interface{}
	res.Decode(&shopInfo)

	ret := make(map[string]interface{})
	ret["status"] = "success"
	ret["shop_info"] = shopInfo

	return ret
}

func RemoveShop(shopId string) map[string]interface{} {
	shops := db.Database("RamenDB").Collection("shops")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	res, err := shops.DeleteOne(ctx, bson.D{{"_id", shopId}})
	if err != nil {
		// handle deletion error
	}
	if res.DeletedCount == 0 {
		// handle no finding of shop
	}

	ret := make(map[string]interface{})
	ret["status"] = "success"

	return ret
}
