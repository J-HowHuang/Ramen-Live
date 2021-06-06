import { shallowEqual, useSelector } from 'react-redux';
import { Card, CardHeader, Grid, makeStyles, Typography } from '@material-ui/core'
import PostCard from './PostCard'
const useStyles = makeStyles(theme => ({
    shopposts: {
        marginTop: "20px"
    }
}))

export default function ShopPosts(){
    const classes = useStyles()
    const currentPosts = useSelector(state => state.currentPosts, shallowEqual)

    return(
        <Grid container justify="center" alignItems="center" className={classes.shopposts}>
            <Grid item xs={11}>
                <Grid container spacing={3}>
                    {currentPosts.length===0?
                    <Grid item xs={12}>
                        <Card>
                            <CardHeader
                                title={"There is no post now"}
                            />
                        </Card>
                    </Grid>
                    :
                    currentPosts.map(post=>{
                        return <PostCard 
                                    key={post._id} 
                                    id={post._id}
                                    report={post.report} 
                                    time={post.postTime} 
                                    des={post.description} 
                                    author={post.author}
                                />
                    })}
                </Grid>
            </Grid>
        </Grid>
    )
}