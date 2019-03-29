# Vediohead
Vediohead is a decentralised mobile-only social media platform. It allows its users to earn cryptocurrency through app usage and sale of anonymised data.

## Vediohead Mobile App
Please read this before going through the code.

### What is this repository for?
* This is the repository for Vediohead's mobile app using React Native. The application is to be made available on both Android and iOS platforms.
* This repository is made private and public forking is **not allowed**.
* The current version stands at 1.1.0. Please refer to CHANGELOG.md for details.
* [Learn Markdown.](https://bitbucket.org/tutorials/markdowndemo)

### Who do I talk to?
* For issues or requests, please contact [k@vediohead.com](mailto:k@vediohead.com) for clarifications.

### Installation
* Firstly, do a checkout of another repository titled 'vediohead-backend-mobile', install and run the Swagger project.
* Once it is successfully running, please proceed with doing the checkout of this repository and run this command at the end.

      npm install

#### Run an iOS demo using Xcode
* Navigate to the `ios` subfolder and run the following commands to install the required pod files for Xcode.

      pod repo update
      pod install

* Run Xcode.app and open up the `ios` subfolder. Build and start the iOS Simulator. Enjoy!

#### Run an Android demo using Genymotion
* See [installation guide.](https://github.com/codepath/android_guides/wiki/Genymotion-2.0-Emulators-with-Google-Play-support)
* Run Genymotion and set up an Android virtual device.
* Always start Genymotion before running the React Native command.

      react-native run-android

_ _ _ _

### Troubleshooting
This section will provide all, if not some, help to resolve issues encountered while building and running the app demo.

##### Issue 1: Dependency graph loading stuck at 0%

    Loading dependency graph...
    Bundling `index.ios.js`  [development]  ░░░░░░░░░░░░░░░░  0.0% (0/1)

The issue may lie with [Watchman not working properly.](https://github.com/facebook/react-native/issues/15332) Run the following command to fix it. Re-installation of Watchman should help if the issue persists.

    launchctl unload -F $HOME/Library/LaunchAgents/com.github.facebook.watchman.plist

##### Issue 2: App stuck at splash screen

The issue may lie with the database connection failing to establish via the Swagger API helper. Do check to see if the Swagger project or `vediohead-backend-mobile` is running concurrently.

##### Issue 3: BUILD FAILED message encountered

    ** BUILD FAILED **

Change directory to `ios`, run updates, remove existing `pods` folder before installing from `Podfile`.

    pod repo update
    rm -rf pods
    pod install

##### Issue 4: 'FBSDKCoreKit/FBSDKCoreKit.h' file not found

The issue may lie with missing files from FacebookSDK due to the `Framework Search Paths` setting not pointing to the correct directory. See [Step 3: Add SDK to Project.](https://developers.facebook.com/docs/ios/getting-started/)

##### Issue 5: BackAndroid is deprecated

The issue will be resolved when the app is running in a production environment.

##### Issue 6: Missing links for packages installed

DO NOT run the following generic command when the added package fails to compile.

    react-native link

Instead, always specify the affected package in particular while running the link command. If the issue persists, attempt to uninstall and install the affected package.

    react-native link <package-name>
    npm uninstall <package-name>
    npm install <package-name>

##### Issue 7: Apple Mach-O Linker Error

    Apple Mach-O Linker Error - Linker command failed with exit code 1

While compiling the iOS app onto an iPhone device, the above error may occur. In this instance, the issue can be resolved by reinstalling the CocoaPods used.

Install both CocoaPods:

    sudo gem install cocoapods-deintegrate
    sudo gem install cocoapods-clean

Run this inside the folder of the project:

    pod deintegrate
    pod clean

Modify your podfile to delete any unused CocoaPods before installing:

    pod install

##### Issue 8: No response observed from bids made on the app

Ensure that the MongoDB server version is at 3.4.x for the bidding system to work properly.

    brew search mongo
    brew install mongodb@3.4
    brew unlink mongodb
    brew link --force mongodb@3.4
    brew unlink mongodb@3.4
    brew link mongodb
