import axios from 'axios'

export default class Services {

    constructor() {
        this.service = axios.create({
            baseURL: 'http://localhost:5000/user',
            withCredentials: true
        })
    }

    getAllTeam = () => this.service.get('/getAllUser').then(response => response.data)
    getuserDetails = id => this.service.get(`/getOneUser/${id}`).then(response => response.data)
    postTeam = user => this.service.post(`/new`, user).then(response => response.data)
}