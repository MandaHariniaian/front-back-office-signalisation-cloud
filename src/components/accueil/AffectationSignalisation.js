import React, { useState, Component } from "react";
import { Container, Row, Spinner, Table } from 'react-bootstrap';
import Signalisation from "./Signalisation";
import DetailSignalisation from "./DetailSignalisation";
import '../../styles/AffectationSignalisation.css';
import signalisationService from '../../services/signalisation.service';
// import { Link, Route, Switch } from "react-router-dom";

export default function AffectationSignalisation() {
    const [affichageDetail, setAffichageDetail] = useState(false);
    const [signalisation, setSignalisation] = useState(null);
    const [imageSignalisation, setImageSignalisation] = useState([]);

    return (
        <Container className="content">
            <Row className="title">
                <div className="col-12 text-center"><h2>Affectation de signalisation</h2></div>
            </Row>

            <Row className="sous_titre">
                <div className="col-12 text-center"><h3>Liste des signalisation</h3></div>
            </Row>
            <br />
            <hr />
            <Row>
                <ListeSignalisation affichageDetail={affichageDetail} setAffichageDetail={setAffichageDetail} setSignalisation={setSignalisation} setImageSignalisation={setImageSignalisation} />
            </Row>
            <DetailSignalisation signalisation={signalisation} imageSignalisation={imageSignalisation} affichage={affichageDetail} setAffichage={setAffichageDetail} />
        </Container>
    )
}


class ListeSignalisation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listeSign: [],
            estCharge: false,
            enChargement: true
        }
    }

    componentDidMount() {
        try{
            signalisationService.selectAll()
            .then(response =>{
                if(response.data.length > 0){
                    this.setState({
                        listeSign: response.data
                    })
                }
                this.setState({
                    estCharge: true,
                    enChargement: false
                });
            });
        }
        catch(ex){
            alert(ex)
        }
    }

    render() {
        const { estCharge } = this.state;
        if (this.state.enChargement) return <div className="row text-center"><span>Attendez un peu ... <Spinner animation="border"/></span></div>
        else if(estCharge && this.state.listeSign.length === 0) return(
            <div className="row text-center"><p>Aucune signalisation a affecter</p></div>
        )
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Type signalisation</th>
                        <th>Coordonnées</th>
                        <th>Date de signalisation</th>
                        <th>Button</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.listeSign.map((data) =>(
                            <Signalisation key={data.idSignalisation} setSignalisation={this.props.setSignalisation} setAffichageDetail={this.props.setAffichageDetail}  signalisation={data} setImageSignalisation={this.props.setImageSignalisation} />
                        ))
                    }
                </tbody>
            </Table>
        )
    }
}
