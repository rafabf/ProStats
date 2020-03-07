import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import TeamServices from '../../../services/team.services'
import UserCard from '../user/UserCard'
import Row from 'react-bootstrap/Row'


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

        return (
            <Container>

                <h1>este es tu equipo</h1>
                <Row>
                    {this.state.team.name}
                </Row>
                <Row>
                    {this.state.team[0] && this.state.team[0].members.map(elm => <UserCard key={elm._id} {...elm} />)}
                </Row>


            </Container>
        )
    }
}







export default MyTeam