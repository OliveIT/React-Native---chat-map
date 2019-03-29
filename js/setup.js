import React, { Component } from 'react';
import { Text, Platform, Linking } from 'react-native';
import { StyleProvider } from 'native-base';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import axios from 'axios';
// import { Sentry } from 'react-native-sentry';
import App from './App';
import firebase from './components/firebase';
import { configureStore } from './configureStore';
import { getToken, saveDeviceToken } from './utils/auth';
import { validateToken } from './actions/user';
import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';

var deviceToken = '';

// Sentry.config(
//   'https://340f9a888ae84816b9d2281f754496c7:f8c8ccc243804effb3bdb429ac7e8225@sentry.io/284252'
// ).install();

// Sentry.setTagsContext({
//   environment: 'production',
//   react: true
// });

class Setup extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      store: configureStore(() => this.setState({ isLoading: false })),
    };
  }

  // initDeviceToken() {}

  componentWillMount() {
    getToken().then((token) => {
      if (token !== null) {
        this.state.store.dispatch(validateToken());
        return saveDeviceToken();
      }
      return null;
    }).catch(error => console.log({ error }));
  }

  componentDidMount() {
    setTimeout(() => {
      SplashScreen.hide();
      // this.initDeviceToken();
    }, 500);
    if (Platform.OS === 'android') {
      Linking.getInitialURL().then((url) => {
        this.navigate(url);
      });
    } else {
      Linking.addEventListener('url', this.handleOpenURL.bind(this));
    }
  }

  handleOpenURL = (event) => {
    this.navigate(event.url);
  };

  navigate = (url) => {
    if (this.props.navigation) {
      const { navigate } = this.props.navigation; // Error: undefined is not an object (evaluating '_this2.props.navigation.navigate')
      const route = url.replace(/.*?:\/\//g, '');
      const id = route.match(/\/([^\/]+)\/?$/)[1];
      const routeName = route.split('/')[0];
      // console.log(routeName);
      // if (routeName === 'people') {
      //   navigate('People', { id, name: 'chris' });
      // }
    }
  };

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL.bind(this));
  }

  render() {
    return (
      <StyleProvider style={getTheme(platform)}>
        <Provider store={this.state.store}>
          <App />
        </Provider>
      </StyleProvider>
    );
  }
}

Text.defaultProps.allowFontScaling = false;

export default Setup;
