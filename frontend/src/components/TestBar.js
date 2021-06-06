
import { Button, Grid, TextField, Typography } from '@material-ui/core'
import { useState } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { createShop, removeShop } from '../connection/functions'

export default function SearchBar(){

    const connection = useSelector(state => state.connection, shallowEqual)
    const [id, setid] = useState()
    const [name, setname] = useState()
    const [region, setregion] = useState()

    const handleChangeId = (e) => {
        setid(e.target.value)
    }
    const handleChangeName = (e) => {
        setname(e.target.value)
    }
    const handleChangeRegion = (e) => {
        setregion(e.target.value)
    }

    return(
        <Grid>
            <TextField
                placeholder={"id"}
                variant="outlined"
                onChange={handleChangeId}
            />
            <TextField 
                placeholder={"name"}
                variant="outlined"
                onChange={handleChangeName}
            />
            <TextField 
                placeholder={"region"}
                variant="outlined"
                onChange={handleChangeRegion}
            />
            <Button color="inherit" onClick={() => createShop(connection.socket, id, name, region)}>
                <Typography variant="h6">create</Typography>
            </Button>
            <Button color="inherit" onClick={() => removeShop(connection.socket, id)}>
                <Typography variant="h6">remove</Typography>
            </Button>
        </Grid>
        
    )
}