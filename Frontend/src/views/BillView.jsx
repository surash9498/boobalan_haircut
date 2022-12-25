import { Button, Grid, makeStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import classNames from 'classnames';
import React from 'react';
import ReactToPrint from 'react-to-print';
import { ADD_SERVICE } from '../constants/apiConstants';
import { APP_TITLE, MobileNumber } from '../constants/constants';
import salon from "../salon.png";
import "./BillView.css";
const useStyles = makeStyles((theme) => ({

    divider: {
        marginTop: "3vw"

    },
    inputBox: {
        marginTop: "3vw"
    },
    formControl: {
        width: 150
    },
    sideLine: {
        borderRight: "1px solid hsl(210deg 10% 78%)"
    }
    ,
    bottomLine: {
        borderBottom: "1px solid hsl(210deg 10% 78%)",
    },
    topLine: {
        borderTop: "1px solid hsl(210deg 10% 78%)",

    },
    marginLine: {
        border: "1px solid hsl(210deg 10% 78%)"
    },
    billBoxSize: {
        height: "10vh"
    },
    topSpace: {
        marginTop: "3vh"
    },
    line: {
        width: "100%",
        height: "1vh"
    }
}));
const BillView = React.forwardRef(({ value, deleteItem, setValue }, ref) => {

    const classes = useStyles();
    const shareWithWhatsapp = () => {
        let newURL = 'https://api.whatsapp.com/send?text=' + encodeURIComponent("https://www.google.com");
        window.open(newURL, "_blank");

    }
    const uploadData = () => {
        axios.post(ADD_SERVICE, { ...value }).then((res) => {
            console.log(res)
            alert("Uploaded Successfully")
        }).catch((err) => {
            alert("Something Went Wrong")
        })
        setValue({ date: new Date().toISOString().split("T")[0], service: [], invoice: { tax: 0 } })
    }


    return (
        <>
            <Grid className="noprint" item container alignItems='center' justifyContent='center' lg={6} direction="column" id="printable-div">
                <Grid item container lg={6} alignContent="center" justifyContent='center'>
                    <h3>{APP_TITLE}</h3>
                </Grid>
                <Grid item container className={classes.bottomLine} lg={6} direction="row" alignItems='center' justifyContent='space-between'>
                    <Grid item container direction='column' lg={3}> <Grid item>{value.date}</Grid><Grid item>Bill.No:{ }</Grid>
                    </Grid>
                    <Grid item container direction='column' lg={3}><Grid item>{MobileNumber}</Grid><Grid item><img src={salon} width="12vw" height="12vh"></img>&nbsp;:{value.serviceBy}</Grid>
                    </Grid>

                </Grid>
                <Grid item container lg={6} direction="row" alignItems='center' justifyContent='space-between' className={classNames(classes.bottomLine)} >
                    <Grid item >S.NO</Grid>
                    <Grid item>SERVICE TYPE</Grid>
                    <Grid item>PRICE</Grid>
                </Grid>
                {/* <Grid item container lg={6} direction="column" alignItems='center' justifyContent='space-between' className={classNames(classes.divider)} > */}
                {value.service.map((x, index) => (<Grid item container lg={6} key={index} direction="row" alignItems='baseline' justifyContent='space-between' style={{ paddingTop: "2vh" }} ><Grid item >{index + 1}</Grid><Grid item >{x.type}</Grid><Grid item >{x.price}<DeleteIcon onClick={(index) => deleteItem()} /> </Grid></Grid>
                ))}

                <Grid item container lg={6} direction="row" alignItems='baseline' justifyContent='space-between' className={classNames(classes.divider, classes.topLine)}  >
                    <Grid item ></Grid>
                    <Grid item >Sub-Total</Grid>
                    <Grid item >{value.service.reduce((acc, current) => {
                        return acc + parseFloat(current.price)
                    }, 0)}</Grid>
                </Grid>
                <Grid item container lg={6} direction="row" alignItems='baseline' justifyContent='space-between' className={classNames(classes.divider, classes.topLine)}>
                    <Grid item ></Grid>
                    <Grid item >CGST</Grid>
                    <Grid item >{value.invoice.tax}</Grid>
                </Grid>
                <Grid item container lg={6} direction="row" alignItems='baseline' justifyContent='space-between'  >
                    <Grid item ></Grid>
                    <Grid item >SGST</Grid>
                    <Grid item >{value.invoice.tax}</Grid>
                </Grid>
                <Grid item container lg={6} direction="row" alignItems='baseline' justifyContent='space-between' className={classNames(classes.divider, classes.topLine)} >
                    <Grid item ></Grid>
                    <Grid item ><h2>Total</h2></Grid>
                    <Grid item ><h2>{value.invoice.total}</h2></Grid>
                </Grid>
                <Grid item container direction="row" alignItems='center' justifyContent='space-evenly'>
                    <Button variant='contained' color='primary' onClick={() => uploadData()}>Upload</Button>

                    <ReactToPrint
                        trigger={() => <Button variant='contained' color='primary' >Print</Button>}
                        content={() => ref.current}
                    />
                    {/* <Button variant='contained' color="primary" onClick={() => { shareWithWhatsapp() }}>Whatsapp</Button> */}
                </Grid>


            </Grid>

        </>
    )
})

export default BillView