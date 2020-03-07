import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import TeamServices from '../../../services/team.services'
// import UserCard from '../user/UserCard'
// import Row from 'react-bootstrap/Row'
import Select from '../../ui/Select'

class Match extends Component {


    constructor(props) {
        super(props)
        this.state = { team: {} }
        this.services = new TeamServices()
    }


    componentDidMount = () => this.getAllTeam()

    getAllTeam = () => {
        this.services.getAllTeam()
            .then(allteam => this.setState({ team: allteam }))
            .catch(err => console.log(err))
    }
    getMyTeam = () => {
        this.services.getMyTeam()
            .then(theTeam => this.setState({ team: theTeam }))
            .catch(err => console.log(err))
    }

    render() {

        return (
            <Container>
                <Select teams={this.state.team} />
                <Select teams={this.state.team} />




            </Container>
        )
    }
}







export default Match