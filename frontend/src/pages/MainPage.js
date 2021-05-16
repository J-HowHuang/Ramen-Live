import { Typography, List, ListItem, ListItemText, Link, makeStyles } from '@material-ui/core'
import { shallowEqual, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom';
import NavBar from '../components/NavBar'

const useStyles = makeStyles({
    list:{
        overflow: "hidden",
        height: "92vh"
    },
    list2:{
        overflow: "auto",
        height: "100%"
    }
})

export default function MainPage(){
    let shoplist = useSelector(state => state.shoplist, shallowEqual)
    const classes = useStyles()

    console.log(shoplist)
    return(
        <div>
            <NavBar context='店家列表'></NavBar>
            <div className={classes.list}>
                <div className={classes.list2}>
                    <List>
                        {shoplist.map(shopInfo => (
                            <Link key={shopInfo.id} component={RouterLink} to={`/shop/${shopInfo.name}`} color="inherit"  variant="body2" underline='none'>
                                <ListItem button>
                                    <ListItemText primary={<Typography variant="h6">{shopInfo.name}</Typography>}/>
                                </ListItem>
                            </Link>
                    ))}
                    </List>
                </div>
            </div>
        </div>
    )
}