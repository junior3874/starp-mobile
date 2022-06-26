import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, ImageProps, StyleSheet } from "react-native";
import { Home } from "../../pages/home";

import HomeIcon from "../../assets/home.png";
import FilledHomeIcon from "../../assets/home-filled.png";

type GetCurrentIconProps = {
  filledIcon: ImageProps;
  icon: ImageProps;
  currentState: boolean;
};

function GetCurrentIcon({
  filledIcon,
  icon,
  currentState,
}: GetCurrentIconProps) {
  return <Image source={currentState ? filledIcon : icon} />;
}
const Tab = createBottomTabNavigator();

const SCREEN_EXPECTED_COUNT = 4;
const MAX_WIDTH_BAR_ITEM = `${100 / SCREEN_EXPECTED_COUNT}%`;

const styles = StyleSheet.create({
  barStyle: {
    backgroundColor: "#242424",
    borderTopWidth: 0,
    height: 80,
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
  },
  itemBarStyle: {},
  itemBarButton: {
    paddingVertical: 16,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  itemBarItem: {
    paddingVertical: 16,
    flex: 1,
    maxWidth: MAX_WIDTH_BAR_ITEM,
    justifyContent: "center",
    alignItems: "center",
  },
  itemLabelStyle: {
    color: "white",
    marginTop: 8,
  },
});

export function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      sceneContainerStyle={styles.barStyle}
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.barStyle,
        tabBarItemStyle: styles.itemBarItem,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <GetCurrentIcon
              currentState={focused}
              icon={HomeIcon}
              filledIcon={FilledHomeIcon}
            />
          ),
          tabBarLabelStyle: styles.itemLabelStyle,
          tabBarLabel: "Inicio",
        }}
      />
    </Tab.Navigator>
  );
}
