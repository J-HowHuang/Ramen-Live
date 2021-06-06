import { getShopsBrief, getPosts } from "./functions"

export default function onMessage(byteString, dispatch, client){
    const { data } = byteString
    const { content, task } = JSON.parse(data)
    console.log(`task: ${task}, data: ${data}`)
    switch(task){
        case "getShopsInRegions":
        case "getNearbyShops": {
            const { status, shops_id, message } = content
            if( status === "success"){
                let shop_list = []
                if(shops_id===null)
                    console.log("there is no shop")
                else{
                    shops_id.forEach(shop_id => {
                        shop_list.push(shop_id._id)
                    })
                }
                getShopsBrief(client, shop_list)
            }
            else
                console.log(`something wrong, error message: ${message}`)
            break
        }
        case "createShop": {
            break
        }
        case "removeShop": {
            break
        }
        case "getPosts": {
            const { status, posts, message } = content
            if(status === "success"){
                dispatch({type: "postsDetail", payload: { posts: posts===null?[]:posts }})
            }
            else
                console.log(`something wrong, error message: ${message}`)
            break
        }
        case "getShopDetail": {
            const { shop_info, status, message } = content
            if(status === "success"){
                const { _id, name, position_x, position_y, region, posts } = shop_info
                if(posts === undefined)
                    getPosts(client, [])
                else
                    getPosts(client, posts)
                dispatch({
                    type: "currentShopDetail", 
                    payload: {
                        id: _id,
                        name,
                        position_x,
                        position_y,
                        region,
                        posts: posts === undefined ? [] : posts
                    }
                })
            }
            else
                console.log(`something wrong, error message: ${message}`)
            break
        }
        case "getShopsBrief": {
            const { status, shop_info, message } = content
            if(status === "success"){
                let newData = []
                if(shop_info !== null)
                    shop_info.forEach(info => {
                        const { _id, name, profile_picture, recent_post } = info
                        newData.push({id: _id, name, profile_picture, recent_post})
                    })
                dispatch({type: "newData", payload: { data: newData }})
            }
            else
                console.log(`something wrong, error message: ${message}`)
            break
        }
        case "post": {
            const { status, post_id, message } = content
            if(status === "success"){
                dispatch({ type: "newPost", payload: { post_id } })
            }
            else
                console.log(`something wrong, error message: ${message}`)
            break
        }
        case "login": {
            const { status, user_info, message } = content
            if(status === "new user" || status === "logged in"){
                const { lineName, linePictureURL, _id } = user_info
                dispatch({ type: "login_success", payload: { lineName, linePictureURL, id: _id } })
            }
            else
                console.log(`something wrong, error message: ${message}`)
        }
        default: {
            
        }
    }
}
