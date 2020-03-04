import React, { Component } from 'react'

import TeamsServices from '../../../services/team.services'


import TeamsCard from './UserCard'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
// import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

class Teamslist extends Component {

    constructor(props) {
        super(props)
        this.state = {
            team: [],
            showmodal: false
        }
        this.services = new TeamsServices()
    }

    componentDidMount = () => this.getAllTeams()

    getAllTeams = () => {
        this.services.getAllTeams()
            .then(allteam => this.setState({ team: allteam }))
            .catch(err => console.log(err))
    }

    closeModal = () => this.setState({ showmodal: false })
    openModal = () => this.setState({ showmodal: true })

    render() {

        return (
            <Container>

                <h1>Equipos en la escena</h1>

                {/* {this.props.loggedInUser && <Button className="mb-20" variant="dark" onClick={this.openModal}>Añadir jugador Teams</Button>} */}

                {this.state.team.length ? (
                    <Row>
                        {this.state.team.map(elm => <TeamsCard key={elm._id} {...elm} />)}
                    </Row>
                )
                    :
                    <p>CARGANDO...</p>

                }






                <Modal show={this.state.showmodal} onHide={this.closeModal}>
                    <Modal.Body>
                        <h3></h3>
                        <hr></hr>
                        <TeamsForm closeModal={this.closeModal} refreshList={this.getAllTeams} />
                    </Modal.Body>
                </Modal>

            </Container>
        )
    }
}

export default TeamsList