import React from 'react'
import { Redirect, Route, Switch, withRouter } from "react-router-dom"
import Layout from '../components/Layout/'
import Login from '../views/Login'
import { AuditConfig, billConfig } from './config'
import ProtectedRoutes from './ProtectedRoutes'
const applicationRoutes = () => {
    return (<Layout><Switch>
        <ProtectedRoutes exact path={billConfig.path} component={billConfig.view} roles={billConfig.role}></ProtectedRoutes>
        <ProtectedRoutes exact path={AuditConfig.path} component={AuditConfig.view} roles={AuditConfig.role}></ProtectedRoutes>
    </Switch></Layout>)
}
function RoutePath() {

    return (
        <Switch>

            <Route exact path="/login" component={Login} />
            <Route exact path="/"><Redirect to="/login"></Redirect></Route>
            <ProtectedRoutes path="/*" component={applicationRoutes} root></ProtectedRoutes>


        </Switch>
    )
}

export default RoutePath