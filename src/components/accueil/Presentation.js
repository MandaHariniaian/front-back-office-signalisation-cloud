import React from "react";
import { Container, Row } from 'react-bootstrap';
import '../../styles/Presentation.css';


export default function Presentation() {


    return (
        <Container className="content">
            <Row className="title">
                <div className="col-12 text-center"><h2>Bienvenue dans l'interface de gestion des signalisation</h2></div>
            </Row>
            <hr />
            <Row className="contenu">
                <div className="col-12 text-center"><h3>Guide de navigation</h3></div>
                <div>
                    <ul>
                        <li className="navigationTop" >Statistique</li>
                        <ul>
                            <li>Statistique</li>
                        </ul>
                    </ul>
                </div>
            </Row>
        </Container>
    )

}