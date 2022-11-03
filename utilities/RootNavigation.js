// RootNavigation.js

import {
  createNavigationContainerRef,
  CommonActions,
} from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  } else {
    console.log("navigation ref is not ready yet!");
  }
}

export function goBack(params) {
  if (navigationRef.isReady()) {
    navigationRef.goBack(params);
  } else {
    console.log("navigation ref is not ready yet!");
  }
}

export function dispatch(props) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(CommonActions.reset({ ...props }));
  } else {
    console.log("navigation ref is not ready yet!");
  }
}

export function replace(params) {
  if (navigationRef.isReady()) {
    navigationRef.replace(params);
  } else {
    console.log("navigation ref is not ready yet!");
  }
}

// add other navigation functions that you need and export them
