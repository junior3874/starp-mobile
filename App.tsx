import React from "react";
import { StyleSheet, SafeAreaView, StatusBar } from "react-native";
import {
  useFonts,
  SpaceGrotesk_400Regular as spaceGrotesk400,
  SpaceGrotesk_700Bold as spaceGrotesk700,
  SpaceGrotesk_500Medium as spaceGrotesk500,
} from "@expo-google-fonts/space-grotesk";
import { Routes } from "./src/routes";
import { PlayerProvider } from "./src/contexts/playerContext";
import { QueueProvider } from "./src/contexts/queueContext";

export function App() {
  const [fontsLoaded] = useFonts({
    spaceGrotesk400,
    spaceGrotesk700,
    spaceGrotesk500,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <QueueProvider>
        <PlayerProvider>
          <StatusBar barStyle={"dark-content"} />
          <Routes />
        </PlayerProvider>
      </QueueProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
