import React, { useState, useEffect } from 'react';
import { Offcanvas, Placeholder, Form, Col, Row, Button, Accordion } from 'react-bootstrap';
import regionService from '../../services/region.service';
import signalisationService from '../../services/signalisation.service';
import '../../styles/DetailSignalisation.css';

export default function DetailSignalisation(props) {
    const handleClose = () => props.setAffichage(false);
    const [listeRegions, setListeRegions] = useState(null);
    const [idRegionSelectionne, setIdRegionSelectionne] = useState(null);


    useEffect(() => {
        regionService.selectAll()
            .then(response => {
                setListeRegions(response.data);
            });
    }, []);

    async function validerAffecation() {
        try {
            const data = {
                idSignalisation: props.signalisation.idSignalisation,
                region: {
                    idRegion: idRegionSelectionne
                }
            }
            await signalisationService.update(props.signalisation.idSignalisation, data);
            alert("region affecté");
        }
        catch (ex) {
            alert(ex);
        }
    }



    if (props.signalisation === null || listeRegions === null) {
        return (
            <>
                <Offcanvas show={props.affichage} onHide={handleClose} placement="end" scroll={true}>
                    <Offcanvas.Header closeButton>
                        <Placeholder xs={12} />
                    </Offcanvas.Header>
                    <Placeholder as={Offcanvas.Body} animation="glow" >
                        <Placeholder xs={11} />
                        <br />
                        <Placeholder xs={11} />
                        <br />
                        <Placeholder xs={11} />
                    </Placeholder>

                </Offcanvas>
            </>
        )
    }
    return (
        <>
            <Offcanvas show={props.affichage} onHide={handleClose} placement="end" scroll={true}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        {
                            props.signalisation.typeSignalisations.map((typeSignalisation, key) => (
                                <span key={key}>{typeSignalisation.typeSignalisation}, </span>
                            ))
                        }
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <hr />
                    <div className="description text-center" >
                        <h3>Description</h3>
                        <p>{props.signalisation.descriptionSignalisation}</p>
                    </div>
                    <hr />
                    <div className="image_signalisation">
                        {
                            props.imageSignalisation.lenght === 0 ? (
                                <>Aucune image</>
                            ) : (
                                <Accordion defaultActiveKey="1">
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Voir images</Accordion.Header>
                                        <Accordion.Body>
                                            <ul>
                                                {
                                                    props.imageSignalisation.map((image) => (
                                                        <li key={image.idImageSignalisation}><img src={image.lienImageSignalisation} width="100" height="100" /></li>
                                                    ))
                                                }
                                            </ul>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>

                            )
                        }
                    </div>
                    <hr />
                    <div className="jumbotron">
                        <Form className="selectionRegion">
                            <Row className="mb-12">
                                <Form.Group as={Col}></Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label className="label">Region a affecter</Form.Label>
                                    <Form.Select onChange={(e) => setIdRegionSelectionne(e.target.value)}>
                                        {
                                            listeRegions.map((region) => (
                                                <option key={region.idRegion} value={region.idRegion}>{region.nomRegion}</option>
                                            ))
                                        }
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group as={Col}></Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}></Form.Group>
                                <Form.Group as={Col}>
                                    <Button variant="primary" className="boutton-validation" onClick={validerAffecation}>Affecter</Button>
                                </Form.Group>
                                <Form.Group as={Col}></Form.Group>
                            </Row>
                        </Form>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}