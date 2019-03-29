import FusedLocation from 'react-native-fused-location';
import { PermissionsAndroid } from 'react-native';

let subscription = null;
export default {
  start: async () => {
    try {
      const granted = PermissionsAndroid.requestMultiple(
        [
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
        ],
        {
          title: 'Vediohead app permission',
          message:
            'Vediohead needs access to your location ' +
            'so you can share your wonderful moments with everyone.'
        }
      );
      if (granted) {
        FusedLocation.setLocationPriority(
          FusedLocation.Constants.HIGH_ACCURACY
        );
      }
      return granted;
    } catch (e) {
      throw e;
    }
  },
  subscribe: (callback) => {
    FusedLocation.setLocationPriority(FusedLocation.Constants.BALANCED);
    FusedLocation.setLocationInterval(20000);
    FusedLocation.setFastestLocationInterval(15000);
    FusedLocation.setSmallestDisplacement(50);
    FusedLocation.startLocationUpdates();
    subscription = FusedLocation.on('fusedLocation', callback);
  },
  unsubscribe: () => {
    FusedLocation.off(subscription);
  },
  getCurrentLocation: async () => {
    return await FusedLocation.getFusedLocation();
  }
}
