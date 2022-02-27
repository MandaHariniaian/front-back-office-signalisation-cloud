import React from 'react';
import { Button } from 'react-bootstrap';
import imageSignalisationService from '../../services/imageSignalisation.service';

export default function Signalisation(props) {


    async function afficherDetailSignalisation(){
        props.setAffichageDetail(true);
        props.setSignalisation(props.signalisation);
        try{
            await imageSignalisationService.getImage(props.signalisation.idSignalisation)
            .then((response) =>{
                props.setImageSignalisation(response.data);
            });
        }
        catch (ex){
            console.log(ex);
            alert("Impossible de charger les images");
        }
    }

    return (
        <tr>
            <td>{props.signalisation.typeSignalisations.map((typeSignalisation, key) =>(
                <span key={key}>{typeSignalisation.typeSignalisation}, </span>
            ))}</td>
            <td>
                Long : {props.signalisation.coordonneeX}
                <br />
                Lat : {props.signalisation.coordonneeY}
            </td>
            <td>{props.signalisation.dateSignalisation}</td>
            <td>
                <Button onClick={() => {
                    afficherDetailSignalisation();
                } } >
                    Details
                </Button>
            </td>
        </tr>
    )
}