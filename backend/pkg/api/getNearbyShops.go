package api

import (
    "log"
    "sort"
    "github.com/J-HowHuang/Ramen-Live/backend/pkg/db"
    "go.mongodb.org/mongo-driver/bson/primitive"
)

type ByDistance []primitive.M
func (a ByDistance) Len() int           { return len(a) }
func (a ByDistance) Swap(i, j int)      { a[i], a[j] = a[j], a[i] }
func (a ByDistance) Less(i, j int) bool { return a[i]["distance"].(float64) < a[j]["distance"].(float64) }

func HandleGetNearbyShops(message map[string]interface{}) map[string]interface{} {
    location := message["user_location"].(map[string]interface{})
    lat := location["lat"].(float64)
    lon := location["lon"].(float64)
    query := db.GetShopsInRange(lat, lon, 0.002, 0.002)
    nearby_shops := query["shops_id"]

    for _, shop := range nearby_shops.([]primitive.M) {
        shop["distance"] = distance(lat, lon, shop["position_x"].(float64), shop["position_y"].(float64))
    }
    sort.Sort(ByDistance(nearby_shops.([]primitive.M)))
    query["shops_id"] = nearby_shops
    log.Printf("shops_id: ", nearby_shops)
    return query
}

func distance(x1 , y1, x2, y2 float64) float64 {
    return (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)
}