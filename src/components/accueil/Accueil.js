import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import AffectationSignalisation from "./AffectationSignalisation";
import Statistique from "./statistique/Statistique";
import GestionElmNecessaire from "./GestionElements/GestionElmNecessaire";
import { useAppContext } from "../../lib/contextLib";
import Button from "react-bootstrap/Button";
import { Navbar, Container, Nav } from "react-bootstrap";
import Cookies from "js-cookie";
import '../../styles/Accueil.css';
import Presentation from "./Presentation";

export default function Accueil() {

    const { authentification } = useAppContext();

    function deconnection(){
        authentification(false);
        Cookies.remove("user");
    }

    return (
        <div>
            <Navbar bg="dark" variant="dark" sticky="top">
                <Container className="text-center">
                    <Navbar.Brand>Office de gestion des signalisation</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link to={"/affectation_signalisation"} className="nav-link">
                                Affectation de signalisation
                            </Link>
                            <Link to={"/statistique"} className="nav-link">
                                Statistique
                            </Link>
                            <Link to={"/gestion_element_necessaire/gestionRegion"} className="nav-link">
                                Gestion des elements necessaires
                            </Link>
                        </Nav>
                    </Navbar.Collapse><Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <Button onClick={deconnection} >Deconnection</Button>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="content container">
                <Routes>
                    <Route exact path="/" element={<Presentation />} />
                    <Route exact path="/statistique/*" element={<Statistique />} />
                    <Route exact path="/affectation_signalisation" element={<AffectationSignalisation />} />
                    <Route exact path="/gestion_element_necessaire/*" element={<GestionElmNecessaire />} />
                </Routes>
            </div>
        </div >
    )

}