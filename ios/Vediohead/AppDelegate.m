/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import <Firebase.h>
#import <Fabric/Fabric.h>
#import <Crashlytics/Crashlytics.h>
#import <CodePush/CodePush.h>

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

#if __has_include(<React/RNSentry.h>)
#import <React/RNSentry.h> // This is used for versions of react >= 0.40
#else
#import "RNSentry.h" // This is used for versions of react < 0.40
#endif

#import <React/RCTLinkingManager.h>
#import "SplashScreen.h"
#import <FBSDKCoreKit/FBSDKCoreKit.h>
#import <FBSDKLoginKit/FBSDKLoginKit.h>
#import "RNFirebaseNotifications.h"
#import "RNFIRMessaging.h"
#if RCT_DEV
#import <React/RCTDevLoadingView.h>
#endif

@import GoogleMaps;
@import UserNotifications;
@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSString *filePath = [[NSBundle mainBundle] pathForResource:@"GoogleService-Info" ofType:@"plist"];
  NSDictionary *plistDict = [NSDictionary dictionaryWithContentsOfFile:filePath];
  NSURL *jsCodeLocation;

  [FIRApp configure];
  [GIDSignIn sharedInstance].clientID = [plistDict objectForKey:@"CLIENT_ID"];
  [GMSServices provideAPIKey:@"AIzaSyA8dVdplPdykDGTasEBbTQVUqlldGxemr8"];

  #ifdef DEBUG
      jsCodeLocation = [[RCTBundleURLProvider sharedSettings]
                        jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
  #else
      jsCodeLocation = [CodePush bundleURL];
  #endif
  RCTRootView *rootView = [
    [RCTRootView alloc]
    initWithBundleURL:jsCodeLocation
    moduleName:@"Vediohead"
    initialProperties:nil
    launchOptions:launchOptions
  ];

  [RNSentry installWithRootView:rootView];

  rootView.backgroundColor = [
    [UIColor alloc]
    initWithRed:1.0f
    green:1.0f
    blue:1.0f
    alpha:1
  ];

  self.window = [
    [UIWindow alloc]
    initWithFrame:[UIScreen mainScreen].bounds
  ];

  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  [SplashScreen show];

  [[FBSDKApplicationDelegate sharedInstance]
    application:application
    didFinishLaunchingWithOptions:launchOptions
  ];
  [Fabric with:@[[Crashlytics class]]];
  
  [[UNUserNotificationCenter currentNotificationCenter] setDelegate:self];
  return YES;
}

- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
  BOOL handled = [
    [GIDSignIn sharedInstance]
    handleURL:url
    sourceApplication:options[UIApplicationOpenURLOptionsSourceApplicationKey]
    annotation:options[UIApplicationOpenURLOptionsAnnotationKey]
  ];
  BOOL handledFacebook = [[FBSDKApplicationDelegate sharedInstance]
            application:application
                openURL:url
      sourceApplication:options[UIApplicationOpenURLOptionsSourceApplicationKey]
             annotation:options[UIApplicationOpenURLOptionsAnnotationKey]];

  return handled || handledFacebook || [RCTLinkingManager application:application openURL:url options:options];
}

// Facebook SDK
- (void)applicationDidBecomeActive:(UIApplication *)application {
  [FBSDKAppEvents activateApp];
}
// Deprecated from iOS 9.0 onwards
//- (BOOL)application:(UIApplication *)application
//  openURL:(NSURL *)url
//  sourceApplication:(NSString *)sourceApplication
//  annotation:(id)annotation {
//  return [[FBSDKApplicationDelegate sharedInstance]
//    application:application
//    openURL:url
//    sourceApplication:sourceApplication
//    annotation:annotation
//    ] || [[GIDSignIn sharedInstance]
//    handleURL:url
//    sourceApplication:sourceApplication
//    annotation:annotation
//  ];
//}
- (void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(nonnull UNNotification *)notification withCompletionHandler:(nonnull void (^)(UNNotificationPresentationOptions))completionHandler {
  NSLog(@"notification %@", notification);
  [RNFIRMessaging willPresentNotification:notification withCompletionHandler:completionHandler];
}
// You can skip this method if you don't want to use local notification
-(void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification {
  NSLog(@"notification %@", notification);
  [RNFIRMessaging didReceiveLocalNotification:notification];
}
#if defined(__IPHONE_11_0)
- (void)userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)(void))completionHandler {
  NSLog(@"notification %@", response);
  [RNFIRMessaging didReceiveNotificationResponse:response withCompletionHandler:completionHandler];
}
#else
- (void)userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void(^)())completionHandler{
  NSLog(@"notification %@", response);
  [RNFIRMessaging didReceiveNotificationResponse:response withCompletionHandler:completionHandler];
}
#endif

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(nonnull NSDictionary *)userInfo fetchCompletionHandler:(nonnull void (^)(UIBackgroundFetchResult))completionHandler{
  NSLog(@"notification %@", userInfo);
  [RNFIRMessaging didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
}



@end
