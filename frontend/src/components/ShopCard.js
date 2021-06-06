import { Link, Typography, Card, CardMedia, CardContent, CardHeader, Grid, IconButton, makeStyles } from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { shallowEqual, useSelector } from "react-redux";
import { Link as RouterLink } from 'react-router-dom';
import{ format } from 'date-fns'


const useStyles = makeStyles(theme => ({
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    }
}))

export default function ShopCard(props){
    const classes = useStyles()

    return(
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Link component={RouterLink} to={"/shop/"+props.id} color="inherit" variant="body2" underline='none' className={classes.homepagebutton}>
                <Card variant="outlined">
                    <CardHeader
                        // action={
                        //     <IconButton>
                        //         <MoreVertIcon/>
                        //     </IconButton>
                        // }
                        title={props.name}
                        subheader={props.recent_post?`上一筆回報：${props.recent_post.report}, ${format(new Date(props.recent_post.postTime), 'MM/dd HH:mm')}`:"沒有回報資料"}
                    />
                    <CardMedia
                        className={classes.media}
                        image={props.profile_picture?props.profile_picture:"https://tw.savorjapan.com/gg/content_image/t0039_002_20180115022046.jpg"}
                        title="Paella dish"
                    />
                    {/* <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {props.tags.map((tag, index) => 
                                (index === 0? "":", ")+tag
                            )}
                        </Typography>
                    </CardContent> */}
                </Card>
            </Link>
        </Grid>
        
    )
}