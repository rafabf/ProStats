import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import TeamServices from '../../../services/team.services'
import UserCard from '../user/UserCard'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'


class MyTeam extends Component {


    constructor(props) {
        super(props)
        this.state = { team: {} }
        this.services = new TeamServices()
    }

    componentDidMount = () => this.getMyTeam()


    getMyTeam = () => {
        this.services.getMyTeam()
            .then(theTeam => this.setState({ team: theTeam }))
            .catch(err => console.log(err))
    }

    render() {

        return this.state.team[0] ? (
            <Container>
                <Row>
                    <Col md={6}>
                        <h1>{this.state.team[0] && this.state.team[0].name}</h1>
                        <img src={this.state.team[0] && this.state.team[0].imageUrl} />

                    </Col>
                    <Col md={6}>
                        <p>{this.state.team[0] && this.state.team[0].history}</p>
                    </Col>

                </Row>
                <hr></hr>
                <Row>
                    {this.state.team[0] && this.state.team[0].members.map(elm => <UserCard key={elm._id} {...elm} />)}
                </Row>


            </Container>
        ) :
            <Spinner animation="border" variant="primary" />
    }
}







export default MyTeam