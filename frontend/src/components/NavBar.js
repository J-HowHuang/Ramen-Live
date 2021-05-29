import AppBar from '@material-ui/core/AppBar'
import { makeStyles } from '@material-ui/core/styles';
import { Button, Toolbar, Typography, Link } from '@material-ui/core';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    homepagebutton:{
      marginRight: theme.spacing(3),
    },
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(3),
    },
    title: {
      marginLeft: theme.spacing(2),
      flexGrow: 1,
    },
    toolbar: {
        height: '100%'
    },
    appbar: {
        height: "80px"
    }
  }));

export default function NavBar(props){
    const classes = useStyles()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user, shallowEqual)

    return(
        <div>
        <AppBar position="static" className={classes.appbar}>
            <Toolbar className={classes.toolbar}>
                <Typography variant="h4" className={classes.title}>
                    {props.context}
                </Typography>
                <Link component={RouterLink} to={"/"} color="inherit" variant="body2" underline='none' className={classes.homepagebutton}>
                    <Button color="inherit" onClick={() => dispatch({type: "home"})}>
                        <Typography variant="h6">home</Typography>
                    </Button>
                </Link>
                {user.isLogin?
                    <Button color="inherit">
                        <Typography variant="h6" className={classes.title}>
                            {user.userId}
                        </Typography>
                    </Button>
                    :
                    <Link component={RouterLink} to={"/login"} color="inherit" variant="body2" underline='none' className={classes.homepagebutton}>
                        <Button color="inherit" onClick={() => dispatch({type: "home"})}>
                            <Typography variant="h6">login</Typography>
                        </Button>
                    </Link>
                }
            </Toolbar>
        </AppBar>
        </div>
    )
}