import React from 'react';
import {
  Appodeal,
  AppodealAdType,
  AppodealSdkEvent,
  AppodealRewardedEvent,
  AppodealInterstitialEvent,
  AppodealBanner,
} from 'react-native-appodeal';

export {AppodealAdType};

const adTypes =
  AppodealAdType.INTERSTITIAL |
  AppodealAdType.REWARDED_VIDEO |
  AppodealAdType.BANNER;

class AppodealAdsC implements IService {
  private inited = false;
  static instance: AppodealAdsC;

  loadedRandom: number = -1;
  constructor() {
    if (!AppodealAdsC.instance) {
      this.init();
      AppodealAdsC.instance = this;
    }
    return AppodealAdsC.instance;
  }

  init = async (): PVoid => {
    if (!this.inited) {
      await this.initAppodeal();
      this.inited = true;
    }
  };

  initAppodeal = async () => {
    return new Promise<void>((resolve, reject) => {
      Appodeal.addEventListener(AppodealSdkEvent.INITIALIZED, () => {
        resolve();
      });
      if (__DEV__) {
        Appodeal.setTesting(false);
      } else {
        Appodeal.setTesting(false);
      }
      Appodeal.setAutoCache(AppodealAdType.INTERSTITIAL, true);
      Appodeal.setAutoCache(AppodealAdType.REWARDED_VIDEO, true);

      Appodeal.initialize(
        '55857a8eabf93d1a1ac8b5c356a70459a2d6f55b746e2dde',
        adTypes,
      );
    });
  };

  dispose = () => {};

  showInterstitial = async () => {
    return new Promise<void>((resolve, reject) => {
      Appodeal.addEventListener(AppodealInterstitialEvent.CLOSED, () => {
        resolve();
      });
      Appodeal.show(AppodealAdType.INTERSTITIAL);
      this.loadedRandom = -1;
    });
  };

  showRewardedVideo = async () => {
    return new Promise<void>((resolve, reject) => {
      Appodeal.addEventListener(AppodealRewardedEvent.CLOSED, () => {
        resolve();
      });
      Appodeal.show(AppodealAdType.REWARDED_VIDEO);
      this.loadedRandom = -1;
    });
  };

  showBanner = async () => {
    Appodeal.show(AppodealAdType.BANNER_BOTTOM);
  };

  hideBanner = async () => {
    Appodeal.hide(AppodealAdType.BANNER_TOP);
  };

  loadInterstitial = async () => {
    return new Promise<void>((resolve, reject) => {
      Appodeal.addEventListener(AppodealInterstitialEvent.LOADED, () => {
        resolve();
      });
      Appodeal.cache(AppodealAdType.INTERSTITIAL);
    });
  };

  isLoaded = async (adType: typeof adTypes) => {
    return Appodeal.isLoaded(adType);
  };

  loadRewardedVideo = async () => {
    return new Promise<void>((resolve, reject) => {
      Appodeal.addEventListener(AppodealRewardedEvent.LOADED, () => {
        resolve();
      });
      Appodeal.cache(AppodealAdType.REWARDED_VIDEO);
    });
  };

  loadRandomAds = async () => {
    return new Promise<void>(async (resolve, reject) => {
      let isRewardedVideo = Math.random() < 0.5;
      if (isRewardedVideo) {
        this.loadedRandom = AppodealAdType.REWARDED_VIDEO;
        await this.loadRewardedVideo();
      } else {
        this.loadedRandom = AppodealAdType.INTERSTITIAL;
        await this.loadInterstitial();
      }
    });
  };

  showRandomAds = async () => {
    switch (this.loadedRandom) {
      case AppodealAdType.REWARDED_VIDEO:
        return this.showRewardedVideo();
      case AppodealAdType.INTERSTITIAL:
        return this.showInterstitial();
      default:
        return new Promise<void>((resolve, reject) => {
          resolve();
        });
    }
  };

  addEventListener = (event: string, callback: () => void) => {
    Appodeal.addEventListener(event, callback);
  };

  removeEventListener = (event: string, callback: () => void) => {
    Appodeal.removeEventListener(event, callback);
  };

  Banner = () => {
    return (
      <AppodealBanner
        style={{
          height: 50,
          width: '100%',
          backgroundColor: 'hsl(0, 0%, 97%)',
          alignContent: 'stretch',
        }}
        adSize={'phone'}
        usesSmartSizing
      />
    );
  };
}

export const AppodealAds = new AppodealAdsC();
