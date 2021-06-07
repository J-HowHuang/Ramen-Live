import MainPage from './pages/MainPage'
import ShopPage from './pages/ShopPage'
import LoginPage from './pages/LoginPage'
import { Route, Switch, Redirect } from "react-router-dom"
import './App.css';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import onMessage from './connection/onMessage'
import 'reactjs-line-login/dist/index.css'

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs:0,
      sm:600,
      md:960,
      lg:1280,
      xl:1920
    }
  },
  palette: {
    background: "#bdbdbd",
    white: "#ffffff",
    // blue: {
    //   main: '#2186f3'
    // }
  }
})

function App() {
  const connection = useSelector(state => state.connection, shallowEqual)
  const dispatch = useDispatch()
  const [component, setComponent] = useState(<></>)

  useState(()=>{
    if(connection.isConnected === false){
      const client = new WebSocket(process.env.REACT_APP_SERVER_URL)
      client.addEventListener("open", ()=>{
        console.log("connected to server!")
        dispatch({type: 'connected', payload: { socket: client }})
        setComponent(
          <ThemeProvider theme={theme}>
            <Switch>
              <Route path='/home' component={MainPage}/>
              <Route path='/shop/:shop_id' component={ShopPage}/>
              <Route path='/login' component={LoginPage}/>
              <Redirect from='/' to='/home'/>
            </Switch>
          </ThemeProvider> 
        )
      })
      client.onmessage = (byteString) => {
        onMessage(byteString, dispatch, client)
      }
    }
  })
  

  return (
    component
  );
}

export default App;


