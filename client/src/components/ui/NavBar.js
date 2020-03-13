import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import AuthServices from '../../services/auth.services'
import { Link } from 'react-router-dom'
import './nav.css'

class Navigation extends Component {

    constructor(props) {
        super(props)
        this.state = {}
        this.services = new AuthServices()
    }

    logout = () => {
        this.services.logout()
            .then(response => {
                this.props.setTheUser(false)
            })
            .catch(err => console.log(err))
    }



    render() {

        const greeting = this.props.loggedInUser ? <> {this.props.loggedInUser.username}</> : <>Hola, invitad@</>


        return (


            this.props.loggedInUser ?
                (
                    <Navbar expand="lg" className="back-style">
                        {/* <Navbar.Brand as="div"><img className="img-style" src="https://res.cloudinary.com/dsxdlrbln/image/upload/v1584048430/rafa_v2-01_vaiujp.png"></img></Navbar.Brand> */}
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ml-auto">
                                <Nav.Link as="div"> <Link to="/">Inicio</Link></Nav.Link>
                                <Nav.Link as="div"> <Link to="/teams">Buscar equipos</Link></Nav.Link>
                                <Nav.Link onClick={this.getMyTeam}> <Link to="/myTeam">Tu equipo</Link></Nav.Link>
                                <Nav.Link as="div"> <Link to="/match">partido</Link></Nav.Link>
                                <Nav.Link onClick={this.logout}>Cerrar sesión</Nav.Link>
                                <Nav.Link as="div"><Link to="/profile">{greeting}</Link></Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                )
                :
                (
                    <Navbar >
                        <Navbar.Brand as="div">ProStats</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ml-auto back-style">

                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                )
        )
    }
}

export default Navigation