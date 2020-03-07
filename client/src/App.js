import React, { Component } from 'react';

/* ----- STYLING ----- */
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

/* ----- RRD COMPONENTS ----- */
import { Switch, Route, Redirect } from 'react-router-dom'


import Home from './components/pages/home/Home'
import TeamList from './components/pages/teamList/TeamList'
import TeamDetails from './components/pages/teamDetails/TeamDetails'
import NavBar from './components/ui/NavBar'
import MyTeam from './components/pages/myTeam/MyTeam'
import Signup from './components/pages/auth/signup/Signup'
import Profile from './components/pages/profile/Profile'
import Match from './components/pages/match/Match'
import Login from './components/pages/auth/login/Login'
import AuthServices from './services/auth.services'


class App extends Component {

  constructor() {
    super()
    this.state = { loggedInUser: false }
    this.services = new AuthServices()
  }


  componentDidUpdate = (prevProps, prevState) => console.log("El estado de App se ha actualizado:", this.state)
  componentDidMount = () => this.fetchUser()


  setTheUser = userObj => this.setState({ loggedInUser: userObj })
  fetchUser = () => {
    this.services.loggedin()
      .then(theUser => this.setState({ loggedInUser: theUser }))
      .catch(() => this.setState({ loggedInUser: false }))
  }


  render() {

    return (
      <>

        <NavBar setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} />

        <Switch>
          <Route exact path="/" render={(match) => <Home {...match} setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} />} />
          <Route path="/detalles/:id" render={props => <TeamDetails {...props} />} />
          <Route path="/teams" render={() => <TeamList loggedInUser={this.state.loggedInUser} />} />
          <Route path="/signup" render={() => <Signup setTheUser={this.setTheUser} />} />
          <Route path="/login" render={props => <Login setTheUser={this.setTheUser} {...props} />} />
          <Route path="/profile" render={() => this.state.loggedInUser ? <Profile loggedInUser={this.state.loggedInUser} /> : <Redirect to="/" />} />
          <Route path="/match" render={() => this.state.loggedInUser ? <Match loggedInUser={this.state.loggedInUser} /> : <Redirect to="/" />} />
          <Route path="/myteam" render={() => this.state.loggedInUser ? <MyTeam loggedInUser={this.state.loggedInUser} /> : <Redirect to="/" />} />
        </Switch>
      </>

    )
  }
}


export default App