import { Input, Paper, Grid, makeStyles, Select, FormControl, InputLabel, TextField, Button, Typography } from '@material-ui/core'
import { useState } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { post } from '../connection/functions'

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: "20px 5% 10px 5%",
        width: "90%"
    },
    searchbar: {
        // marginLeft: "10%",
        // marginRight: "10%",
        // marginTop: "10%",
        margin: "0 5% 0 5%",
        width: "90%",
        height: "90%"
    },
    topbar: {
        width: "100% - 1px",
    },
    select: {
        // marginTop: "10px"
    },
}))

export default function SearchBar(props){

    const classes = useStyles()
    const connection = useSelector(state=>state.connection, shallowEqual)
    const user = useSelector(state=>state.user, shallowEqual)
    const state = useSelector(state=>state, shallowEqual)
    const [unit, setunit] = useState("person")
    const [amount, setamount] = useState("")
    const [description, setdescription] = useState("")
    const sizes = {
        xs: [12,12,12,12,12],
        sm: [2,2,4,2,2]
    }

    const handleClick = (e) => {
        if(amount === ""){
            alert(`請輸入${unit==="person"?"人":unit==="group"?"組":unit==="hour"?"小時":"分鐘"}數`)
            document.getElementById("amount").focus()
        }
        else if(isNaN(parseInt(amount))){
            alert(`請輸入${unit==="person"?"人":unit==="group"?"組":unit==="hour"?"小時":"分鐘"}數(數字)`)
            document.getElementById("des").focus()
        }
        else{
            // console.log(`${amount} ${unit}, ${description}`)
            let report = ` ${amount} ${unit==="person"?"人":unit==="group"?"組":unit==="hour"?"小時":"分鐘"}`
            let post_info = {
                name: user.isLogin?user.userName:"匿名",
                shop_id: props.id,
                report,
                description,
                time: Date.now()
            }
            console.log(document.getElementById("inputFile").files)
            post(connection.socket, post_info)
        }
    }

    const keyDown1 = (e) => {
        if(e.keyCode===13){
            document.getElementById("des").focus()
        }
    }

    const keyDown2 = (e) => {
        if(e.keyCode===13){
            e.target.blur()
        }
    }

    return(
        
        <Paper variant="outlined" className={classes.topbar}>
            <Grid container justify="center" alignItems="center">
                <Grid item xs={sizes.xs[0]} sm={sizes.sm[0]} className={classes.select}>
                    <FormControl className={classes.formControl} variant="outlined">
                        <InputLabel>回報單位</InputLabel>
                        <Select
                            native
                            labelId="select-label"
                            id="select"
                            defaultValue="person"
                            onChange={(e)=>{
                                setamount("")
                                setunit(e.target.value)
                            }}
                            label="回報單位"
                            inputProps={{
                                name: "回報單位"
                            }}
                        >
                            <option value="person">人數</option>
                            <option value="group">組數</option>
                            <option value="minute">時間(分鐘)</option>
                            <option value="hour">時間(小時)</option>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={sizes.xs[1]} sm={sizes.sm[1]}>
                    <TextField
                        id="amount"
                        variant="outlined"
                        onChange={(e)=>setamount(e.target.value)}
                        value={amount}
                        label={unit==="person"?"人數":unit==="group"?"組數":unit==="minute"?"分鐘":"小時"}
                        className={classes.formControl}
                        onKeyDown={keyDown1}
                    />
                </Grid>
                <Grid item xs={sizes.xs[2]} sm={sizes.sm[2]}>
                    <TextField
                        variant="outlined"
                        id="des"
                        onChange={(e)=>setdescription(e.target.value)}
                        value={description}
                        label="描述"
                        className={classes.formControl}
                        onKeyDown={keyDown2}
                    />
                </Grid>
                <Grid item xs={sizes.xs[3]} sm={sizes.sm[3]}>
                    <Grid container justify="flex-start">
                        <Grid item>
                            <input type="file" accept="image/*" className={classes.formControl} id="inputFile" multiple></input>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={sizes.xs[4]} sm={sizes.sm[4]}>
                    <Button className={classes.formControl} variant="contained" onClick={handleClick}>
                        <Typography variant="h6">
                            回報
                        </Typography>
                    </Button>
                </Grid>
            </Grid>
            {/* <Button className={classes.formControl} variant="contained" onClick={()=>{console.log(state)}}>
                <Typography variant="h6">
                    state
                </Typography>
            </Button> */}
        </Paper>
    )
}