//  import { Redirect } from "react-router"
import { getNearbyShops, getPosts } from '../connection/functions'

const initialState = {
    connection: {
        isConnected: false,
        socket:0,
    },
    user: {
        firstTime: true,
        isLogin: false,
        userId: "",
        userName: "",
        userPictureURL: "",
        userFavoriteList: [],
        havePosition: false,
        userPosition_x: 0,
        userPosition_y: 0
    },
    shopList: {
        searchQuery: "",
        searchType: "name",
        data: [],
        show: [],
    },
    currentShop:{
        id:"",
        name:"",
        position_x: 0,
        positioin_y: 0,
        region: 0,
        posts_id: []
    },
    currentPosts: []
}

const rootReducer = (state = initialState, action) => {
    // console.log(state.shopList)
    if (action.type === "login_success") {
        return Object.assign({}, state, {
            user: Object.assign({}, state.user, {
                userName: action.payload.lineName,
                userId: action.payload.id,
                userPictureURL: action.payload.linePictureURL,
                isLogin: true
            })}
        )
    }
    if (action.type === "location") {
        let newState = Object.assign({}, state, {
            user: Object.assign({}, state.user, {
                havePosition: true,
                userPosition_x: action.payload.x,
                userPosition_y: action.payload.y
            })}
        )
        getNearbyShops(state.connection.socket, action.payload.x, action.payload.y)
        return newState
    }
    if (action.type === "resetFirstTime") {
        return Object.assign({}, state, {
            user: Object.assign({}, state.user, {
                firstTime: true
            })}
        )
    }
    if (action.type === "noLocation") {
        let newState = Object.assign({}, state, {
            user: Object.assign({}, state.user, {
                havePosition: false,
                userPosition_x: 0,
                userPosition_y: 0,
                firstTime: false
            })}
        )
        if(state.user.firstTime===false)
            alert("沒有位置授權")
        return newState
    }
    if (action.type === "newPost") {
        let newPosts = [action.payload.post_id].concat(state.currentShop.posts_id)
        getPosts(state.connection.socket, newPosts)
        return Object.assign({}, state, {
            currentShop: Object.assign({}, state.currentShop, {
                posts_id: newPosts
            })}
        )
    }
    if (action.type === "postsDetail") {
        return Object.assign({}, state, {
            currentPosts: action.payload.posts
        })
    }
    if (action.type === "currentShopDetail") {
        return Object.assign({}, state, {
            currentShop: {
                id: action.payload.id,
                name: action.payload.name,
                position_x: action.payload.position_x,
                position_y: action.payload.position_y,
                region: action.payload.region,
                posts_id: action.payload.posts
            }}
        )
    }
    if (action.type === "newData") {
        return Object.assign({}, state, {
            shopList: Object.assign({}, state.shopList, {
                data: action.payload.data,
                show: action.payload.data
            })}
        )
    }
    if (action.type === "home") {
        return Object.assign({}, state, {
            shopList: Object.assign({}, state.shopList, {
                show: state.shopList.data
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
    if(action.type === "filter"){
        let newShopList = []
        if(state.shopList.data!==null){
            state.shopList.data.forEach((shopInfo) => {
                if (shopInfo.name.includes(action.payload.filter)) {
                    newShopList.push(shopInfo)
                }
                else{
                    let check = false
                    if(shopInfo.tags!==null && shopInfo.tags!==undefined){
                        shopInfo.tags.forEach((tag) => {
                            if(tag.includes(action.payload.filter)){
                                check = true
                            }   
                        })
                    }
                    
                    if(check){
                        newShopList.push(shopInfo)
                    }
                }
            })
        }
        console.log(newShopList)
        return Object.assign({}, state, {
            shopList: Object.assign({}, state.shopList, {
                show: newShopList
            })}
        )
    }
    return state
}

export default rootReducer