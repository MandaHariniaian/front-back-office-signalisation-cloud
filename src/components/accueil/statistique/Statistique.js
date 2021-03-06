import React, { useEffect, useState } from "react";
// import { Link, Route, Switch } from "react-router-dom";
import { CanvasJSChart } from 'canvasjs-react-charts';
import { Container, Row, Spinner, Navbar, Nav } from "react-bootstrap";
import signalisationService from '../../../services/signalisation.service';
import { Link, Route, Routes } from "react-router-dom";

export default function Statistique() {


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
                                    <Link to={"/statistique/stat-region"} className="nav-link">
                                        Signalisation par region
                                    </Link>
                                    <Link to={"/statistique/stat-type"} className="nav-link">
                                        Signalisation par type
                                    </Link>
                                </Nav>
                            </Navbar.Collapse><Navbar.Toggle />
                        </Container>
                    </Navbar>
                    <div className="content container">
                        <Routes>
                            <Route exact path="/stat-region" element={<StatParRegion />} />
                            <Route exact path="/stat-type" element={<StatParType />} />
                        </Routes>
                    </div>
                </div >
            </Row>
        </Container>
    )

}

function StatParRegion() {

    const [data, setData] = useState([]);

    async function getData() {
        try {
            const d = await signalisationService.statParRegion();
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
            });
        }
        catch (ex) {
            
        }
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

function StatParType() {
    const [data, setData] = useState([]);

    
    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        const d = await signalisationService.statParRegion();
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