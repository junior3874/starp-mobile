import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  StatusBar,
  ImageSourcePropType,
} from "react-native";

type OnboardingProps = {
  title: string;
  description: string;
  stepValue: number;
  handleNextStep: (stepValue: number) => void;
  imageBackground: ImageSourcePropType;
};

import Logo from "../../assets/logo.png";

export function Onboarding({
  description,
  stepValue,
  title,
  handleNextStep,
  imageBackground,
}: OnboardingProps) {
  const screenHeight =
    Dimensions.get("screen").height - (StatusBar.currentHeight || 0);
  const windowHeight = Dimensions.get("window").height;
  const navbarHeight = screenHeight - windowHeight;

  const sixtyPercentScreenHeight = screenHeight * 0.6;
  const fortyPercentScreenHeight = screenHeight * 0.4 - navbarHeight;

  return (
    <View>
      <ImageBackground
        resizeMode="cover"
        source={imageBackground}
        style={[styles.headerContent, { height: sixtyPercentScreenHeight }]}
      >
        <View style={styles.headerFlex}>
          <Image source={Logo} width={24} height={24} />
          <TouchableOpacity>
            <Text style={styles.skipButton}>Pular</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <View style={[styles.mainContent, { height: fortyPercentScreenHeight }]}>
        <View style={styles.textWrapper}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.descriptionText}>{description}</Text>
        </View>

        <View style={styles.stepControlArea}>
          <View style={styles.stepControlProgressStatus}>
            <View
              style={[
                ...stepControlProgressDotStyle(stepValue, 1),
                { marginLeft: 0 },
              ]}
            />
            <View style={stepControlProgressDotStyle(stepValue, 2)} />
            <View style={stepControlProgressDotStyle(stepValue, 3)} />
          </View>

          <TouchableOpacity
            style={styles.nextStepButton}
            onPress={() => handleNextStep(stepValue)}
          >
            <Text style={styles.nextButtonText}>Avançar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  headerContent: {
    paddingHorizontal: 24,
    paddingTop: 48,
  },
  headerFlex: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  skipButton: {
    fontSize: 18,
    fontWeight: "400",
    color: "#ffffff",
  },
  nextStepButton: {
    width: 177,
    height: 55,
    borderRadius: 10,
    backgroundColor: "#8338EC",
    alignItems: "center",
    justifyContent: "center",
  },
  nextButtonText: {
    color: "#FFF",
    fontFamily: "spaceGrotesk500",
    fontSize: 18,
    lineHeight: 23,
  },
  backgroundArea: {},
  mainContent: {
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 48,
    paddingBottom: 48,
    justifyContent: "space-between",
  },
  textWrapper: {
    width: "80%",
  },
  stepControlArea: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  stepControlProgressStatus: {
    flexDirection: "row",
  },
  stepControlProgressDot: {
    height: 14,
    width: 14,
    backgroundColor: "#CBD2E0",
    borderRadius: 3,
    marginLeft: 8,
  },
  stepControlProgressActive: {
    width: 24,
    backgroundColor: "#141414",
  },
  titleText: {
    fontStyle: "normal",
    fontSize: 20,
    lineHeight: 26,
    color: "#8338EC",
    fontFamily: "spaceGrotesk700",
    marginBottom: 8,
  },
  descriptionText: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 18,
    lineHeight: 26,
    color: "#141414",
    fontFamily: "spaceGrotesk400",
  },
});

function stepControlProgressDotStyle(
  currentStepValue: number,
  stepValue: number
) {
  const returnedStyles = [styles.stepControlProgressDot];
  if (currentStepValue === stepValue) {
    returnedStyles.push(styles.stepControlProgressActive);
  }
  return returnedStyles;
}
