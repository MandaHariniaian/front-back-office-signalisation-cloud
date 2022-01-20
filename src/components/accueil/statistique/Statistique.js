import React, { Component, useEffect, useState } from "react";
// import { Link, Route, Switch } from "react-router-dom";
import { CanvasJS, CanvasJSChart } from 'canvasjs-react-charts';
import { Container, Row, Spinner, Navbar, Nav } from "react-bootstrap";
import signalisationService from '../../../services/signalisation.service';
import { Link, Route, Routes } from "react-router-dom";

export default function Statistique() {

    const options = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light2", //"light1", "dark1", "dark2"
        title: {
            text: "Simple Column Chart with Index Labels"
        },
        axisY: {
            includeZero: true
        },
        data: [{
            type: "column", //change type to bar, line, area, pie, etc
            //indexLabel: "{y}", //Shows y value on all Data Points
            indexLabelFontColor: "#5A5757",
            indexLabelPlacement: "outside",
            dataPoints: [
                { x: 10, y: 71 },
                { x: 20, y: 55 },
                { x: 30, y: 50 },
                { x: 40, y: 65 },
                { x: 50, y: 71 },
                { x: 60, y: 68 },
                { x: 70, y: 38 },
                { x: 80, y: 92, indexLabel: "Highest" },
                { x: 90, y: 54 },
                { x: 100, y: 60 },
                { x: 110, y: 21 },
                { x: 120, y: 49 },
                { x: 130, y: 36 }
            ]
        }]
    }


    return (
        <Container className="jumbotron">
            <Row>
                <div className="col-12 text-center"><h2>Statistique</h2></div>
            </Row>
            <Row>
                <div>
                    <Navbar bg="dark" variant="dark" sticky="top">
                        <Container className="text-center">
                            <Navbar.Brand></Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <Link to={"/statistique/stat-globale"} className="nav-link">
                                        Statistique globale
                                    </Link>
                                </Nav>
                            </Navbar.Collapse><Navbar.Toggle />
                        </Container>
                    </Navbar>
                    <div className="content container">
                        <Routes>
                            <Route exact path="/stat-globale" element={<StatGlobalParRegion />} />
                        </Routes>
                    </div>
                </div >
            </Row>
        </Container>
    )

}

function StatGlobalParRegion() {

    const [data, setData] = useState([]);

    async function getData() {
        const d = await signalisationService.statGlobale();
        console.log(d);
        const nombreSignalisationParRegion = [];
        d.data.data.map(d => {
            nombreSignalisationParRegion.push({
                y: d[0],
                label: d[1]
            });
        });
        console.log(nombreSignalisationParRegion);
        setData({
            animationEnabled: true,
            exportEnabled: true,
            theme: "light2", //"light1", "dark1", "dark2"
            title: {
                text: "Statistique globale par region"
            },
            axisY: {
                includeZero: true
            },
            data: [{
                type: "column", //change type to bar, line, area, pie, etc
                //indexLabel: "{y}", //Shows y value on all Data Points
                indexLabelFontColor: "#5A5757",
                indexLabelPlacement: "outside",
                dataPoints: nombreSignalisationParRegion
            }]
        })
    }

    useEffect(() => {
        getData();
    }, []);

    if (data.length === 0) {
        return (
            <Row>
                <div className="col-6"></div>
                <div className="col-2"><Spinner animation="border" /></div>
                <div className="col-5"></div>
            </Row>
        )
    }
    return (
        <>
            <CanvasJSChart options={data} />
        </>
    )

}

function StatTypeSignalisation() {
    const [data, setData] = useState([]);

    if (data.length === 0) {
        return (
            <Row>
                <div className="col-6"></div>
                <div className="col-2"><Spinner animation="border" /></div>
                <div className="col-5"></div>
            </Row>
        )
    }
    return (
        <>
        </>
    )
}