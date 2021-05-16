import { Redirect } from "react-router"
import StoreIcon from '@material-ui/icons/Store'
import HomeIcon from '@material-ui/icons/Home'

const initialState = {
    toolbar:{
        open:false,
        list: [
            {tag: '首頁', link: '/home', icon: <HomeIcon style={{fontSize: 30}}/>},
            {tag: '店家列表', link: '/shop', icon: <StoreIcon style={{fontSize: 30}}/>}
        ]
    },
    shoplist: [
        {name: '麵屋0', id: '0'},
        {name: '麵屋1', id: '1'},
        {name: '麵屋2', id: '2'},
        {name: '麵屋3', id: '3'},
        {name: '麵屋4', id: '4'},
        {name: '麵屋5', id: '5'},
        {name: '麵屋6', id: '6'},
        {name: '麵屋7', id: '7'},
        {name: '麵屋8', id: '8'},
        {name: '麵屋9', id: '9'},
        {name: '麵屋10', id: '10'},
        {name: '麵屋11', id: '11'},
        {name: '麵屋12', id: '12'},
        {name: '麵屋13', id: '13'},
        {name: '麵屋14', id: '14'},
        {name: '麵屋15', id: '15'},
        {name: '麵屋16', id: '16'},
        {name: '麵屋17', id: '17'},
        {name: '麵屋18', id: '18'},
        {name: '麵屋19', id: '19'},
        {name: '麵屋20', id: '20'},
        {name: '麵屋21', id: '21'},
        {name: '麵屋22', id: '22'},
        {name: '麵屋23', id: '23'},
        {name: '麵屋24', id: '24'},
        {name: '麵屋25', id: '25'},     
    ]
}

const rootReducer = (state = initialState, action) => {

    if(action.type === 'test'){
        return Object.assign({}, state, {
            test: 'test'
        })
    }
    if(action.type === 'opentoolbar' && action.payload.open !== undefined){
        return Object.assign({}, state, {
            toolbar: {open:action.payload.open, list:state.toolbar.list}
        })
    }
    else if(action.type === 'opentoolbar'){
        return Object.assign({}, state, {
            toolbar: {open:state.toolbar.open?false:true, list:state.toolbar.list}
        })
    }
    if(action.type === 'clicktoolbar'){
        <Redirect to='/storelist'/>
    }
    return state
}

export default rootReducer