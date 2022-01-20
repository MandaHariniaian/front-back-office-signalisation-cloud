import React from 'react';
import { Link, Route, Routes } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import GestionRegion from './GestionRegion';
import GestionTypeSignalisation from './GestionTypeSignalisation';


export default function GestionElmNecessaire(){


    return(
        <div>
            <Navbar bg="dark" variant="dark" sticky="top">
                <Container className="text-center">
                    <Navbar.Brand>Gestion des elements necessaires</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link to={"/gestion_element_necessaire/gestionRegion"} className="nav-link">
                                Gestion des liste des regions
                            </Link>
                            <Link to={"/gestion_element_necessaire/gestionTypeSignalisation"} className="nav-link">
                                Gestion des types de signalisations
                            </Link>
                        </Nav>
                    </Navbar.Collapse><Navbar.Toggle />
                </Container>
            </Navbar>
            <div className="content container">
                <Routes>
                    <Route exact path="/gestionRegion" element={<GestionRegion />} />
                    <Route exact path="/gestionTypeSignalisation" element={<GestionTypeSignalisation />} />
                </Routes>
            </div>
        </div >
    )

}