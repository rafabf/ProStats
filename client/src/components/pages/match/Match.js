import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import TeamServices from '../../../services/team.services'
import './match.css'
import UserCard from '../user/UserCard'


import { Radar, RadarChart, PolarGrid, PolarAngleAxis, Legend, PolarRadiusAxis } from "recharts";
import Select from '../../ui/Select'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'



class Match extends Component {


    constructor(props) {
        super(props)
        this.state = {
            team: {},
            select_1: null,
            select_2: null,
            selectedTeam: null,
            random: ""
        }
        this.services = new TeamServices()
    }

    componentDidMount = () => {
        this.getAllTeam()

    }
    handleClick() {
        const min = 1;
        const max = 100;
        const Rand = min + Math.random() * (max - min);
        this.setState({ random: this.state.random + Rand });
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
                console.log(average)
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
                acumulado.data.kills += parseFloat(eachMember.data.kills)
                acumulado.data.deaths += parseFloat(eachMember.data.deaths)
                acumulado.data.assists += parseFloat(eachMember.data.assists)

                return acumulado
            },
                { data: { kills: 0, deaths: 0, assists: 0 } })

            //a cada equipo le ponemos una propiedad nueva average con la media.
            reducedTeam.data.kills = reducedTeam.data.kills / eachTeam.members.length
            reducedTeam.data.deaths = reducedTeam.data.deaths / eachTeam.members.length
            reducedTeam.data.assists = reducedTeam.data.assists / eachTeam.members.length
            eachTeam.average = reducedTeam
            //devolvemos el equipo modificado
            return eachTeam
        })

        return averageTeam
    }

    chart(average) {

        const kills = { avg: "kills", A: average[0].average.data.kills, B: average[1].average.data.kills, fullMark: 20 }
        const assists = { avg: "assists", A: average[0].average.data.assists, B: average[1].average.data.assists, fullMark: 20 }
        const deaths = { avg: "deaths", A: average[0].average.data.deaths, B: average[1].average.data.deaths, fullMark: 20 }


        const allData = [kills, deaths, assists]

        return allData


    }






    closelink = () => this.setState({ showlink: false })
    openlink = () => this.setState({ showlink: true })


    render() {
        console.log()
        return (
            <Container>
                <Row>
                    <Col className="stylecol">
                        <h3 className="h3-style">Selecciona tu equipo</h3>
                        <hr></hr>
                        <Select className="select-style" name="select_1" teams={this.state.team} setMembers={this.membersteam} />
                    </Col>

                    <Col>
                        <h3 className="h3-style">Selecciona el equipo del contrincante</h3>
                        <hr></hr>
                        <Select className="select-style" name="select_2" teams={this.state.team} setMembers={this.membersteam} />
                    </Col>
                </Row>
                <Row className="stylerow">
                    {this.state.selectedTeam &&
                        this.state.selectedTeam.map(team => {
                            return (
                                <Col md={6}>
                                    <Row>
                                        {team.members.map(elm => (
                                            <Col md={4}>
                                                <UserCard key={elm._id} {...elm} />
                                            </Col>
                                        ))}
                                    </Row>
                                </Col>
                            );
                        })}
                </Row>

                {this.state.select_1 != null && this.state.select_2 != null &&
                    <Row className="center body" >
                        <Col md={6}>
                            <RadarChart cx={250} cy={250} outerRadius={150} width={500} height={500} data={this.state.dataChar}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="avg" />
                                <PolarRadiusAxis angle={90} domain={[0, 15]} />
                                <Radar name={this.state.select_1} dataKey="A" stroke="#0473EA" fill="#0473EA" fillOpacity={1.0} />
                                <Radar name={this.state.select_2} dataKey="B" stroke="#FA0000" fill="#FA0000" fillOpacity={0.4} />
                                <Legend />
                            </RadarChart>
                        </Col>


                        <Col md={6}>
                            <div className="div-style">
                                <button className="button-style" onClick={this.handleClick.bind(this)}>--Generar código de partida--</button>
                                <div className="div-style number-style">{this.state.random}</div>
                            </div>
                        </Col>
                    </Row>
                }
            </Container >
        )
    }
}







export default Match


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
