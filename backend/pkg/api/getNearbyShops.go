package api

import (
    // "log"
    "sort"
    "github.com/J-HowHuang/Ramen-Live/backend/pkg/db"
)

type Shop struct {

}

type ByDistance []map[string]interface{}
func (a ByDistance) Len() int           { return len(a) }
func (a ByDistance) Swap(i, j int)      { a[i], a[j] = a[j], a[i] }
func (a ByDistance) Less(i, j int) bool { return a[i]["distance"].(float64) < a[j]["distance"].(float64) }

func HandleGetNearbyShops(message map[string]interface{}) map[string]interface{} {
    location := message["user_location"].(map[string]interface{})
    lat := location["lat"].(float64)
    lon := location["lon"].(float64)
    query := db.GetShopsInRange(lat, lon, 0.002, 0.002)
    nearby_shops := query["nearby_shops"]

    for _, shop := range nearby_shops.([]map[string]interface{}) {
        shop["distance"] = distance(lat, lon, shop["position_x"].(float64), shop["position_y"].(float64))
    }
    sort.Sort(ByDistance(nearby_shops.([]map[string]interface{})))
    query["nearby_shops"] = nearby_shops
    return query
}

func distance(x1 , y1, x2, y2 float64) float64 {
    return (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)
}