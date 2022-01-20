//import logo from '../logo.svg';
import './App.css';
import Login from './components/login/Login';
import Accueil from './components/accueil/Accueil';
import React, { useState } from "react";
import { AppContext } from "./lib/contextLib";
import Cookies from "js-cookie";
import loginService from "./services/login.service";

export default function App() {

  const [estAuthentifie, authentification] = useState(false);


  const readCookie = async () =>{
    const data = {
      'user': Cookies.get("user")
    }
    try {
      await loginService.verifierCookie(data).then(response => {
        if (response.data === true) {
          authentification(true);
          Cookies.set("user", Cookies.get("user"), {expires: 1});
        }
        else {
            authentification(false);
        }
      });
    } catch (ex) {
      authentification(false);
      //alert(ex.message);
    }
  }
  React.useEffect(() =>{
    readCookie();
  }, [])

  return (
    <AppContext.Provider value={{ estAuthentifie, authentification }}>
      {estAuthentifie ? (
        <Accueil/>
      ) : (
        <Login />
      )}
    </AppContext.Provider>
  );
}

