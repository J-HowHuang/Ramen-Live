package loc

const (
	北北基 = iota
	桃園
	新竹
	苗栗
	台中
	彰化
	南投
	雲林
	嘉義
	台南
	高雄
	屏東
	宜蘭
	花蓮
	台東
	cityNum // 15
)

const MAX_CITY_SHOP = 200

var cityShopList = make([][]int, cityNum)

// var shopcnt = make([]int,  citynum)

func init() {
	cityShopList = [][]int{
		{1, 3},
		{12, 15},
		{20},
		{37, 39},
		{41},
		{50},
		{66, 67},
		{73, 75, 78},
		{81},
		{90},
		{103},
		{111},
		{122, 123},
		{130},
		{148},
	}
}

func GetShopList(cityList []int) []int {
	shopList := []int{}
	for i := 0; i < cityNum; i++ {
		shopList = append(shopList, cityShopList[cityList[i]]...)
	}
	return shopList
}
