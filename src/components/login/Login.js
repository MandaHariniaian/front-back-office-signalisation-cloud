import React, { useState } from "react";
import loginService from "../../services/login.service";
import { Form, Row, Col, Spinner } from "react-bootstrap";
import '../../styles/Login.css';
import { useAppContext } from "../../lib/contextLib";
import Cookies from "js-cookie";

import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function Login() {
  const { authentification } = useAppContext();
  const [mdp, setMdp] = useState("");
  const [erreurMdp, setErreurMdp] = useState(false);
  const [chargement, setChargement] = useState(false);
  const [login, setLogin] = useState("");

  async function validerFormulaire(event) {
    event.preventDefault();
    let dateAct = new Date();
    let sendToToken = dateAct.getFullYear() + "-" + dateAct.getMonth() + "-" + dateAct.getDay() + " " + dateAct.getHours() + ":" + dateAct.getMinutes() + ":" + dateAct.getSeconds() + "." + dateAct.getMilliseconds();
    const data = {
      'login': login,
      'motDePasse': mdp,
      'token': sendToToken
    }
    setChargement(true);
    try {
      await loginService.verifierLogin(data).then(response => {
        if (response.data.length > 0) {
          setErreurMdp(false);
          authentification(true);
          Cookies.set("user", response.data, { expires: 1 });
          setChargement(false);
        }
        else {
          setErreurMdp(true);
          setChargement(false);
          authentification(false);
          //alert("Mot de passe erroné")
        }
      });
    } catch (ex) {
      console.log(ex);
      alert(ex.message);
      authentification(false);
      setChargement(false);
    }
  }


  return (
    <Container className="login col-5">
      <Row className="container-titre">
        <Col>
        </Col>
      </Row>
      <Row >
        <Form className="formulaire col-12" onSubmit={validerFormulaire}>
        </Form>
      </Row>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Connection
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField  margin="normal"  required  fullWidth  id="email"   label="Identifiant" name="email" autoComplete="email"  autoFocus
                value={login}
                onChange={(e) => setLogin(e.target.value) }
              />
              <TextField margin="normal" required fullWidth  name="password" label="Mot de passe" type="password"
                id="password"
                autoComplete="current-password"
                value={mdp}
                onChange={(e) => setMdp(e.target.value)}
              />
              {erreurMdp ? (
                <span className='messageErreur' >
                  Mauvais mot de passe
                </span>
              ) : (
                <span>
                </span>
              )
              }
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={validerFormulaire}
                className='boutton'
              >
                {chargement
                  ?
                  (
                    <>
                      <span>Patientez...</span>
                      <Spinner animation="border" variant="secondary" />
                    </>
                  ) : ('Connection')}
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider >
    </Container >
  );
}
