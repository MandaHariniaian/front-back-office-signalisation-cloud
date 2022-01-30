import React from 'react';
import { useAppContext } from '../../lib/contextLib';
import  {Route, Navigate} from "react-router-dom";


export const ProtectedRoute = ({component: Component, ...rest}) => {
    const {estAuthentifie, authentification} = useAppContext();
    console.log("mandalo");
    return(
        <Route {...rest} render={
            props => {
                if(estAuthentifie === true){
                    return <Component {...props} />
                } else {
                    return <Navigate to={
                        {
                            pathname: "/",
                            state: {
                                from: props.location
                            }
                        }
                    } />
                }
            }
        } />
    )
}

