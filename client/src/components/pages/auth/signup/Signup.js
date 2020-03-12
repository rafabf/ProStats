import React, { Component } from 'react'
import './Signup.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
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
            history: String,
            position: String,
            kill: Number,
            death: Number,
            asist: Number,
            email: String
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
                this.setState({
                    username: '',
                    password: '',
                    imageUrl: "",
                    history: "",
                    position: "",
                    kill: "",
                    death: "",
                    asist: "",
                    email: ""
                })
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

                this.setState(
                    { ...this.state, imageUrl: response.secure_url }
                )
            })
            .catch(err => console.log(err))
    }
    render() {
        return (
            <Container variant="dark">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label>Nombre de suario</Form.Label>
                        <Form.Control type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Introduce tu correo</Form.Label>
                        <Form.Control type="email" name="email" placeholder="name@example.com" onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Imagen</Form.Label>
                        <Form.Control type="file" name="imageUrl" onChange={this.handleFileUpload} />
                    </Form.Group>
                    <h3 className="h3-air">Stats</h3>
                    <hr></hr>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Selecciona tu posición</Form.Label>
                        <Form.Control as="select" multiple name="position" >
                            <option>Top</option>
                            <option>Jungler</option>
                            <option>Mid</option>
                            <option>Support</option>
                            <option>Carry</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>Asesinatos</Form.Label>
                            <Form.Control type="number" name="kills" onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>Muertes</Form.Label>
                            <Form.Control type="number" name="deaths" onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridZip">
                            <Form.Label>Asistencias</Form.Label>
                            <Form.Control type="number" name="assists" onChange={this.handleChange} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Sobre mi:</Form.Label>
                        <Form.Control as="textarea" name="history" onChange={this.handleChange} rows="3" />
                    </Form.Group>
                    <Button variant="dark" type="submit" onSubmit={this.handleSubmit}>Registrarse</Button>
                </Form>
            </Container>
        )
    }
}
export default Signup