import React, { useState } from "react";
import loginService from "../../services/login.service";
import ReCAPTCHA from "react-google-recaptcha";
import { Form, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import '../../styles/Login.css';
import { useAppContext } from "../../lib/contextLib";
import Cookies from "js-cookie";


export default function Login() {
  const { authentification } = useAppContext();
  const [mdp, setMdp] = useState("");
  const [erreurMdp, setErreurMdp] = useState(false);
  const [capthcaValue, setCaptchaValue] = useState(false);
  const [chargement, setChargement] = useState(false);

  function validerChamp() {
    if (mdp.length > 0 && capthcaValue === true && !chargement) {
      return true;
    }
    return false;
  }

  function verifierCaptcha(e) {
    /*if (e) {
      setCaptchaValue(true);
    }
    validerChamp();*/
  }

  async function validerFormulaire(event) {
    event.preventDefault();
    let dateAct = new Date();
    let sendToToken = dateAct.getFullYear() + "-" + dateAct.getMonth() + "-" + dateAct.getDay() + " " + dateAct.getHours() + ":" + dateAct.getMinutes() + ":" + dateAct.getSeconds() + "." + dateAct.getMilliseconds();
    const data = {
      'mdp': mdp,
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
          //alert("Mot de passe erroné")
        }
      });
    } catch (ex) {
      console.log(ex);
      alert(ex.message);
      setChargement(false);
    }
  }


  return (
    <Container className="login col-5">
      <Row className="container-titre">
        <Col>
          <h1 className="titre">Login back office</h1>
        </Col>
      </Row>
      <Row >
        <Form className="formulaire col-12" onSubmit={validerFormulaire}>
          <Form.Group size="lg" controlId="password" className="formComponent">
            <Form.Label className="col-12">Mot de passe</Form.Label>
            <Form.Control
              type="password"
              value={mdp}
              onChange={(e) => setMdp(e.target.value)}
            />
          </Form.Group>
          {erreurMdp ? (
            <Form.Control.Feedback type="invalid">
              Mauvais mot de passe
            </Form.Control.Feedback>
          ) : (
            <div>
            </div>
          )
          }



          <div>
            <Button size="lg" type="submit" disabled={false} className="formComponent">
              {chargement
                ?
                (
                  <>
                    <span>Patientez...</span>
                    <Spinner animation="border" variant="secondary" />
                  </>
                ) : ('Connection')}
            </Button>
          </div>
        </Form>
      </Row>
    </Container>
  );
}

/**<ReCAPTCHA
            //ref={}
            sitekey="6Le2AP8dAAAAAN5HrUAO3As0TXjaX5lk2u3pMi3A"
            onChange={verifierCaptcha}
            className="formComponent"

          /> */


// recaptcha

// clé du site :  6Le2AP8dAAAAAN5HrUAO3As0TXjaX5lk2u3pMi3A
// clé secrète: 6Le2AP8dAAAAAPTxSgOJuQ7m0Li7ZFZSrts2cd28