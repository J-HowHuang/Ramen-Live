package api

import "github.com/J-HowHuang/Ramen-Live/backend/pkg/db"

func HandlePopShopInfo(message map[string]interface{}) map[string]interface{} {
	shops := message["shop_list"].([]interface{})
	ret := make(map[string]interface{})
	var shopInfos []map[string]interface{}
	for _, id := range shops {
		shop := db.GetShop(id.(string))
		shopInfos = append(shopInfos, shop["shop_info"].(map[string]interface{}))
	}
	ret["status"] = "success"
	ret["shop_info"] = shopInfos
	return ret
}
