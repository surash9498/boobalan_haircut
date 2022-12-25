import DateFnsUtils from '@date-io/date-fns';
import { Button, FormControl, Grid, InputLabel, makeStyles, Select, Switch } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import CustomInput from '../components/InputText/CustomInput';
import { ADD_USER, GET_USER } from '../constants/apiConstants';
import { APP_TITLE, GST, MobileNumber, service_by, service_type } from '../constants/constants';
import BillView from './BillView';
import "./BillView.css";
import "./PrintPage.css"
import salon from "../salon.png";

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
function Billing() {
  const classes = useStyles();
  const [value, setValue] = useState({ Name: "", date: new Date().toISOString().split("T")[0], service: [], invoice: { tax: 0 } })
  const [customerData, setCustomerData] = useState("")
  const [serviceType, setServiceType] = useState({ type: "" })
  const [existingUser, setExistingUser] = useState(false);
  const componentRef = useRef();
  const [gst, setgst] = useState(true);
  const fetchDetails = () => {

    axios.post(GET_USER, { ...value }).then((res) => {
      if (res.data == false) {
        alert("User Doesnt Exist")
      } else {
        alert("User Exist")
        setExistingUser(true)
      }
    })
  }
  const addUser = () => {
    axios.post(ADD_USER, { ...value }).then(({ data }) => {
      if (data == false) {
        alert("something wrong")
      }
      else {
        alert("User Added Successfully")
      }
    }).catch((err) => {
      alert("something wrong")
    })


  }
  const addService = () => {
    let temp = Object.assign({}, serviceType);
    setValue((prevState) => {
      return ({ ...prevState, service: [...prevState.service, temp] })
    })
    setServiceType({ type: "", value: "" })
  }
  useEffect(() => {
    gstCalculator();

  }, [value.service])
  const gstCalculator = () => {
    let sgst;
    if (gst) {
      sgst = value.service.reduce((acc, current) => {
        return acc + (parseFloat(current.price) * 9) / 100
      }, 0)
    } else {
      sgst = 0
    }

    setValue((prev) => ({ ...prev, invoice: { tax: sgst * 2 } }))
  }
  useEffect(() => {
    TotalAmountCalculator();
  }, [value.invoice.tax])
  useEffect(() => {
    gstCalculator()
  }, [gst])
  const TotalAmountCalculator = () => {
    let totalAmount = value.service.reduce((acc, cur) => (acc + parseFloat(cur.price)), value.invoice.tax)
    setValue((prev) => ({
      ...prev,
      invoice: {
        tax:
          prev.invoice.tax,
        total: totalAmount
      }
    }
    )
    )
  }
  const deleteItem = (index) => {
    let temp = [...value.service]
    temp.splice(index, 1)
    setValue((prev) => ({ ...prev, service: temp }))
  }
  useEffect(() => {

  }, [value])

  return (
    <>
      <div className={classes.divider}>
        <Grid container alignItems='center' justifyContent='center' lg={12} direction="row">
          <Grid item container alignItems='center' justifyContent='center' lg={6} direction="column" spacing={3} className={classes.sideLine}>
            <Grid item >
              <CustomInput label="Mobile" placeHolder="Enter Mobile Number" type="mobile" errormsg="Invalid Mobile Number" setValue={setValue} value={value.mobileNumber} action={fetchDetails}></CustomInput>

            </Grid>
            <Grid item container alignItems='center' justifyContent='center' lg={6} direction="column" >

              {existingUser ? null : <><CustomInput label="Name" placeHolder="Enter Customer Name" type="name" errormsg="Invalid Entry" setValue={setValue} value={value.Name} ></CustomInput>

                <Button style={{ marginTop: "2vh" }} variant='contained' color="primary" onClick={() => addUser()}>Add User</Button></>}
            </Grid>
            <Grid item >
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="by-native-simple">Service By</InputLabel>
                <Select
                  native
                  value={value.serviceBy}
                  onChange={({ target: { value } }) => setValue((prevState) => ({ ...prevState, serviceBy: value }))}
                  inputProps={{
                    name: 'Service By',
                    id: 'by-native-simple',
                  }}
                >
                  <option aria-label="None" value="" />
                  {service_by.map((name) =>
                    <option key={name} value={name}>{name}</option>
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="by-native-simple" >Service Type</InputLabel>
                <Select
                  native
                  value={serviceType.type}
                  onChange={(event) => {
                    let type = event.target.options[event.target.selectedIndex].text;
                    let { price } = service_type.find(({ type }) => type == type)
                    return setServiceType({ type: type, price: price })
                  }
                  }
                  inputProps={{
                    name: 'Service By',
                    id: 'by-native-simple',
                  }}
                >
                  <option aria-label="None" value="" />
                  {service_type.map((service, index) =>
                    <option key={index} value={service.type}>{service.type}</option>
                  )}
                </Select>
              </FormControl>
            </Grid>

            <Grid item>
              <Button variant='contained' color='primary' onClick={() => addService()
              }>Add</Button>
            </Grid>
            <Grid item>
              <Switch
                checked={gst}
                onChange={() => setgst((prev) => !prev)}
                name="gst"
              />
            </Grid>

            <Grid item >
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  margin="normal"
                  id="date-picker-inline"
                  format='MM/dd/yyyy'
                  label="Date picker inline"
                  value={value.date}
                  onChange={(value) => {

                    setValue((prevState) => ({ ...prevState, date: value.toISOString().split("T")[0] }))
                  }}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>

          <BillView deleteItem={deleteItem} value={value} setValue={setValue} ref={componentRef}></BillView>
        </Grid>
        {/* <PDFView></PDFView> */}
      </div>
      <div className="onlyprint" ref={componentRef}>
        <h4 className='center'>{APP_TITLE}</h4>
        <br></br>
        <br></br>
        <div className='topMargin meta'>
          <p>{value.date}</p>
          <p><img src={salon} width="12vw" height="12vh"></img>&nbsp;{value.serviceBy}</p>

        </div>
        <div className='meta'>
          <p>{MobileNumber}</p>
          <p>GST No:{GST}</p>

        </div>
        <div className='topMargin meta'>
          <p>S.No</p>
          <p>Service</p>
          <p>Cost</p>
        </div>
        {value.service.map((x, index) => (<div className='topMargin meta'>
          <p  >{index + 1}</p>
          <p  >{x.type}</p>
          <p >{x.price}</p>
        </div>
        ))}
        <div className='topMargin meta'>
          <p></p>
          <p>Sub-Total</p>
          <p>
            {value.service.reduce((acc, current) => {
              return acc + parseFloat(current.price)
            }, 0)}
          </p>
        </div>
        <div className='topMargin meta'>
          <p></p>
          <p>CGST</p>
          <p>
            {value.invoice.tax}
          </p>
        </div>
        <div className=' meta'>
          <p></p>
          <p>SGST</p>
          <p>
            {value.invoice.tax}
          </p>
        </div>
        <div className='topMargin meta'>
          <p></p>
          <p>Total</p>
          <p>
            {value.invoice.total}
          </p>
        </div>
        <div className='meta '>
          <p style={{ fontSize: "8px" }} className='dev'>Developed By SiteSearch&#169; </p>

        </div>
        <div className='meta '>
          <p style={{ fontSize: "10px" }}>Ph:9629707622</p>

        </div>

      </div>
    </>
  )
}

export default Billing