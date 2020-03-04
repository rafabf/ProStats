import React from 'react'

import './TeamCard.css'

import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

import { Link } from 'react-router-dom'

const TeamCard = ({ name, imageUrl, _id }) => {
    return (
        <Col md={4}>
            <Card className="card-rusa">
                <Card.Img variant="top" src={imageUrl} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <hr></hr>
                    {/* <Button as="div" variant="dark" size="sm">
                        <Link to={`/detalles/${_id}`}>Detalles</Link>
                    </Button> */}
                    <Button as="div" variant="dark" size="sm">
                        <Link to={`/detalles/${_id}`}>unirse al equipo</Link>
                    </Button>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default TeamCard