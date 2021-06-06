import SearchIcon from '@material-ui/icons/Search'
import { useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { Paper, Grid, TextField, Radio, RadioGroup, FormControlLabel, IconButton, makeStyles, Select, FormControl, InputLabel } from '@material-ui/core'
import { getNearbyShops, getShopsInRegion } from '../connection/functions'
import getLocation from './locationPermission'

const useStyles = makeStyles(theme => ({
    searchbar: {
        margin: "10px 0 10px 0",
        width: "90%",
        height: "90%"
    },
    searchicon: {
        margin: "35% 35% 35% 35%",
        width: "30%",
        height: "30%"
    },
    topbar1: {
        minHeight: "100px",
        width: "100%-1px",
    },
    topbar2: {
        minHeight: "100px",
        width: "100%",
    },
}))

export default function SearchBar(){
    
    const user = useSelector(state => state.user)
    const connection = useSelector(state => state.connection, shallowEqual)
    const [searchType, setSearchType] = useState(user.havePosition?"nearby":"region") 
    const [region, setRegion] = useState(1)
    const dispatch = useDispatch()
    const shopList = useSelector(state => state.shopList, shallowEqual)
    const classes = useStyles()
    const sizes = {
        sm: [2, 2, 8, 2],
        md: [3, 2, 9, 1]
    }

    const SETREGION = async (e) => {setRegion(e)} 
    const SETSEARCHTYPE = async (e) => {setSearchType(e)}

    const searchTypeChanged = (e) => {
        if(e.target.value === "nearby"){
            user.havePosition?SETSEARCHTYPE("nearby"):SETSEARCHTYPE("region")
        }
        else
            setSearchType("region")
        console.log(searchType, user.havePosition)
    }

    const search = (r) => {
        if(searchType==="region"){
            getShopsInRegion(connection.socket, [r])
        }
        else if(searchType==="nearby"){
            getLocation(dispatch)
        }
    }

    return(
        <Paper variant="outlined" className={classes.topbar1}>
            <Grid container justify="center" alignItems="center" className={classes.topbar2}>
                <Grid item sm={sizes.sm[0]} md={sizes.md[0]}>
                    <Grid container justify="center" alignItems="center">
                        <Grid item>
                            <RadioGroup row value={user.havePosition?searchType:"region"} onChange={searchTypeChanged}>
                                <FormControlLabel value="nearby" control={<Radio/>} label="搜尋附近" onChange={(e)=>{ getLocation(dispatch) }} />
                                <FormControlLabel value="region" control={<Radio/>} label="搜尋區域"/>
                            </RadioGroup>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={sizes.sm[1]} md={sizes.md[1]}>
                    <Grid container justify="center"><Grid item>
                    <FormControl className={classes.formControl} variant="outlined">
                        <InputLabel>區域</InputLabel>
                        <Select
                            native
                            labelId="select-label"
                            id="select"
                            defaultValue={1}
                            onChange={(e)=>{
                                SETREGION(e.target.value)
                                search(e.target.value)
                            }}
                            label="區域"
                            disabled={searchType==="region"?false:true}
                        >
                            <option value={1}>中正區</option>
                            <option value={5}>文山區</option>
                            <option value={2}>中山區</option>
                            <option value={3}>信義區</option>
                            <option value={4}>大安區</option>
                        </Select>
                    </FormControl>
                    </Grid></Grid>
                </Grid>
                <Grid item sm={sizes.sm[3]} md={sizes.md[3]}>
                    <Grid container justify="center" alignItems="center">
                        <Grid item>
                            <IconButton onClick={()=>search(region)}><SearchIcon/></IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    )
}