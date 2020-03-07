import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
// import TeamServices from '../../../services/team.services'
import AuthServices from '../../services/auth.services'
import { Link } from 'react-router-dom'

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
                    <Navbar className="back-style" expand="lg" >
                        <Navbar.Brand as="div">E-ProStats</Navbar.Brand>
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
                    <Navbar bg="dark" expand="lg" variant="dark">
                        <Navbar.Brand as="div">ProStats</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ml-auto">
                                <Nav.Link as="div"> <Link to="/">Inicio</Link></Nav.Link>
                                <Nav.Link as="small">{greeting}</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                )
        )
    }
}

export default Navigation