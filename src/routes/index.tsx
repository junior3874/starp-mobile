import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Onboarding } from "../pages/onboarding";
import { TabNavigator } from "./tabNavigator";
import { pagesNamespaces } from "../App";

export type RootStackParamList = {
  Dashboard: undefined;
  Onboarding: undefined;
};

const AppStack = createStackNavigator<RootStackParamList>();

type RoutesProps = {
  firstPage: pagesNamespaces;
};

export function Routes({ firstPage }: RoutesProps) {
  return (
    <>
      <NavigationContainer>
        <AppStack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName={firstPage}
        >
          <AppStack.Screen name="Onboarding" component={Onboarding} />
          <AppStack.Screen name="Dashboard" component={TabNavigator} />
        </AppStack.Navigator>
      </NavigationContainer>
    </>
  );
}
