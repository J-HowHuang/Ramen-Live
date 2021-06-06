import sendMsg from './sendMsg'

function login(socket, access_token){
    let task = "login"
    let message = {
        type: "line",
        access_token
    }
    sendMsg(socket, task, message)
}

function getShopsInRegion(socket, regions){
    let task = "getShopsInRegions"
    let newRegions = []
    regions.forEach(region => {
        newRegions.push(parseInt(region))
    });
    let message = { regions: newRegions }
    sendMsg(socket, task, message)
}

function getNearbyShops(socket, x, y){
    let task = "getNearbyShops"
    let message = {
        user_location:{
            lat: y,
            lon: x
        }
    }
    sendMsg(socket, task, message)
}

function removeShop(socket, id){
    let task = "removeShop"
    let message = {
        shop_id: id
    }
    sendMsg(socket, task, message)
}

function createShop(socket, id, name, region){
    let shopInfo = {
        name,
        position_x: 24.973037299999998,
        position_y: 121.5471915,
        region: parseInt(region),
        // profile_picture,
        // pictures,
        // description,
        // post
    }
    let task = "createShop"
    let message = {
        new_shop: shopInfo
    }
    sendMsg(socket, task, message)
}

function getShopsBrief(socket, shop_list){
    let task = "getShopsBrief"
    let message = {
        shop_list
    }
    sendMsg(socket, task, message)
}

function getShopDetail(socket, shop_id){
    let task = "getShopDetail"
    let message = {
        shop_id
    }
    sendMsg(socket, task, message)
}

function post(socket, post_info){
    let task = "post"
    let message = {
        shop_id: post_info.shop_id,
        new_post: {
            author: "oscar",
            postTime: post_info.time,
            description: post_info.description,
            report: post_info.report,
        }
    }
    sendMsg(socket, task, message)
}

function getPosts(socket, posts){
    let task = "getPosts"
    let message = {
        posts
    }
    sendMsg(socket, task, message)
}

export { login, getNearbyShops, getShopsInRegion, createShop, removeShop, getShopsBrief, getShopDetail, post, getPosts }