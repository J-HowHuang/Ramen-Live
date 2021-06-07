import { Button, Divider, withWidth } from '@material-ui/core'
import { useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import NavBar from '../components/NavBar'
import SearchBar from '../components/ShopSearchBar'
import TestBar from '../components/TestBar'
import ShopList from '../components/ShopList'
import { getNearbyShops, getShopsInRegion, login } from '../connection/functions'
import handlePermission from '../components/locationPermission'
import Qs from 'qs'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import 'reactjs-line-login/dist/index.css'
import getLocation from '../components/locationPermission'

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function MainPage(props){
    const connection = useSelector(state=>state.connection, shallowEqual)
    const user = useSelector(state=>state.user, shallowEqual)
    const dispatch = useDispatch()
    const [payload, setPayload] = useState("")
    const [ID, setID] = useState("")

    useState(()=>{
        // getShopsInRegion(connection.socket, [1])
        getLocation(dispatch)
    })

    let code = getParameterByName('code')
    if(code!==null && user.isLogin===false){
        let access_token = ""
        let options = Qs.stringify({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: process.env.REACT_APP_LINELOGIN_REDIRECTURI,
            client_id: process.env.REACT_APP_LINELOGIN_CLIENT_ID,
            client_secret: process.env.REACT_APP_LINELOGIN_CLIENT_SECRET
          })
        axios.post('https://api.line.me/oauth2/v2.1/token', options, { headers: { 'Content-Type': 'application/x-www-form-urlencoded'}}).then(res => {
            access_token = res.data.access_token
            console.log(access_token)
            login(connection.socket, access_token)
        })
    }

    return(
        <div>
            <NavBar context='Ramen Live'/>
            <SearchBar/>
            {/* <TestBar/> */}
            <Divider/>
            <ShopList/>
        </div>
    )
}

export default withWidth()(MainPage)