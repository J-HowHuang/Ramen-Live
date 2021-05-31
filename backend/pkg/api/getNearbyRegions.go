package api

import (
    // "log"
    "github.com/J-HowHuang/Ramen-Live/backend/pkg/loc"
)

func HandleGetNearbyRegions(message map[string]interface{}) map[string]interface{} {
    location := message["user_location"].(map[string]interface{})
    lat := location["lat"].(float64)
    lon := location["lon"].(float64)
    nearbyRegions := loc.NearbyRegions(lat, lon)

    resp := make(map[string]interface{})
    resp["nearby_message"] = nearbyRegions
    return resp
}