import MainPage from './pages/MainPage'
import ShopPage from './pages/ShopPage'
import { Route, Switch, Redirect } from "react-router-dom"
import './App.css';

function App() {
  return (
    <div>
      <Switch>
        
        <Route path='/home' component={MainPage}/>
        <Route path='/shop/:shopname' component={ShopPage}/>
        <Redirect from='/' to='/home'/>

      </Switch>

    </div> 
  );
}

export default App;
