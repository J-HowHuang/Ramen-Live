import MainPage from './pages/MainPage'
import ShopPage from './pages/ShopPage'
import LoginPage from './pages/LoginPage'
import { Route, Switch, Redirect } from "react-router-dom"
import './App.css';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

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
    white: "#ffffff"
  }
})

function App() {
  const connection = useSelector(state => state.connection, shallowEqual)
  const dispatch = useDispatch()

  if(connection.isConnected === false){
    const client = new WebSocket('ws://localhost:8088/ws')
    client.addEventListener("open", ()=>{
      console.log("connected to server!")
      dispatch({type: 'connected', payload: { socket: client }})
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route path='/home' component={MainPage}/>
        <Route path='/shop/:shopname' component={ShopPage}/>
        <Route path='/login' component={LoginPage}/>
        <Redirect from='/' to='/home'/>
      </Switch>
    </ThemeProvider> 
  );
}

export default App;
