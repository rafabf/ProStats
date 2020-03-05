import React, { Component } from 'react'

import TeamServices from '../../../services/team.services'

import './team-details.css'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import { Link } from 'react-router-dom'



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
                {/* <h1>{this.state.team.name}</h1> */}
                <Row>
                    <Col md={{ span: 4, offset: 1 }}>

                        <hr></hr>
                        {/* <p>{this.state.team.imageUrl}</p> */}
                    </Col>
                    <Col md={{ span: 5, offset: 1 }}>
                        {/* <img src={this.state.team.imageUrl} alt={this.state.team.name}></img> */}
                    </Col>
                </Row>
                <Button as="div" variant="dark" size="sm">
                    <Link to="/">Volver</Link>

                </Button>
                <Button as="div" variant="dark" size="sm">
                    <button onClick={this.postMyTeam}>unirse al equipo</button>

                </Button>
            </Container>
        )
    }
}


export default TeamDetails