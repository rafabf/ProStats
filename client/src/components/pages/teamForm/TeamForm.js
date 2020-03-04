import React, { Component } from 'react'

import teamServices from '../../../services/team.services'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// import router from '../../../../../server/routes/team.routes'
import FilesServices from '../../../services/files.services'

class TeamForm extends Component {

    constructor(props) {
        super(props)
        this.teamServices = new teamServices()
        this.filesServices = new FilesServices()
        this.state = {
            team: {
                name: String,
                history: String,
                imageUrl: String
            }
        }
    }

    finishAction = () => {
        this.props.closeModal()
        this.props.refreshList()
    }

    postTeam = () => {
        this.teamServices.postTeam(this.state.team)
            .then(() => this.finishAction())
            .catch(err => console.log(err))
    }


    handleChange = e => {
        let { name, value } = e.target
        this.setState({
            team: { ...this.state.team, [name]: value }
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.postTeam()
    }

    handleFileUpload = e => {
        const uploadData = new FormData()
        uploadData.append("imageUrl", e.target.files[0])
        this.filesServices.handleUpload(uploadData)
            .then(response => {
                console.log('Subida de archivo finalizada! La URL de Cloudinray es: ', response.secure_url)
                this.setState({
                    team: { ...this.state.team, imageUrl: response.secure_url }
                })
            })
            .catch(err => console.log(err))
    }

    render() {

        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" name="name" value={this.state.team.name} onChange={this.handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Historia</Form.Label>
                    <Form.Control type="text" name="history" value={this.state.team.history} onChange={this.handleChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Imagen</Form.Label>
                    <Form.Control type="file" name="imageUrl" onChange={this.handleFileUpload} />

                </Form.Group>

                <Button variant="dark" type="submit">Añadir equipo</Button>
            </Form>
        )
    }
}

export default TeamForm