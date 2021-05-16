import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import { shallowEqual, useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom';
import { Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Divider, Link, Typography} from '@material-ui/core'

export default function ToolBar(){
    let toolbar = useSelector(state => state.toolbar, shallowEqual)
    
    const dispatch =  useDispatch();

    const openToolBar = (open = undefined) => {
        console.log(open)
        dispatch({type: "opentoolbar", payload:{open: open}})
    }

    return(
        <Drawer anchor={'left'} open={toolbar.open} onClose={() => openToolBar(false)}> 
            <IconButton onClick={() => {openToolBar(false)}}>
                <ChevronLeftIcon />
            </IconButton>
            <Divider/>
            <List>
                {toolbar.list.map((item, index) => (
                    <Link key={index} component={RouterLink} to={item.link} color="inherit"  variant="body2" underline='none'>
                        <ListItem button onClick={()=>{openToolBar(false)}}>
                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={<Typography variant="h6">{item.tag}</Typography>}/>
                        </ListItem>
                </Link>
                ))}
            </List>
        </Drawer>
    )
}