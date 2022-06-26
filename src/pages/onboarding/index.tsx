import React, { useRef } from "react";
import ViewPager from "react-native-pager-view";
import { View, StyleSheet } from "react-native";
import { Onboarding as OnboardingComponent } from "../../components/onboarding";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../routes";
import AsyncStorage from "@react-native-async-storage/async-storage";

import OnboardingImage0 from "../../../assets/onboarding-background-0.png";
import OnboardingImage1 from "../../../assets/onboarding-background-1.png";
import OnboardingImage2 from "../../../assets/onboarding-background-2.png";

const STORAGE_KEY = "@starp/onboarding-has-been-seen";

export function Onboarding() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const pagerRef = useRef<ViewPager>(null);

  const handlePageChange = (pageNumber: number) => {
    if (pagerRef.current) {
      pagerRef.current.setPage(pageNumber);
    }
  };

  const goToHome = () => {
    navigation.replace("Dashboard");
  };

  const handleLastPageChange = async () => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(true));
    goToHome();
  };

  return (
    <ViewPager style={{ flex: 1 }} initialPage={0} ref={pagerRef}>
      <View key="1" style={styles.container}>
        <OnboardingComponent
          title="starp."
          description="Escute seus podcasts favoritos e conheça novas histórias."
          stepValue={1}
          handleNextStep={handlePageChange}
          imageBackground={OnboardingImage0}
        />
      </View>
      <View key="2" style={styles.container}>
        <OnboardingComponent
          title="starp."
          description="Aprenda novas coisas com milhares de personalidades."
          stepValue={2}
          handleNextStep={handlePageChange}
          imageBackground={OnboardingImage1}
        />
      </View>
      <View key="3" style={styles.container}>
        <OnboardingComponent
          title="starp."
          description="Descubra os podcasts em alta e fique por dentro dos assuntos do momento."
          stepValue={3}
          handleNextStep={handleLastPageChange}
          imageBackground={OnboardingImage2}
        />
      </View>
    </ViewPager>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
