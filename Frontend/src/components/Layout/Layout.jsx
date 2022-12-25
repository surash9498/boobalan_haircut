import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import { Button, Grid, makeStyles, Typography } from '@material-ui/core';
import { APP_TITLE } from '../../constants/constants';
import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        height: "40px"
    },
    content: {
        marginLeft: "45%",
        fontSize: "2vw",
        color: "white",
        fontStyle: "bold"
    }
}));
function Layout(props) {
    const classes = useStyles();
    return (<>
        <AppBar position="static" className={classes.root}>
            <Grid item container direction="row" alignItems='center' justifyContent='space-between'>
                <div className={classes.content}>{APP_TITLE}</div>
                <div><Button color="primary" ><Link style={{ textDecoration: "none", color: "white" }} to="/audit">Audit</Link></Button>
                    <Button color="primary" ><Link style={{ textDecoration: "none", color: "white" }} to="/bill">Bill</Link></Button></div>
            </Grid> </AppBar>
        {props.children}</>
    )
}

export default Layout