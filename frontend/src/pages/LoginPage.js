import { Box, Button, Grid, makeStyles, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { LineLogin } from "reactjs-line-login"
import { useDispatch } from 'react-redux'
// import { shallowEqual, useSelector } from 'react-redux'
import NavBar from '../components/NavBar'


const useStyles = makeStyles(theme => ({
    loginpaper: {
        margin: "20px 0 0 0"
    },
    container: {
        height: "85vh"
    },
    inputbarbox: {
        width: "100%",
        margin: "2% 0 2% 0"
    },
    inputbar: {
        width: "100%"
    },
    loginlabel: {
        margin: "20% 0 10% 0"
    }
}))

function LoginPage(props){

    const classes = useStyles()
    const dispatch = useDispatch()

    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [payload, setPayload] = useState(null);
    const [idToken, setIdToken] = useState(null);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }
    const handleUsernameChange = (e) => {
        setUserName(e.target.value)
    }
    const login = (e) => {
        dispatch({ type: "login", payload: { type:"uid", username: username, password: password } })
    }

    return(
        <div>
            <NavBar context='Log in'/>
            <Grid container justify="center" alignItems="center" className={classes.container}>
                <Grid item xs={5}>
                    {/* <Grid container justify="center">
                        <Grid item>
                            <Typography variant="h4" className={classes.loginlabel}>
                                login
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container justify="center">
                        <Grid item xs={11}>
                            <Box className={classes.inputbarbox} borderRadius="4px">
                                <TextField
                                    placeholder="username"
                                    variant="outlined"
                                    className={classes.inputbar}
                                    onChange={handleUsernameChange}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container justify="center">
                        <Grid item xs={11}>
                            <Box className={classes.inputbarbox} borderRadius="4px">
                                <TextField
                                    placeholder="password"
                                    variant="outlined"
                                    className={classes.inputbar}
                                    onChange={handlePasswordChange}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container justify="center">
                        <Grid item xs={11}>
                            <Box borderRadius="10%">
                                <Button color="primary" fullWidth variant="contained" onClick={login}>
                                    Login
                                </Button>
                            </Box>
                        </Grid>
                    </Grid> */}
                    <Grid container justify="center">
                        <Grid item>
                            <LineLogin
                                clientID={process.env.REACT_APP_LINELOGIN_CLIENT_ID}
                                clientSecret={process.env.REACT_APP_LINELOGIN_CLIENT_SECRET}
                                state={process.env.REACT_APP_LINELOGIN_STATE}
                                redirectURI={process.env.REACT_APP_LINELOGIN_REDIRECTURI}
                                scope={process.env.REACT_APP_LINELOGIN_SCOPE}
                                setPayload={setPayload}
                                setIdToken={setIdToken}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default LoginPage