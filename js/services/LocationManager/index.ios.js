let subscription = null;
export default {
  start: async () => {
    return true;
  },
  subscribe: callback => {
    subscription = navigator.geolocation.watchPosition(
      ({ coords: { latitude, longitude } }) =>
        callback({
          latitude,
          longitude
        }),
      err => err,
      {
        enableHighAccuracy: true,
        distanceFilter: 50, // in meters
      }
    );
  },
  unsubscribe: () => {
    navigator.geolocation.clearWatch(subscription);
  },
  getCurrentLocation: async () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          resolve({
            latitude,
            longitude
          });
        },
        reject,
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 3000
        }
      );
    });
  }
};
