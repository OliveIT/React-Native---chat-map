package com.vediohead;

import android.app.Application;
import android.support.multidex.MultiDexApplication;
import br.com.dopaminamob.gpsstate.GPSStatePackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.evollu.react.fcm.FIRMessagingPackage;
import com.heanoria.library.reactnative.locationenabler.RNAndroidLocationEnablerPackage;
import com.imagepicker.ImagePickerPackage;
import com.microsoft.codepush.react.CodePush;
import com.mustansirzia.fused.FusedLocationPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactlibrary.googlesignin.RNGoogleSignInPackage;
import com.reactlibrary.RNThumbnailPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.rnim.rn.audio.ReactNativeAudioPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.zmxv.RNSound.RNSoundPackage;
import com.wix.autogrowtextinput.AutoGrowTextInputPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import org.reactnative.camera.RNCameraPackage;
import io.sentry.RNSentryPackage;
// Facebook packages
import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.appevents.AppEventsLogger;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
// Firebase packages
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
// import io.invertase.firebase.admob.RNFirebaseAdMobPackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import io.invertase.firebase.config.RNFirebaseRemoteConfigPackage;
import io.invertase.firebase.database.RNFirebaseDatabasePackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.perf.RNFirebasePerformancePackage;
import io.invertase.firebase.storage.RNFirebaseStoragePackage;
import io.invertase.firebase.fabric.crashlytics.RNFirebaseCrashlyticsPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends MultiDexApplication implements ReactApplication {
  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();
  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }
  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected String getJSBundleFile() {
      return CodePush.getJSBundleFile();
    }

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new GPSStatePackage(),
          new RNAndroidLocationEnablerPackage(),
          new RNCameraPackage(),
          new RNGestureHandlerPackage(),
          new RNGoogleSignInPackage(),
          new RNFetchBlobPackage(),
          new RNSentryPackage(),
          new RNSoundPackage(),
          new RNThumbnailPackage(),
          new ReactNativeAudioPackage(),
          new ReactVideoPackage(),
          new MapsPackage(),
          new FusedLocationPackage(),
          new AutoGrowTextInputPackage(),
          new ImagePickerPackage(),
          new SplashScreenReactPackage(),
          new VectorIconsPackage(),
          new FBSDKPackage(mCallbackManager),
          new CodePush(null, getApplicationContext(), BuildConfig.DEBUG),
          new FIRMessagingPackage(),
          new RNFirebasePackage(),
          // new RNFirebaseAdMobPackage(),
          new RNFirebaseAnalyticsPackage(),
          new RNFirebaseAuthPackage(),
          new RNFirebaseCrashlyticsPackage(),
          new RNFirebaseDatabasePackage(),
          new RNFirebaseMessagingPackage(),
          new RNFirebaseNotificationsPackage(),
          new RNFirebasePerformancePackage(),
          new RNFirebaseRemoteConfigPackage(),
          new RNFirebaseStoragePackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() { // <-- Check this block exists
    super.onCreate();
    FacebookSdk.sdkInitialize(getApplicationContext());
    AppEventsLogger.activateApp(this);
    SoLoader.init(this, /* native exopackage */ false); // <-- Check this line exists within the block
  }
}
