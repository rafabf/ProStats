import axios from 'axios'

export default class Services {

    constructor() {
        this.service = axios.create({
            baseURL: `${process.env.REACT_APP_URL}/auth`,
            withCredentials: true
        })
    }

    signup = ({ username, password, imageUrl, history, position, kill, death, asist }) => this.service.post('/signup', { username, password, imageUrl, history, position, kill, death, asist }).then(response => response.data).catch(err => console.log({ err }, "error de crear usuario en service"))
    login = ({ username, password }) => this.service.post('/login', { username, password }).then(response => response.data)
    logout = () => this.service.post('/logout').then(response => response.data)
    loggedin = () => this.service.get('/loggedin').then(response => response.data)
}