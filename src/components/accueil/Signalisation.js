import React from 'react';
import { Button } from 'react-bootstrap';

export default function Signalisation(props) {


    async function afficherDetailSignalisation(){
        props.setAffichageDetail(true);
        props.setSignalisation(props.signalisation)
    }

    return (
        <tr>
            <td>{props.signalisation.typeSignalisations.map((typeSignalisation, key) =>(
                <span key={key}>{typeSignalisation.typeSignalisation}, </span>
            ))}</td>
            <td>{props.signalisation.coordonnees}</td>
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