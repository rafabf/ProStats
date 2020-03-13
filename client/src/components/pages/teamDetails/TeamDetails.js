import React, { Component } from 'react'

import TeamServices from '../../../services/team.services'

import './team-details.css'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'




class TeamDetails extends Component {

    constructor(props) {
        super(props)
        this.state = { team: {} }
        this.services = new TeamServices()


    }

    componentDidMount = () => this.getTeamDetails()

    getTeamDetails = () => {
        this.services.getTeamDetails(this.props.match.params.id)
            .then(theTeam => this.setState({ team: theTeam }))
            .catch(err => console.log(err))
    }

    postMyTeam = () => {
        this.services.postMyTeam(this.props.match.params.id)
            .then(theTeam => this.setState({ team: theTeam }))
            .catch(err => console.log(err))
    }
    render() {

        return (
            <Container className="coaster-details">

                <Row>
                    <Col md={{ span: 5, offset: 1 }}>
                        <img src={this.state.team.imageUrl} alt={this.state.team.name}></img>
                    </Col>
                    <Col md={6}>
                        <p>{this.state.team && this.state.team.history}</p>
                    </Col>
                </Row>
                <hr></hr>


                <button className="button-style" onClick={this.postMyTeam}>unirse al equipo</button>
                <hr>
                </hr>
            </Container >
        )
    }
}


export default TeamDetails