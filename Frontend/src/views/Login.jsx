import { Button, Grid } from '@material-ui/core'
import axios from 'axios'
import React, { useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import CustomInput from '../components/InputText/CustomInput'
import Layout from '../components/Layout'
import { LOGIN_URL } from '../constants/apiConstants'

function Login() {
    const [cred, setCred] = useState()

    let history = useHistory()
    let handleLogin = () => {
        axios.post(LOGIN_URL, {
            ...cred
        }).then(({ data }) => {
            if (data) {
                sessionStorage.setItem("role", "admin")
                history.push("/bill")
            }
            else {
                history.push("/login")
            }
        })


    }
    return (
        <Layout>
            <Grid item container direction='column' alignItems='center' justifyContent='space-around' style={{ height: "20vh", marginTop: "20vh" }} lg={12}>
                <CustomInput label="UserName" placeHolder="Enter User Name" type="username" errormsg="" value={cred} setValue={setCred} ></CustomInput>
                <CustomInput label="Password" placeHolder="Password" type="password" errormsg="" value={cred} setValue={setCred}></CustomInput>
                <Button variant="contained" color="primary" onClick={() => handleLogin()} >Login</Button>

            </Grid></Layout>
    )
}

export default Login