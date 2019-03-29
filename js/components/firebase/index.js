import RNFirebase from 'react-native-firebase';
import type { RemoteMessage } from 'react-native-firebase';

const configurationOptions = {
  debug: true,
};

// initializeApp and signInAnonymously have been deprecated
const firebase = RNFirebase.app();
firebase
  .auth()
  .signInAnonymouslyAndRetrieveData()
  .then((user) => {});

export default firebase;
