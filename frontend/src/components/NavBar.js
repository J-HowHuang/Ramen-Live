import AppBar from '@material-ui/core/AppBar'
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { shallowEqual, useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import ToolBar from './ToolBar'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    toolbar: {
        height: '100%'
    },
    appbar: {
        height: "8vh"
    }
  }));

export default function NavBar(props){
    const classes = useStyles();
    
    const dispatch =  useDispatch();
    const toolbar = useSelector(state => state.toolbar, shallowEqual)

    const openToolBar = (open = undefined) => {
        console.log(open)
        dispatch({type: "opentoolbar", payload:{open: open}})
    }

    return(
        <div>
        {toolbar.open?
            <ToolBar></ToolBar>
            :
            <></>
        }
        <AppBar position="static" className={classes.appbar}>
            <Toolbar className={classes.toolbar}>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => {openToolBar(true)}}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    {props.context}
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
        </div>
    )
}