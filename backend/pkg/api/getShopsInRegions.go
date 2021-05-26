package api

import (
	"github.com/J-HowHuang/Ramen-Live/backend/pkg/db"
)

func HandleGetShopsInRegions(message map[string]interface{}) map[string]interface{} {
	regions := message["regions"].([]interface{})
	regions_int := make([]int, len(regions))
	for i, r := range regions {
		regions_int[i] = int(r.(float64))
	}
	return db.GetShopsInRegions(regions_int)
}
