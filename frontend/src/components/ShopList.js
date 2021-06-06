import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import SearchIcon from '@material-ui/icons/Search'
import { Button, Card, CardHeader, Grid, IconButton, makeStyles, TextField, Typography } from '@material-ui/core'
import ShopCard from './ShopCard'
import { useState } from 'react';
const useStyles = makeStyles(theme => ({
    shoplist: {
        width: "100%"
    },
    searchbar: {
        margin: "20px 0 20px 0",
        width: "100%"
    },
    showall: {
        marginLeft: "10px"
    }
}))

export default function ShopListBar(){
    const classes = useStyles()
    const shopList = useSelector(state => state.shopList, shallowEqual)
    const [query, setQuery] = useState("")
    const dispatch = useDispatch()

    const keyDown = (e) => {
        setQuery(e.target.value)
        if(e.keyCode === 13){
            dispatch({ type: "filter", payload: { filter: e.target.value } })
            e.target.blur()
        }
    }

    return(
        <div className={classes.shoplist}>
            <Grid container justify="center" alignItems="center" spacing={0}>
                {shopList.data.length!==0?
                <Grid item xs={10}>
                    <Grid container justify="center" alignItems="center">
                        <Grid item xs={7}>
                            <TextField
                            placeholder="關鍵字"
                            variant="outlined"
                            className={classes.searchbar}
                            onKeyDown={keyDown}
                        />
                        </Grid>
                        <Grid item xs={1}>
                            <Grid container justify="flex-end" alignItems="center">
                                <Grid item xs={10}>
                                    <IconButton onClick={ () => dispatch({ type: "filter", payload: { filter: query } }) }><SearchIcon/></IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item >
                            <Grid container justify="center" alignItems="center">
                                <Grid item className={classes.showall}>
                                    <Button onClick={ () => { dispatch({ type: "filter", payload: { filter: "" } })} }>
                                        顯示全部
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                :
                <Grid item xs={10}>
                    <Card variant="outlined" className={classes.searchbar}>
                        <Grid container justify="center"><Grid item>
                            <CardHeader
                                title="沒有店家"
                            />
                        </Grid></Grid>
                    </Card>
                </Grid>
                }
                <Grid item xs={11}>
                    <Grid container justify="center" spacing={3}>
                        
                        {shopList.show.map(shopInfo=>{
                            return (
                                <ShopCard 
                                    key={shopInfo.id} 
                                    id={shopInfo.id} 
                                    name={shopInfo.name}
                                    pictureURL={shopInfo.profile_picture}
                                    recent_post={shopInfo.recent_post}
                                />
                        )})}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}