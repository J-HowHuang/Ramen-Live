package api

// import (
// 	"log"

// 	"github.com/J-HowHuang/Ramen-Live/backend/pkg/db"
// 	"github.com/J-HowHuang/Ramen-Live/backend/pkg/loc"
// )

// // GetHomePage:

// // frontend -> { userid, userlocation } -> backend

// // backend  -> { popularshoplist(shopid[]), nearbyshoplist[], favoriteshoplist(shopid[]) }

func HandleGetHomePage(message map[string]interface{}) map[string]interface{} {
// 	log.Println(message["homepageshoplist"])

	resp := make(map[string]interface{})

// 	cityList := loc.GetCityList(message["userlocation"].(map[string]interface{}))
// 	resp["homepageshoplist"] = loc.GetShopList(cityList)
// 	resp["favoriteshoplist"] = db.GetFavoriteShopList(message["userid"].(string))

	return resp
}
