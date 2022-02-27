import React from "react";
import { useAppContext } from "../../lib/contextLib";
import { Navigate, Outlet, Route } from "react-router-dom";
import Accueil from "../accueil/Accueil";
import Login from "./Login";



const ProtectedRoute = () => {
    const {  estAuthentifie , authentification } = useAppContext();

    return estAuthentifie ? <Outlet /> : <Login/>

}

export default ProtectedRoute;