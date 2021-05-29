package api

import (
	"log"
	// "github.com/J-HowHuang/Ramen-Live/loc/pkg/db"
	"github.com/J-HowHuang/Ramen-Live/loc/pkg/loc"
)

func GetNearbyShops(message map[string]interface{}) map[string]interface{} {
	// regions := message["regions"].([]interface{})
	// regions_int := make([]int, len(regions))
	// for i, r := range regions {
	// 	regions_int[i] = int(r.(float64))
	// }
	// return db.GetShopsInRegions(regions_int)

	log.Println(2)

	location := message["user_location"].(map[string]interface{})
	log.Println(2)
	nearbyRegions := loc.GetNearbyRegions(location)
	for i, r := range nearbyRegions {
		log.Println(i, r)
	}

	response := make(map[string]interface{})

	return response
}
