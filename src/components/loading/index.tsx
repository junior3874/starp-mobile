import React from "react";

import { LinearGradient } from "expo-linear-gradient";

import { Image, Animated } from "react-native";

type LoadingProps = {
  animatedValue: any;
};

import Logo from "../../../assets/logo.png";
import LogoFilled from "../../../assets/logo-filled-big.png";

export function Loading({ animatedValue }: LoadingProps) {
  return (
    <LinearGradient
      colors={["#141414", "#000000"]}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{
        backgroundColor: "#4A5468",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Animated.View
        style={[
          {
            opacity: animatedValue,
          },
          {
            position: "absolute",
            left: "50%",
            top: "50%",
            zIndex: 4,
            transform: [
              {
                translateX: -50,
              },
            ],
          },
        ]}
      >
        <Image
          source={Logo}
          style={[
            {
              overflow: "hidden",
            },
          ]}
        />
      </Animated.View>

      <Image
        source={LogoFilled}
        style={{
          overflow: "hidden",
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: [
            {
              translateX: -50,
            },
          ],
        }}
      />
    </LinearGradient>
  );
}
