package db

import (
	"context"
	"fmt"
	"log"
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
	ret := make(map[string]interface{})

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	objID, _ := primitive.ObjectIDFromHex(shopId)
	res := shops.FindOne(ctx, bson.D{{"_id", objID}})
	if res.Err() != nil {
		ret["status"] = "error"
		ret["message"] = res.Err().Error()
		return ret
	}
	var shopInfo map[string]interface{}
	res.Decode(&shopInfo)

	ret["status"] = "success"
	ret["shop_info"] = shopInfo
	if brief {
		briefInfo := make(map[string]interface{})
		briefInfo["_id"] = shopInfo["_id"]
		briefInfo["name"] = shopInfo["name"]
		briefInfo["profile_picture"] = shopInfo["profile_picture"]
		if posts, ok := shopInfo["posts"]; ok {
			postPA := posts.(primitive.A)
			if len(postPA) > 0 {
				recentPost := []interface{}(postPA)[0]
				postRes := GetPost(recentPost.(primitive.ObjectID))
				if postRes["status"] == "error" {
					briefInfo["recent_post"] = "cannot retreive the post"
				} else {
					briefInfo["recent_post"] = postRes["post_info"]
				}
			}
		}
		ret["shop_info"] = briefInfo
	}

	return ret
}

func GetShopsInRegions(regions []int) map[string]interface{} {
	shops := db.Database("RamenDB").Collection("shops")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	ret := make(map[string]interface{})
	cursor, err := shops.Find(ctx, bson.D{{
		"region", bson.D{
			{"$in", regions},
		},
	}})
	if err != nil {
		ret["status"] = "error"
		ret["message"] = err.Error()
		return ret
	}

	var results []bson.M
	if err := cursor.All(context.TODO(), &results); err != nil {
		ret["status"] = "error"
		ret["message"] = err.Error()
		return ret
	}
	ret["status"] = "success"
	ret["shops_id"] = results
	return ret
}

func GetShopsInRange(lat float64, lon float64, hor float64, ver float64) map[string]interface{} {
	left, right := lat-hor, lat+hor
	up, down := lon+ver, lon-ver
	shops := db.Database("RamenDB").Collection("shops")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	ret := make(map[string]interface{})
	cursor, err := shops.Find(ctx, bson.D{{
		"$and", []bson.D{
			bson.D{{"position_x", bson.D{{"$gt", left}}}},
			bson.D{{"position_x", bson.D{{"$lt", right}}}},
			bson.D{{"position_y", bson.D{{"$gt", down}}}},
			bson.D{{"position_y", bson.D{{"$lt", up}}}},
		},
	}})
	if err != nil {
		ret["status"] = "error"
		ret["message"] = err.Error()
		return ret
	}

	var results []bson.M
	if err := cursor.All(context.TODO(), &results); err != nil {
		ret["status"] = "error"
		ret["message"] = err.Error()
		return ret
	}
	ret["status"] = "success"
	ret["shops_id"] = results
	log.Println("results: ", ret["shops_id"])
	fmt.Println("results: ", ret["shops_id"])
	return ret
}

func RemoveShop(shopId string) map[string]interface{} {
	shops := db.Database("RamenDB").Collection("shops")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	ret := make(map[string]interface{})
	objID, _ := primitive.ObjectIDFromHex(shopId)
	res, err := shops.DeleteOne(ctx, bson.D{{"_id", objID}})
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

func PostAtShop(newPost map[string]interface{}, shopId string) map[string]interface{} {
	postRes := createPost(newPost)
	ret := make(map[string]interface{})

	shops := db.Database("RamenDB").Collection("shops")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	objID, _ := primitive.ObjectIDFromHex(shopId)
	if postRes["status"] == "error" {
		return postRes
	} else {
		res, err := shops.UpdateByID(ctx, objID, bson.D{{
			"$push", bson.D{{
				"posts", bson.D{
					{"$each", []interface{}{postRes["post_id"]}},
					{"$position", 0},
				},
			}},
		}})
		if err != nil {
			ret["status"] = "error"
			ret["message"] = err.Error()
			return ret
		}
		if res.MatchedCount == 0 {
			ret["status"] = "error"
			ret["message"] = "shop not found"
		} else {
			ret["status"] = "success"
			ret["post_id"] = postRes["post_id"]
		}
		return ret

	}
}
