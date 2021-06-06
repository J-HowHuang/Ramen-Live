import { Link, Typography, Card, CardMedia, CardContent, CardHeader, Grid, IconButton, makeStyles, Button } from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { shallowEqual, useSelector } from "react-redux";
import { Link as RouterLink } from 'react-router-dom';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import{ format } from 'date-fns'

const useStyles = makeStyles(theme => ({

}))

export default function PostCard(props){
    const classes = useStyles()

    return(
        <Grid item xs={12}>
            <Card>
                <CardHeader
                    action={
                        <Grid container justify="center" alignItems="center">
                            <Grid item>
                                <IconButton>
                                    <ThumbDownIcon/>
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <Typography>0</Typography>
                            </Grid>
                        </Grid>                       
                    }
                    title={props.report}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {`回報者: ${props.author}`}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {`時間: ${format(new Date(props.time), 'yyyy-MM-dd HH:mm:ss')}`}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {`描述: ${props.des}`} 
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
        
    )
}