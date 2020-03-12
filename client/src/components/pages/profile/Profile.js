import React from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis } from "recharts";
import './profile.css'
import Col from 'react-bootstrap/Col'
import row from 'react-bootstrap/Row'
import Row from "react-bootstrap/Row";





const Profile = ({ loggedInUser }) => {
    const userData = Object.entries(loggedInUser.data).map(e => ({
        name: e[0],
        value: e[1],
        fullMark: 150
    }));
    return (

        <div className="card-style">
            <Row>
                <Col>
                    <img className="img-style" src={loggedInUser.imageUrl} />

                </Col>
                <Col className="center">
                    <h1 > {loggedInUser.username} </h1>
                    <RadarChart
                        cx={250}
                        cy={350}
                        outerRadius={150}
                        width={500}
                        height={500}
                        data={userData}

                    >
                        <PolarGrid />
                        <PolarAngleAxis dataKey="name" />
                        <Radar
                            name="Mike"
                            dataKey="value"
                            stroke="#7784d8"
                            fill="#8884d8"
                            fillOpacity={0.6}
                        />
                    </RadarChart>
                </Col>
            </Row>
            <hr></hr>
            <Row>
                <Col>
                    <p>{loggedInUser.history}</p>
                </Col>
            </Row>
        </div>
    );
};
export default Profile;