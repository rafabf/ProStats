import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Signup from '../auth/signup/Signup'
import Login from '../auth/login/Login'
import './home.css'


class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {

            showlogin: false,
            showsignup: false
        }

    }



    closeLogin = () => this.setState({ showlogin: false })
    openLogin = () => this.setState({ showlogin: true })

    closeSignup = () => this.setState({ showsignup: false })
    openSignup = () => this.setState({ showsignup: true })

    render() {

        return (
            <Container>

                <h1>
                    ¿Quieres unirte a nuestra liga y poder comparar tus Stats?
                </h1>


                <Button className="mb-60 color-style" variant="info" onClick={this.openLogin}>Iniciar sesión</Button>
                <Modal show={this.state.showlogin} onHide={this.closeLogin}>
                    <Modal.Body>
                        <h3>iniciar sesión</h3>
                        <hr></hr>
                        <Login history={this.props.history} setTheUser={this.props.setTheUser} closeLogin={this.closeLogin} />
                    </Modal.Body>
                </Modal>



                <Button className="mb-60 color-style" variant="info" onClick={this.openSignup}>Registrarse</Button>
                <Modal show={this.state.showsignup} onHide={this.closeSignup}>
                    <Modal.Body>
                        <h3>¡Registrate!</h3>
                        <hr></hr>
                        <Signup history={this.props.history} setTheUser={this.props.setTheUser} closeModal={this.closeSignup} />
                    </Modal.Body>
                </Modal>

            </Container>
        )
    }
}

export default Home