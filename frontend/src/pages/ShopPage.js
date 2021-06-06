import NavBar from '../components/NavBar'
import { Typography } from '@material-ui/core'
import ShopPosts from '../components/ShopPosts'
// import { Link } from '@material-ui/core'

import { getShopDetail } from "../connection/functions"
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import PostBar from '../components/PostBar'

export default function ShopPage(props){
    const connection = useSelector(state=>state.connection, shallowEqual)
    const currentShop = useSelector(state=>state.currentShop, shallowEqual)
    const id = props.match.params.shop_id
    const dispatch = useDispatch()

    useState(() => {
         getShopDetail(connection.socket, id)
         dispatch({ type: "resetFirstTime" })
    })
    // console.log(currentShop)

    return(
        <div>
            <NavBar context={currentShop.name}/>
            <PostBar id={id}/>
            <ShopPosts/>
        </div>
    )
}