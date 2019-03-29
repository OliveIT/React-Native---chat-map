## patch

# podspec
cp $(pwd)/react-native-autogrow-textinput/react-native-autogrow-textinput.podspec ../node_modules/react-native-autogrow-textinput
cp $(pwd)/react-native-fbsdk/react-native-fbsdk.podspec ../node_modules/react-native-fbsdk/ios
cp $(pwd)/react-native-gesture-handler/RNGestureHandler.podspec ../node_modules/react-native-gesture-handler/ios
cp $(pwd)/react-native-gps-state/react-native-gps-state.podspec ../node_modules/react-native-gps-state
cp $(pwd)/react-native-gps-state/GPSStatePackage.java.cp ../node_modules/react-native-gps-state/android/src/main/java/br/com/dopaminamob/gpsstate/GPSStatePackage.java
cp $(pwd)/react-native-thumbnail/RNThumbnail.podspec ../node_modules/react-native-thumbnail

# js
cp $(pwd)/react-native-maps/MapView.js ../node_modules/react-native-maps/lib/components/MapView.js
cp $(pwd)/react-navigation/TabBarBottom.js ../node_modules/react-navigation/src/views/TabView/TabBarBottom.js

# json
rm ../node_modules/react-native/local-cli/core/__fixtures__/files/package.json

# fonts
cp ../fonts/FontAwesome5_Pro_Brands.ttf ../node_modules/react-native-vector-icons/Fonts
cp ../fonts/FontAwesome5_Pro_Light.ttf ../node_modules/react-native-vector-icons/Fonts
cp ../fonts/FontAwesome5_Pro_Regular.ttf ../node_modules/react-native-vector-icons/Fonts
cp ../fonts/FontAwesome5_Pro_Solid.ttf ../node_modules/react-native-vector-icons/Fonts

# output message
echo "Done!"
