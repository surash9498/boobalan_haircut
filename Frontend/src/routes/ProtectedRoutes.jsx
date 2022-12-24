import React, { Suspense } from 'react'
import { Redirect, Route, useHistory } from 'react-router-dom'
import CircularIndicator from '../components/LoadingIndicator/CircularIndicator'
import { isLoggedIn } from '../utils/Utility'



function ProtectedRoutes({ roles, component: View, root, ...rest }) {
    const history = useHistory();

    if (isLoggedIn()) {

        return (
            <Route {...rest} render={(props) =>
                !root ? (<Suspense fallback={<CircularIndicator />}>
                    <View {...props}></View>
                </Suspense>) :
                    <View {...props}></View>
            }></Route>
        )
    }
    else {

        history.push("/login")
    }

}

export default ProtectedRoutes