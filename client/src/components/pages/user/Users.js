import React, { Component } from 'react'
import TeamsServices from '../../../services/team.services'
import UserCard from './UserCard'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Modal from 'react-bootstrap/Modal'
import Spinner from 'react-bootstrap/Spinner'
class Userlist extends Component {

    constructor(props) {
        super(props)
        this.state = {
            team: [],
            showmodal: false
        }
        this.services = new TeamsServices()
    }

    componentDidMount = () => this.getAllTeams()

    closeModal = () => this.setState({ showmodal: false })
    openModal = () => this.setState({ showmodal: true })

    render() {

        return (
            <Container>

                {this.state.team.length ? (
                    <Row>
                        {this.state.team.members.map(elm => <UserCard key={elm._id} {...elm} />)}
                    </Row>
                )
                    :
                    <Spinner animation="border" variant="primary" />
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

export default Userlist