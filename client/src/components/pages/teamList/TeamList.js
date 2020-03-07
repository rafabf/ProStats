import React, { Component } from 'react'
import TeamServices from '../../../services/team.services'
import TeamForm from '../teamForm/TeamForm'
import TeamCard from './TeamCard'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

class TeamList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            team: [],
            showmodal: false
        }
        this.services = new TeamServices()
    }

    componentDidMount = () => this.getAllTeam()

    getAllTeam = () => {
        this.services.getAllTeam()
            .then(allteam => this.setState({ team: allteam }))
            .catch(err => console.log(err))
    }

    closeModal = () => this.setState({ showmodal: false })
    openModal = () => this.setState({ showmodal: true })

    render() {

        return (
            <Container>

                <h1>Equipos</h1>

                {this.props.loggedInUser && <Button className="mb-20" variant="dark" onClick={this.openModal}>Añadir equipo</Button>}

                {this.state.team.length ? (
                    <Row>
                        {this.state.team.map(elm => <TeamCard key={elm._id} {...elm} />)}
                    </Row>
                )
                    :
                    <p>CARGANDO...</p>

                }






                <Modal show={this.state.showmodal} onHide={this.closeModal}>
                    <Modal.Body>
                        <h3>Nuevo Profesional</h3>
                        <hr></hr>
                        <TeamForm closeModal={this.closeModal} refreshList={this.getAllTeam} />
                    </Modal.Body>
                </Modal>

            </Container>
        )
    }
}

export default TeamList