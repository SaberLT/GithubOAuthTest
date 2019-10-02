import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom'; // eslint-disable-line
import { createOauthFlow } from './OAUTH/index.js'; // eslint-disable-line
import qs from 'qs';
import logo from './logo.svg';
import './App.css';

const { Sender, Receiver } = createOauthFlow({
  authorizeUrl: 'https://github.com/login/oauth/authorize',
  tokenUrl: 'https://github.com/login/oauth/access_token',
  clientId: '1f0c55c1f575a17f4aca',
  clientSecret: '189a06bbcde76f78878a79e62aa08cfc64fef2ef',
  redirectUrl: 'http://localhost:3000/auth/github'
})

class App extends Component {
  handleSuccess = (accessToken, { response, state }) => {
    console.log('Success!');
    console.log('AccessToken: ', accessToken);
    console.log('Response: ', response);
    console.log('State: ', state);
  };

  handleError = async error => {
    console.error('Error: ', error.message);

    const text = await error.response.text();
    console.log(text);
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route
            exact
            path="/"
            render={(props) => {
              console.log(props)
              let result = qs.parse(props.location.search, { ignoreQueryPrefix: true })
              console.log(result)
              return (
                <div>
                  <Sender
                    state={{ to: '/auth/success' }}
                    render={({ url }) => <a href={url}>Connect to Github</a>}
                  />
                </div>
              )}}

              
          />
          
          <Route
            exact
            path="/auth/github"
            render={({ location }) => (
              <Receiver
                location={location}
                onAuthSuccess={this.handleSuccess}
                onAuthError={this.handleError}
                render={({ processing, state, error }) => {
                  if (processing) {
                    return <p>Processing!</p>;
                  }

                  if (error) {
                    return <p style={{ color: 'red' }}>{error.message}</p>;
                  }

                  return <Redirect to={state.to} />;
                }}
              />
            )}
          />

          <Route
            exact
            path="/auth/success"
            render={() => <div>Successfully authorized Github!</div>}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;