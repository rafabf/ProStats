import React, { Component } from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

import AuthServices from '../../../../services/auth.services'
import FilesServices from '../../../../services/files.services'
class Signup extends Component {

    constructor(props) {
        super(props)
        this.filesServices = new FilesServices()
        this.state = {
            username: '',
            password: '',
            imageUrl: String,
        }
        this.services = new AuthServices()
    }


    handleChange = e => {
        let { name, value } = e.target
        this.setState({ [name]: value })
    }

    postUser = () => {
        this.services.signup(this.state)
            .then(theLoggedNewUser => {
                this.setState({ username: '', password: '' })
                this.props.setTheUser(theLoggedNewUser)
                this.props.history.push('/profile')
            })
            .catch(err => console.log({ err }))
    }

    handleSubmit = e => {
        e.preventDefault()
        this.postUser()
    }
    handleFileUpload = e => {
        const uploadData = new FormData()
        uploadData.append("imageUrl", e.target.files[0])
        this.filesServices.handleUpload(uploadData)
            .then(response => {
                this.setState({
                    state: { ...this.state, imageUrl: response.secure_url }
                })
            })
            .catch(err => console.log(err))
    }


    render() {

        return (

            <Container>

                <h1>Registro de usuarios</h1>

                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label>Usuario</Form.Label>
                        <Form.Control type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Imagen</Form.Label>
                        <Form.Control type="file" name="imageUrl" onChange={this.handleFileUpload} />
                    </Form.Group>

                    <Button variant="dark" type="submit" onSubmit={this.handleSubmit}>Registrarse</Button>
                </Form>
            </Container>

        )
    }
}

export default Signup