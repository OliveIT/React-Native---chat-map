import { AppRegistry } from 'react-native';
import { Sentry } from 'react-native-sentry';
import Setup from './js/setup';

// uncomment to send sentry error notifications on local machine
Sentry.config('https://340f9a888ae84816b9d2281f754496c7@sentry.io/284252').install();

// uncomment to send sentry error notifications on slack
// Sentry.config('https://340f9a888ae84816b9d2281f754496c7:f8c8ccc243804effb3bdb429ac7e8225@sentry.io/284252').install();

AppRegistry.registerComponent('Vediohead', () => Setup);
