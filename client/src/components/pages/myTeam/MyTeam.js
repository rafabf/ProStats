import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import TeamServices from '../../../services/team.services'
// import Button from 'react-bootstrap/Button'
// import Modal from 'react-bootstrap/Modal'


class MyTeam extends Component {


    constructor(props) {
        super(props)
        this.state = { team: {} }
        this.services = new TeamServices()
    }

    componentDidMount = () => this.getMyTeam()


    getMyTeam = () => {
        this.services.getMyTeam()
            .then(allmembers => this.setState({ team: allmembers }))
            .catch(err => console.log(err))
    }
    render() {

        return (
            <Container>

                <h1>este es tu equipo</h1>





            </Container>
        )
    }
}







export default MyTeam