package api

import (
	"github.com/J-HowHuang/Ramen-Live/backend/pkg/db"
)

func HandleGetShopsInRegions(message map[string]interface{}) map[string]interface{} {
	if regions, ok := message["regions"].([]interface{}); ok {
		regions_int := make([]int, len(regions))
		for i, r := range regions {
			if _, ok := r.(float64); ok {
				regions_int[i] = int(r.(float64))
			} else {
				continue
			}
		}
		return db.GetShopsInRegions(regions_int)
	} else {
		return formatError()
	}
}
