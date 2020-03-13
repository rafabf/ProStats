import React from 'react'
import './UserCard.css'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

const UserCard = ({ username, imageUrl, position, kills, deaths, asssists }) => {
    return (
        <Card className="card-user">
            <Card.Img variant="left" style={{ width: "100%" }} src={imageUrl} />
            <Card.Body>
                <Card.Title className="cars-text">{username}</Card.Title>
                <Card.Text>kqsbckackjxbzc</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default UserCard
