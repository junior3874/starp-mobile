import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView, StatusBar, Animated } from "react-native";
import { Routes } from "./routes";

import {
  useFonts,
  SpaceGrotesk_400Regular as spaceGrotesk400,
  SpaceGrotesk_700Bold as spaceGrotesk700,
  SpaceGrotesk_500Medium as spaceGrotesk500,
} from "@expo-google-fonts/space-grotesk";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Loading } from "./components/loading";
const STORAGE_KEY = "@starp/onboarding-has-been-seen";

export type pagesNamespaces = "Onboarding" | "Dashboard";
export default function App() {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [loading, setLoading] = useState(true);
  const [firstPage, setFirstPage] = useState<pagesNamespaces>("Onboarding");
  const [fontsLoaded] = useFonts({
    spaceGrotesk400,
    spaceGrotesk700,
    spaceGrotesk500,
  });

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 4000,
      delay: 1000,
      useNativeDriver: true,
    }).start(() => setLoading(false));
  };

  useEffect(() => {
    Promise.all([
      (async () => {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        if (!jsonValue) {
          return;
        }
        const value = JSON.parse(jsonValue);
        if (value) {
          setFirstPage("Dashboard");
        }
      })(),
    ]).finally(fadeOut);
  }, []);

  if (!fontsLoaded || loading) {
    return <Loading animatedValue={fadeAnim} />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <Routes firstPage={firstPage} />
    </SafeAreaView>
  );
}
