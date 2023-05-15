import {
  createNavigationContainerRef,
  DrawerActions,
  NavigationContainerRef,
  NavigationState,
  StackActions,
} from '@react-navigation/native';
import {Storage} from '@storage';
import * as React from 'react';

type RootStackParamList = {
  ROOT: any;
  PLAY_NOW: any;
  LIST_GAMES: any;
  TEST: any;
};

const debug = __DEV__;

/**
 * @description
 * set @param ENABLE_PERSIST_STATE to true to enable react navigation persist state feature.
 * By default, this feature is enabled only in development mode.
 * @see https://reactnavigation.org/docs/state-persistence
 */
const ENABLE_PERSIST_STATE = __DEV__;
const PERSISTENCE_KEY = 'NAVIGATION_STATE_V1';

class NavigationServiceC {
  static instance: any = null;
  navigationRef = createNavigationContainerRef();
  prevRouteKey: any;
  currRouteKey: any;
  queues: {
    name: SCREENS;
    params?: Object;
    action: 'push' | 'navigate' | 'replace';
  }[] = [];
  isOpenDrawer: boolean = false;

  constructor() {
    if (!NavigationServiceC.instance) {
      NavigationServiceC.instance = this;
    }
    return NavigationServiceC.instance;
  }

  getInitialState() {
    if (ENABLE_PERSIST_STATE) {
      const state = Storage.getString(PERSISTENCE_KEY);
      if (state) {
        return JSON.parse(state);
      }
    }
    return undefined;
  }

  onStateChange = (_state: NavigationState | undefined) => {
    debug &&
      console.log(
        '{Logger} -> file: NavigationService.ts -> line 39 -> NavigationServiceC -> state',
        _state,
      );

    const currentRouteKey = this.navigationRef.current?.getCurrentRoute()?.key;

    if (this.prevRouteKey !== currentRouteKey) {
      // new screen was viewed;
    }
    this.prevRouteKey = currentRouteKey;

    if (ENABLE_PERSIST_STATE) {
      Storage.set(PERSISTENCE_KEY, JSON.stringify(_state));
    }
  };

  getCurrentRoute = () => {
    return this.navigationRef.current?.getCurrentRoute();
  };

  onReady = () => {
    debug && console.log('NavigationService -> onReady');
    // SplashPage --> MainApp doesn't trigger navigationState change.

    if (this.queues.length > 0) {
      debug &&
        console.log('NavigationService -> onReady -> execute queues', [
          ...this.queues,
        ]);

      this.queues.forEach(({name, params, action}) => {
        if (action === 'push') {
          this.push(name, params);
        } else {
          this.navigate(name, params);
        }
      });
      this.queues = [];
    }
  };

  navigate = (screen: SCREENS, params?: Object) => {
    if (this.navigationRef.current?.isReady()) {
      // @ts-ignore
      this.navigationRef.current?.navigate(screen, params);
    } else {
      this.queues.push({name: screen, params, action: 'navigate'});
    }
  };

  push = (screen: SCREENS, params?: Object) => {
    if (this.navigationRef.current?.isReady()) {
      this.navigationRef.current?.dispatch(StackActions.push(screen, params));
    } else {
      this.queues.push({name: screen, params, action: 'push'});
    }
  };

  replace = (screen: SCREENS, params?: Object) => {
    if (this.navigationRef.current?.isReady()) {
      this.navigationRef.current?.dispatch(
        StackActions.replace(screen, params),
      );
    } else {
      this.queues.push({name: screen, params, action: 'replace'});
    }
  };

  openDrawer = () => {
    this.navigationRef.current?.dispatch(DrawerActions.openDrawer());
  };

  toogleDrawer = () => {
    if (!this.isOpenDrawer) {
      // tracking drawer is open;
    }
    this.navigationRef.current?.dispatch(DrawerActions.toggleDrawer());
  };

  goBack = () => {
    if (this.navigationRef.current?.canGoBack()) {
      return this.navigationRef.current?.goBack();
    }
  };

  getNavigationRef = () => {
    return this.navigationRef.current;
  };
}

/**
 * NavigationService for navigation route control.
 * - queues navigation.
 * - manages navigation state.
 * - manages navigation route change: push, navigate, goBack;
 * - manages navigation state persistence.
 * - manages navigation state restoration.
 *
 */
export const NavigationService = new NavigationServiceC();
