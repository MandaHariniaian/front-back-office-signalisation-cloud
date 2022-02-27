
import React, { useState, useEffect, useRef } from 'react';
import { Offcanvas, Placeholder, Form, Col, Row, Accordion } from 'react-bootstrap';
import regionService from '../../services/region.service';
import signalisationService from '../../services/signalisation.service';
import '../../styles/DetailSignalisation.css';
import mapboxgl from 'mapbox-gl';

import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles';


mapboxgl.accessToken = 'pk.eyJ1IjoibWFuZGFoYXJpbmlhaW5hIiwiYSI6ImNreGs0dmNvOTFidncyb2tqbWp4NHZmanMifQ.rLKoeO1xqyN6e3DpErrOew';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px',
};


const theme = createTheme();

export default function DetailSignalisation(props) {
    const handleClose = () => props.setAffichage(false);
    const [listeRegions, setListeRegions] = useState(null);
    const [idRegionSelectionne, setIdRegionSelectionne] = useState(0);
    const [imagesSignalisation, setImagesSignalisation] = useState([]);

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(47.73);
    const [lat, setLat] = useState(-19.00);
    const [zoom, setZoom] = useState(8);

    useEffect(() => {
        if (props.signalisation !== null) {
            if (map.current) return; // initialize map only once
            if (mapContainer.current !== null) {
                map.current = new mapboxgl.Map({
                    container: mapContainer.current,
                    style: 'mapbox://styles/mapbox/streets-v11',
                    center: [props.signalisation.coordonneeX, props.signalisation.coordonneeY],
                    zoom: zoom
                });
                map.current.on('move', () => {
                    setLng(map.current.getCenter().lng.toFixed(4));
                    setLat(map.current.getCenter().lat.toFixed(4));
                    setZoom(map.current.getZoom().toFixed(2));
                });
                map.current.on('load', () => {
                    map.current.addSource('places', {
                        'type': 'geojson',
                        'data': {
                            'type': 'FeatureCollection',
                            'features': [
                                {
                                    'type': 'Feature',
                                    'properties': {
                                        'icon': 'airport-15'
                                    },
                                    'geometry': {
                                        'type': 'Point',
                                        'coordinates': [props.signalisation.coordonneeX, props.signalisation.coordonneeX]
                                    }
                                }
                            ]
                        }
                    });
                    map.current.addLayer({
                        'id': 'places',
                        'type': 'symbol',
                        'source': 'places',
                        'layout': {
                            'icon-image': '{icon}',
                            'icon-allow-overlap': true
                        }
                    });

                    map.current.on('mouseenter', 'places', () => {
                        map.current.getCanvas().style.cursor = 'pointer';
                    });
                    map.current.on('mouseleave', 'places', () => {
                        map.current.getCanvas().style.cursor = '';
                    });
                });
            }
        }
    });

    useEffect(() => {
        if (map.current && props.signalisation !== null) {

        }
    }, [map.current]);

    useEffect(() => {
        regionService.selectAll()
            .then(response => {
                setListeRegions(response.data);
                setIdRegionSelectionne(response.data[0].idRegion);
            });
    }, []);

    useEffect(() => {
        if (props.signalisation !== null) {
            signalisationService.getImageSignalisation(props.signalisation.idSignalisation).then(response => {
                if (response.data.length !== 0) {
                    setImagesSignalisation(response.data);
                }
            });
        }
    }, [props.signalisation]);

    async function validerAffectation() {

        try {
            const data = {
                idSignalisation: props.signalisation.idSignalisation,
                region: {
                    idRegion: idRegionSelectionne
                }
            }
            console.log(idRegionSelectionne);
            await signalisationService.update(props.signalisation.idSignalisation, data);
            alert("Operation effectué");
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
            <Offcanvas show={props.affichage} onHide={handleClose} placement="end" className="offCanvas w-75" scroll={true}>
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
                    <div className="" >
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Voir sur la carte</Accordion.Header>
                                <Accordion.Body>
                                    <div>
                                        <div className="sidebar">
                                            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
                                        </div>
                                        <div ref={mapContainer} className="map-container col-12" />
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Voir les images</Accordion.Header>
                                <Accordion.Body>
                                    {
                                        imagesSignalisation.map(imageSignalisation => (
                                            <img className="imageSignalisation" src={imageSignalisation.lienImageSignalisation} key={imageSignalisation.idImageSignalisation}
                                                width="193" height="130"
                                            />
                                        ))
                                    }
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                    <hr />
                    <div className="jumbotron">
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
                                        <EditIcon />
                                    </Avatar>
                                    <Typography component="h1" variant="h5">
                                        Selectionnez la region a affecter
                                    </Typography>
                                    <Box component="form" noValidate sx={{ mt: 1 }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Region a affecter</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={idRegionSelectionne}
                                                label="Age"
                                                onChange={(e) => setIdRegionSelectionne(e.target.value)}
                                            >
                                                {
                                                    listeRegions.map((region) => (
                                                        <MenuItem key={region.idRegion} value={region.idRegion}>{region.nomRegion}</MenuItem>
                                                    ))
                                                }
                                            </Select>
                                        </FormControl>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                            className='boutton'
                                            onClick={validerAffectation}
                                        >
                                            Affecter une region
                                        </Button>
                                    </Box>
                                </Box>
                            </Container>
                        </ThemeProvider >
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}