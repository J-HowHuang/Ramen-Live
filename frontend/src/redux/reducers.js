// import { Redirect } from "react-router"

const initialState = {
    connection: {
        isConnected: false,
        socket:0,
    },
    user: {
        isLogin: false,
        userId: "",
        userName: "",
        userFavoriteList: []
    },
    shopList: {
        searchQuery: "",
        searchType: "name",
        data: [
            { name: '麵屋0', id: '0', tags: ['雞白湯'] },
            { name: '麵屋1', id: '1', tags: ['沾麵', '豚骨'] },
            { name: '麵屋2', id: '2', tags: ['豚骨'] },
            { name: '麵屋3', id: '3', tags: ['沾麵', ] },
            { name: '麵屋4', id: '4', tags: ['豚骨'] },
            { name: '麵屋5', id: '5', tags: ['雞白湯'] },
            { name: '麵屋6', id: '6', tags: ['貝類'] },
            { name: '麵屋7', id: '7', tags: ['泡系'] },
            { name: '麵屋8', id: '8', tags: ['魚介'] },
            { name: '麵屋9', id: '9', tags: ['豚骨'] },
            { name: '麵屋10', id: '10', tags: ['沾麵'] },
            { name: '麵屋11', id: '11', tags: ['泡系'] },
            { name: '麵屋12', id: '12', tags: ['沾麵', '豚骨'] },
        ],
        show: [
            { name: '麵屋0', id: '0', tags: ['雞白湯'] },
            { name: '麵屋1', id: '1', tags: ['沾麵', '豚骨'] },
            { name: '麵屋2', id: '2', tags: ['豚骨'] },
            { name: '麵屋3', id: '3', tags: ['沾麵', ] },
            { name: '麵屋4', id: '4', tags: ['豚骨'] },
            { name: '麵屋5', id: '5', tags: ['雞白湯'] },
            { name: '麵屋6', id: '6', tags: ['貝類'] },
            { name: '麵屋7', id: '7', tags: ['泡系'] },
            { name: '麵屋8', id: '8', tags: ['魚介'] },
            { name: '麵屋9', id: '9', tags: ['豚骨'] },
            { name: '麵屋10', id: '10', tags: ['沾麵'] },
            { name: '麵屋11', id: '11', tags: ['泡系'] },
            { name: '麵屋12', id: '12', tags: ['沾麵', '豚骨'] },
        ],
    }   
}

const rootReducer = (state = initialState, action) => {
    // console.log(state.shopList)
    if (action.type === "home") {
        return Object.assign({}, state, {
            shopList: Object.assign({}, state.shopList, {
                show: state.shopList.data
            })}
        )
    }
    if (action.type === 'search') {
        let newShopList = []
        state.shopList.data.forEach((shopInfo) => {
            if (state.shopList.searchType === "name" && shopInfo.name.includes(state.shopList.searchQuery)) {
                newShopList.push(shopInfo)
            }
            if (state.shopList.searchType === "tags"){
                let check = false
                shopInfo.tags.forEach((tag) => {
                    if(tag.includes(state.shopList.searchQuery)){
                        check = true
                    }
                })
                if(check){
                    newShopList.push(shopInfo)
                }
            }
        })
        console.log(newShopList)
        return Object.assign({}, state, {
            shopList: Object.assign({}, state.shopList, {
                show: newShopList
            })}
        )
    }
    if(action.type === "searchTypeChanged"){
        return Object.assign({}, state, {
            shopList: Object.assign({}, state.shopList, {
                searchType: action.payload.searchType
            })}
        )
    }
    if(action.type === "searchQueryChanged"){
        return Object.assign({}, state, {
            shopList: Object.assign({}, state.shopList, {
                searchQuery: action.payload.searchQuery
            })}
        )
    }
    if(action.type === "connected"){
        return Object.assign({}, state, {
            connection: Object.assign({}, state.connection, {
                isConnected: true,
                socket: action.payload.socket
            })}
        )
    }
    if(action.type === "login"){
        return state
    }
    return state
}

export default rootReducer