import React, { Component } from 'react';
import './App.css';

import { GoogleLogin } from 'react-google-login';
import { GoogleLogout }  from 'react-google-login';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'


class App extends Component {

  constructor() {
    super()
    this.state = {
      first_name: "",
      picture: "",
      token: "",
      id: ""
    }
  }

//Verifies Google Credentials from User
  verifyGoogle = (response) => {
    let id_token = response.getAuthResponse().id_token;
    let URL = "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=" + id_token

    fetch(URL)
    .then(response=> response.json())
    .then(data => {
      if (data.email_verified) {
        this.getConfig(response)
      } else {
        alert("Login Invalid")
      }
    })
  }

//Once Credentials Verified, Builds Config for Fetch Request
  getConfig = (googleData) => {
    let profile = googleData.getBasicProfile();
    let id_token = googleData.getAuthResponse().id_token;
    let first_name = googleData.profileObj.givenName
    let img = profile.getImageUrl()
    let email = profile.getEmail()

    let config = {
      method: 'POST',
      headers: {
            'Content-Type': 'application/json',
        },
      body: JSON.stringify({
        user: {
          first_name: first_name,
          email: email,
          picture: img,
          token: id_token
        }
      })
    }
    this.getUser(config)
  }

  //Fetch request to either create a new user or find an existing user
  //with the confirmed Google info
  getUser = (config) => {
    let url = 'http://localhost:3000/users'
    fetch(url, config)
    .then(response => response.json())
    .then(data => {
      this.setState({
        first_name: data.first_name,
        picture: data.picture,
        token: data.token,
        id: data.id
      })
    })
  }

  //Clearing state to reload the Login page
  logout = () => {
    console.log("logout")
    this.setState({
      token: "",
      first_name: "",
      picture: "",
      id: ""
    })
  }

  render(){
    if (this.state.token) {
      return (
        <div className="App">
          <header className="App-header">
            <p>
              Welcome {this.state.first_name}
            </p>
            <div>
              <GoogleLogout
                buttonText="Logout"
                onLogoutSuccess={this.logout}
              />
            </div>
          </header>
        </div>
      )
    } else {
      return (
        <div className="App">
          <header className="App-header">
            <p>
              Please Login with Google Account
            </p>
            <div>
              <GoogleLogin
                clientId="306712866153-k37qt6nhspd4v53gg1l7o73vp8hc1kfs.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={this.verifyGoogle}
                onFailure={this.verifyGoogle}
                cookiePolicy={'single_host_origin'}
              />
            </div>
          </header>
        </div>
      );
    }
  }


}

export default App;