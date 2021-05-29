import { Divider, withWidth } from '@material-ui/core'
// import { shallowEqual, useSelector } from 'react-redux'
import NavBar from '../components/NavBar'
import SearchBar from '../components/SearchBar'
import ShopList from '../components/ShopList'

// const useStyles = makeStyles(theme => ({
//     midbackground: {
//         margin: "3% 0 3% 0",
//         width: "100%",
//         // height: "60vh"
//     }
// }))

function MainPage(props){

    return(
        <div>
            <NavBar context='ramen live'/>
            <SearchBar></SearchBar>
            <Divider/>
            <ShopList></ShopList>
        </div>
        // <div>
        //     <NavBar context='ramen live'></NavBar>
        //     <Box bgcolor="text.disabled">
        //         <Grid container justify="center" alignItems="center">
        //             <Grid item sm={11} md={8}>
        //                 <Paper className={classes.midbackground}>
        //                     <SearchBar/>
        //                     <Divider/>
        //                     <SortBar/>
        //                     <Divider/>
        //                     <ShopList/>
        //                 </Paper>
        //             </Grid>
        //         </Grid>
        //     </Box>
        // </div>
    )
}

export default withWidth()(MainPage)