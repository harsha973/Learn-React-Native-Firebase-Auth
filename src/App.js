import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import { LoginForm } from './components/LoginForm';

class App extends Component {
  state= { loggedIn: null }
  componentWillMount() {
      firebase.initializeApp({
        apiKey: 'AIzaSyB1EhqlUrCouy4MCJcxUVyt15c1OOy_o_4',
        authDomain: 'AIzaSyB1EhqlUrCouy4MCJcxUVyt15c1OOy_o_4',
        databaseURL: 'https://auth-6e260.firebaseio.com',
        projectId: 'auth-6e260',
        storageBucket: 'auth-6e260.appspot.com',
        messagingSenderId: '669071719174'
      });

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.setState({ loggedIn: true });
        } else {
          this.setState({ loggedIn: false });
        }
      });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
        <View style={styles.logoutStyle}>
          <Button onPress={() => firebase.auth().signOut()}>Log out</Button>
        </View>);
      case false:
        return <LoginForm />;
      default:
        return (
          <View style={styles.spinnerStyle}>
            <Spinner size="large" />
          </View>
        );
    }
  }

  render() {
    return (
      <View style={styles.mainContainerStyle}>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

const styles = {
  mainContainerStyle: {
    flexDirection: 'column'
  },
  logoutStyle: {
    paddingTop: 15,
    position: 'relative',
    flexDirection: 'row'
  },
  spinnerStyle: {
    paddingTop: 15,
    position: 'relative',
    flexDirection: 'row'
  }
};

export default App;
