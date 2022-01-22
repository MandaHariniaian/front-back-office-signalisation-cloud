import React from 'react';
import { useAppContext } from '../../lib/contextLib';
import  {Route, Redirect} from "react-router-dom";

const {estAuthentifie, authentification} = useAppContext();

export const ProtectedRoute = ({component: Component, ...rest}) => {
    return(
        <Route {...rest} render={
            props => {
                if(estAuthentifie === true){
                    return <Component {...props} />
                } else {
                    return <Redirect to={
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
