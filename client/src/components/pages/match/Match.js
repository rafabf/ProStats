import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import TeamServices from '../../../services/team.services'
import './match.css'
import UserCard from '../user/UserCard'

import { Radar, RadarChart, PolarGrid, PolarAngleAxis } from "recharts";
import Select from '../../ui/Select'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'


class Match extends Component {


    constructor(props) {
        super(props)
        this.state = { team: {}, select_1: null, select_2: null, selectedTeam: null }
        this.services = new TeamServices()
    }

    componentDidMount = () => {
        this.getAllTeam()

    }

    getAllTeam = () => {
        return this.services.getAllTeam()
            .then(allteam => this.setState({ team: allteam }))
            .catch(err => console.log(err))
    }

    getMyTeam = () => {
        this.services.getMyTeam()
            .then(theTeam => this.setState({ team: theTeam }))
            .catch(err => console.log(err))
    }

    membersteam = (teamName, value) => {
        console.log(value)
        console.log(teamName) //value del input/nombre del equipo
        const selector = value//name del input/el imput que lo ha marcado
        this.setState({ [selector]: teamName }, () => {

            // filtrar los equipos con los valores
            if (this.state.select_1 != null && this.state.select_2 != null) {
                //nos copiamos el team completo del state
                const result = this.state.team.filter(team => {
                    return team.name === this.state.select_1 || team.name === this.state.select_2
                })

                const average = this.getAverage(result)
                const dataChart = this.chart(average)

                // return result
                //filtramos los que coincidan con los select
                //metemos en selectedTeam el array que retorna filter
                this.setState({ selectedTeam: result, dataChar: dataChart });
            }
        })
    }

    num = () => {
        Math.floor((Math.random() * (11 - 5)) + 5);
    }

    getAverage = (teams) => {

        const averageTeam = teams.map(eachTeam => {
            //Iteramos cada equipo con el map
            const reducedTeam = eachTeam.members.reduce((acumulado, eachMember) => {
                //Reducimos a un unico elemento
                acumulado.data.deaths += eachMember.data.kills
                acumulado.data.deaths += eachMember.data.deaths
                acumulado.data.assists += eachMember.data.assists

                return acumulado
            },
                { data: { kills: 0, deaths: 0, assists: 0 } })

            //a cada equipo le ponemos una propiedad nueva average con la media.
            reducedTeam.data.kills = reducedTeam.data.kills / eachTeam.members.length
            reducedTeam.data.deaths = reducedTeam.deaths / eachTeam.members.length
            reducedTeam.data.assists = reducedTeam.data.assists / eachTeam.members.length
            eachTeam.average = reducedTeam
            //devolvemos el equipo modificado
            return eachTeam
        })

        return averageTeam
    }

    chart(average) {

        const kills = { avg: "kills", A: average[0].kills, B: average[1].kills, fullMark: 150 }
        const assists = { avg: "assists", A: average[0].assists, B: average[1].assists, fullMark: 150 }
        const deaths = { avg: "deaths", A: average[0].deaths, B: average[1].deaths, fullMark: 150 }


        const allData = [kills, deaths, assists]

        return allData


    }


    render() {
        console.log()
        return (
            <Container>
                <Row>
                    <Col className="stylecol">
                        <h3 className="h3-style">Selecciona tu equipo</h3>
                        <hr></hr>
                        <Select name="select_1" teams={this.state.team} setMembers={this.membersteam} />
                    </Col>
                    <Col>
                        <h3 className="h3-style">Selecciona el equipo del contrincante</h3>
                        <hr></hr>
                        <Select name="select_2" teams={this.state.team} setMembers={this.membersteam} />
                    </Col>
                </Row>

                <Row className="stylerow">

                    {this.state.selectedTeam && this.state.selectedTeam.map(team => {

                        return <Col>

                            {team.members.map(elm => <UserCard key={elm._id} {...elm} />)}
                        </Col>
                    })
                    }
                </Row>
                {/* pintar aqui chart */}
                {/* <RadarChart
                    cx={600}
                    cy={500}
                    outerRadius={300}
                    width={1000}
                    height={800}
                    data={teamDataReducido}
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
                </RadarChart> */}
                <Row>
                    <Col>
                        <Button className="button-style" > Generar código de partida</Button>
                    </Col>
                </Row>
            </Container >
        )
    }
}







export default Match


// const data = [
//     { subject: 'Math', A: 120, B: 110, fullMark: 150 },
//     { subject: 'Chinese', A: 98, B: 130, fullMark: 150 },
//     { subject: 'English', A: 86, B: 130, fullMark: 150 },
//     { subject: 'Geography', A: 99, B: 100, fullMark: 150 },
//     { subject: 'Physics', A: 85, B: 90, fullMark: 150 },
//     { subject: 'History', A: 65, B: 85, fullMark: 150 },
// ];

// const TwoLevelPieChart = React.createClass({
//     render() {
//         return (
//             <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={data}>
//                 <PolarGrid />
//                 <PolarAngleAxis dataKey="subject" />
//                 <PolarRadiusAxis angle={30} domain={[0, 150]} />
//                 <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
//                 <Radar name="Lily" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
//                 <Legend />

//             </RadarChart>
//         );
//     }
// })
