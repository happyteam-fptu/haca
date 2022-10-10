// RootNavigation.js

import {
  createNavigationContainerRef,
  CommonActions,
} from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export function goBack(params) {
  if (navigationRef.isReady()) {
    navigationRef.goBack(params);
  }
}

export function dispatch(props) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(CommonActions.reset({ ...props }));
  }
}

export function replace(params) {
  if (navigationRef.isReady()) {
    navigationRef.replace(params);
  }
}

// add other navigation functions that you need and export them
