import React, { useState, useEffect } from 'react';
import { Form, Row, Table, Button, Spinner } from 'react-bootstrap';
import '../../../styles/GestionRegion.css';
import typeSignalisationService from '../../../services/typeSignalisation.service';


import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddBoxIcon from '@mui/icons-material/AddBox';

export default function GestionTypeSignalisation() {

    const [listeTypeSignalisations, setListeTypeSignalisations] = useState([]);

    useEffect(() => {
        getListeTypSign();
    }, []);

    function getListeTypSign() {
        typeSignalisationService.selectAll()
            .then(response => {
                setListeTypeSignalisations(response.data);
            });
    }

    return (
        <div className='jumbotron'>
            <Row>
                <div className="col-3">
                    <AjoutTypeSignalisation listeTypeSignalisations={listeTypeSignalisations} setListeTypeSignalisations={setListeTypeSignalisations} className="form_ajout_type_sign" />
                </div>
                <div className="col-9">
                    <ListeTypeSignalisation className="liste_signalisation" listeTypeSignalisations={listeTypeSignalisations} getListeTypSign={getListeTypSign} setListeTypeSignalisations={setListeTypeSignalisations} />
                </div>
            </Row>
        </div>
    )

}

function ListeTypeSignalisation(props) {

    if (props.listeTypeSignalisations.length === 0) {
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Type signalisation</th>
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
                    <th>Type signalisation</th>
                    <th>Modifier</th>
                    <th>Supprimer</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.listeTypeSignalisations.map((typeSign) => (
                        <TypeSignalisation key={typeSign.idTypeSignalisation} typeSignalisation={typeSign} getListeTypSign={props.getListeTypSign}  setListeTypeSignalisations={props.setlisteTypeSignalisations} listeTypeSignalisations={props.listeTypeSignalisations} />
                    ))
                }
            </tbody>
        </Table>
    )

}

function TypeSignalisation(props) {
    const typeSignalisation = props.typeSignalisation;
    const [nomTypeSignalisation, setTypeSignalisation] = useState('');
    const [chargementModification, setChargementModification] = useState(false);
    const [chargementSuppression, setChargementSuppression] = useState(false);


    async function modifierTypeSignalisation() {
        try {
            if (nomTypeSignalisation === '') {
                throw new Error("Veuillez inserer une valeur dans le champ");
            }
            const data = {
                typeSignalisation: nomTypeSignalisation
            }
            await typeSignalisationService.update(typeSignalisation.idTypeSignalisation, data)
                .then(response => {
                    setChargementModification(true);
                    props.listeTypeSignalisations.map(s => {
                        if (typeSignalisation.idTypeSignalisation === s.idTypeSignalisation) {
                            s.typeSignalisation = nomTypeSignalisation;
                            setTypeSignalisation('');
                        }
                    });
                });
        }
        catch (ex) {
            alert(ex);
        }
        setChargementModification(false);
    }

    async function supprimerTypeSignalisation() {
        try {
            await typeSignalisationService.delete(typeSignalisation.idTypeSignalisation).then(() => {
                setChargementSuppression(true);
                let compteur = 0;
                props.listeTypeSignalisations.forEach(s => {
                    if (s.idTypeSignalisation === typeSignalisation.idTypeSignalisation) {
                        props.listeTypeSignalisations.splice(compteur, 1);
                        props.getListeTypSign();
                    }
                    compteur++;
                });
            });
        }
        catch (ex) {
            alert(ex);
        }
        setChargementSuppression(false);
    }

    if(chargementModification){
        return(
            <tr >
            <td>{typeSignalisation.typeSignalisation}</td>
            <td><input type="text" value={nomTypeSignalisation} onChange={(e) => setTypeSignalisation(e.target.value)} /><input type="button" value={<>Modification <Spinner animation="border"  /></>} disabled={true} className="btn btn-warning btn-modification" onClick={(e) => modifierTypeSignalisation()} /> </td>
            <td><Button variant="danger" onClick={supprimerTypeSignalisation} >Supprimer</Button></td>
        </tr>
        )
    }
    else if(chargementSuppression){
        return(
            <tr >
            <td>{typeSignalisation.typeSignalisation}</td>
            <td><input type="text" value={nomTypeSignalisation} onChange={(e) => setTypeSignalisation(e.target.value)} /><input type="button" value="modifier" disabled={true} className="btn btn-warning btn-modification" onClick={(e) => modifierTypeSignalisation()} /> </td>
            <td><Button variant="danger" onClick={supprimerTypeSignalisation} >Supprimer</Button></td>
        </tr>
        )
    }
    return (
        <tr >
            <td>{typeSignalisation.typeSignalisation}</td>
            <td><input type="text" value={nomTypeSignalisation} onChange={(e) => setTypeSignalisation(e.target.value)} /><input type="button" value="modifier" className="btn btn-warning btn-modification" onClick={(e) => modifierTypeSignalisation()} /> </td>
            <td><Button variant="danger" onClick={supprimerTypeSignalisation} >Supprimer</Button></td>
        </tr>
    )

}


const theme = createTheme();

function AjoutTypeSignalisation(props) {

    const [typeSignalisationAjout, setTypeSignalisationAjout] = useState('');

    async function ajouterTypeSignalisation(e) {
        e.preventDefault();
        try {
            if (typeSignalisationAjout === '') {
                throw new Error("Veuillez inserer une valeur dans le champ");
            }
            const data = {
                typeSignalisation: typeSignalisationAjout
            }
            await typeSignalisationService.insert(data)
                .then(response => {
                    props.listeTypeSignalisations.push({
                        idTypeSignalisation: response.data.idTypeSignalisation,
                        typeSignalisation: response.data.typeSignalisation
                    });
                    typeSignalisationService.selectAll()
                        .then(response => {
                            props.setListeTypeSignalisations(response.data);
                        });
                    setTypeSignalisationAjout('');
                });
        }
        catch (ex) {
            alert(ex);
        }
    }

    return (
        <>
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
                            Ajoute un nouvel type
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 1 }}>
                            <TextField margin="normal" required fullWidth id="nomRegion" label="Type" name="email" autoComplete="email"
                                autoFocus value={typeSignalisationAjout} onChange={(e) => setTypeSignalisationAjout(e.target.value)}
                            />
                            <Button type="submit" className='bouttonAjoutRegion' onClick={ajouterTypeSignalisation} >
                                Ajouter
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider >
        </>
    )
}