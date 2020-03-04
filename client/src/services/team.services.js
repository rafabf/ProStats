import axios from 'axios'

export default class Services {

    constructor() {
        this.service = axios.create({
            baseURL: 'http://localhost:5000/teams',
            withCredentials: true
        })
    }

    getAllTeam = () => this.service.get('/getAllTeams').then(response => response.data)
    getTeamDetails = id => this.service.get(`/getOneTeam/${id}`).then(response => response.data)
    postTeam = team => this.service.post(`/new`, team).then(response => response.data)
    postMyTeam = id => this.service.post(`/join/${id}`).then(response => response.data)
}