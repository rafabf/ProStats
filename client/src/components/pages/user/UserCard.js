import React from 'react'
import './UserCard.css'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

const UserCard = ({ username, imageUrl }) => {
    return (
        <Col md={4}>
            <Card className="card-user">
                <Card.Img variant="left" src={imageUrl} />
                <Card.Body>
                    <Card.Title>{username}</Card.Title>
                    <hr></hr>
                </Card.Body>

            </Card>
        </Col>
    )
}

export default UserCard