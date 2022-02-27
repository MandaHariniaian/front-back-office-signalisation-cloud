import React, { useState, useEffect } from 'react';
import { Form, Row, Table, Spinner, Button } from 'react-bootstrap';
import '../../../styles/GestionRegion.css';
import regionService from '../../../services/region.service';

import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddBoxIcon from '@mui/icons-material/AddBox';

export default function GestionRegion() {

    const [listeRegions, setListeRegions] = useState([]);

    useEffect(() => {
        getListeRegion();
    }, []);

    function getListeRegion() {
        regionService.selectAll()
            .then(response => {
                setListeRegions(response.data);
            });
    }

    return (
        <div className='jumbotron'>
            <Row>
                <div className="col-3">
                    <AjoutRegion listeRegions={listeRegions} setListeRegions={setListeRegions} getListeRegion={getListeRegion}  className="form_ajout_region" />
                </div>
                <div className="col-9">
                    <ListeRegions className="liste_regions" listeRegions={listeRegions} setListeRegions={setListeRegions} getListeRegion={getListeRegion} />
                </div>
            </Row>
        </div>
    )

}

function ListeRegions(props) {

    if (props.listeRegions.length === 0) {
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Region</th>
                        <th>Modifier</th>
                        <th>Supprimer</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td ><Spinner animation="border" /></td>
                        <td ><Spinner animation="border" /></td>
                        <td ><Spinner animation="border" /></td>
                    </tr>
                </tbody>
            </Table>
        )
    }
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Region</th>
                    <th>Modifier</th>
                    <th>Supprimer</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.listeRegions.map((region) => (
                        <Region key={region.idRegion} region={region} setListeRegions={props.setListeRegions} listeRegions={props.listeRegions} getListeRegion={props.getListeRegion} />
                    ))
                }
            </tbody>
        </Table>
    )

}

function Region(props) {
    const region = props.region;
    const [nomRegion, setNomRegion] = useState('');
    const [chargementModification, setChargementModification] = useState(false);
    const [chargementSuppression, setChargementSuppression] = useState(false);

    async function modifierRegion() {
        try {
            if (nomRegion === '') {
                throw new Error("Veuillez inserer une valeur dans le champ");
            }
            const data = {
                idRegion: props.region.idRegion,
                nomRegion: nomRegion
            }
            await regionService.update(props.region.idRegion, data)
                .then(response => {
                    setChargementModification(true);
                    props.listeRegions.map(r => {
                        if (region.idRegion === r.idRegion) {
                            r.nomRegion = nomRegion;
                            setNomRegion('');
                        }
                    })
                });
        }
        catch (ex) {
            alert(ex);
        }
        setChargementModification(false);
    }

    async function supprimerRegion() {
        try {
            await regionService.delete(region.idRegion).then(() => {
                setChargementSuppression(true);
                let compteur = 0;
                props.listeRegions.forEach(r => {
                    if (r.idRegion === region.idRegion) {
                        props.listeRegions.splice(compteur, 1);
                    }
                    compteur++;
                    props.getListeRegion();
                });
            });
        }
        catch (ex) {
            alert(ex);
        }
        setChargementSuppression(false);
    }

    if (chargementModification === true) {
        return (
            <tr >
                <td>{region.nomRegion}</td>
                <td><input type="text" value={nomRegion} onChange={(e) => setNomRegion(e.target.value)} /><input type="button" value={<>Modification <Spinner animation="border" /></>} className="btn btn-warning btn-modification" disabled={true} /> </td>
                <td><Button variant="danger" onClick={supprimerRegion} disabled={true} >Supprimer</Button></td>
            </tr>
        )
    }
    else if (chargementSuppression === true) {
        return (
            <tr >
                <td>{region.nomRegion}</td>
                <td><input type="text" value={nomRegion} onChange={(e) => setNomRegion(e.target.value)} /><input type="button" value="modifier" disabled={true} className="btn btn-warning btn-modification" onClick={(e) => modifierRegion()} /> </td>
                <td><Button variant="danger" onClick={supprimerRegion} >Suppresion ... <Spinner animation="border" /></Button></td>
            </tr>
        )
    }
    return (
        <tr >
            <td>{region.nomRegion}</td>
            <td><input type="text" value={nomRegion} onChange={(e) => setNomRegion(e.target.value)} /><input type="button" value="modifier" className="btn btn-warning btn-modification" onClick={(e) => modifierRegion()} /> </td>
            <td><Button variant="danger" onClick={supprimerRegion} >Supprimer</Button></td>
        </tr>
    )

}


const theme = createTheme();

function AjoutRegion(props) {

    const [nomRegionAjout, setNomRegionAjout] = useState('');

    async function ajouterRegion(e) {
        e.preventDefault();
        try {
            if (nomRegionAjout === '') {
                throw new Error("Veuillez inserer une valeur dans le champ");
            }
            const data = {
                nomRegion: nomRegionAjout
            }
            await regionService.insert(data)
                .then(response => {
                    props.listeRegions.push({
                        idRegion: response.data.idRegion,
                        nomRegion: response.data.nomRegion
                    });
                    setNomRegionAjout('');
                    props.getListeRegion();
                    //regionService.selectAll().then(response => props.setListeRegions(response.data));
                });
        }
        catch (ex) {
            alert(ex);
        }
    }

    return (
        <div className='form_ajout_region'>
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
                            <AddBoxIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Ajouter une region
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 1 }}>
                            <TextField margin="normal" required fullWidth id="nomRegion" label="Nom de region" name="email" autoComplete="email"
                                autoFocus value={nomRegionAjout} onChange={(e) => setNomRegionAjout(e.target.value)}
                            />
                            <Button type="submit" className='bouttonAjoutRegion' onClick={ajouterRegion} >
                                Ajouter
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider >
        </div>
    )
}