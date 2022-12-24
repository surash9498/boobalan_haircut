import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core';
import { APP_TITLE } from '../../constants/constants';
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
            <div className={classes.content}>{APP_TITLE}</div>
        </AppBar>
        {props.children}</>
    )
}

export default Layout