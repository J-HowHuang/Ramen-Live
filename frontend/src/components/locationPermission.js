function getLocation(dispatch){
    let x, y = 0
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
            (position)=>{
                x = position.coords.longitude
                y = position.coords.latitude
                dispatch({ type: "location", payload: { x, y } })
            },
            ()=>{
                dispatch({ type: "noLocation"})
            }
        )
    }
    else
        alert('您的瀏覽器不支援此功能')
}

export default getLocation