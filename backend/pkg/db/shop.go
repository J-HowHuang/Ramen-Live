package db

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func validShop(shop map[string]interface{}) bool {
	required := []string{
		"name",
		"position_x",
		"position_y",
		"region",
	}
	for _, f := range required {
		if _, ok := shop[f]; !ok {
			return false
		}
	}
	return true
}

func CreateShop(newShop map[string]interface{}) map[string]interface{} {
	ret := make(map[string]interface{})
	shops := db.Database("RamenDB").Collection("shops")
	if !validShop(newShop) {
		ret["status"] = "error"
		ret["message"] = "Missing data in required field"
		return ret
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	res, err := shops.InsertOne(ctx, newShop)
	if err != nil {
		ret["status"] = "error"
		ret["message"] = err.Error()
	} else {
		ret["status"] = "success"
		ret["shop_id"] = res.InsertedID
	}

	return ret
}

func GetShop(shopId string, brief bool) map[string]interface{} {
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

	ret := make(map[string]interface{})
	res, err := shops.DeleteOne(ctx, bson.D{{"_id", shopId}})
	if err != nil {
		ret["status"] = "error"
		ret["message"] = err.Error()
		return ret
	}
	if res.DeletedCount == 0 {
		ret["status"] = "nothing removed"
		return ret
	} else {
		ret["status"] = "success"
		return ret
	}

}
