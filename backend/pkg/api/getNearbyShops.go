package api

import (
    // "log"
    "github.com/J-HowHuang/Ramen-Live/backend/pkg/db"
)

func HandleGetNearbyShops(message map[string]interface{}) map[string]interface{} {
    location := message["user_location"].(map[string]interface{})
    lat := location["lat"].(float64)
    lon := location["lon"].(float64)
    return db.GetShopsInRange(lat, lon, 0.002, 0.002)
}