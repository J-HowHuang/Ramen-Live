import NavBar from '../components/NavBar'
// import { Link } from '@material-ui/core'

export default function ShopPage(props){
    console.log(props.match.params.shopname)
    return(
        <div>
            <NavBar context={props.match.params.shopname}></NavBar>
        </div>
    )
}