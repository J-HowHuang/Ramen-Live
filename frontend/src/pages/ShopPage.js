import NavBar from '../components/NavBar'
import { Typography } from '@material-ui/core'
// import { Link } from '@material-ui/core'

export default function ShopPage(props){
    return(
        <div>
            <NavBar context={props.match.params.shopname}></NavBar>
            <Typography variant="h2">shop info</Typography>
        </div>
    )
}