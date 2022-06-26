import React from "react";

import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

import MoreVertical from "../../assets/more-vertical.png";

type FollowingPodcastProps = {
  image?: string;
  title: string;
  artist: string;
  length: string;
  releaseDate: string;
  onPress: () => void;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  contentFlex: {
    flex: 1,
    flexDirection: "row",
  },
  titleText: {
    fontFamily: "spaceGrotesk500",
    fontSize: 14,
    color: "#FFFFFF",
    marginBottom: 4,
    width: "85%",
  },
  genericText: {
    fontFamily: "spaceGrotesk400",
    fontSize: 12,
    color: "#767676",
  },
  midContentTextWrapper: {
    width: "80%",
    marginBottom: 4,
  },
  textWrapper: {
    justifyContent: "center",
  },
});

export function FollowingPodcast({
  title,
  artist,
  length,
  releaseDate,
  image,
  onPress,
}: FollowingPodcastProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.contentFlex}>
        <Image
          style={{
            width: 88,
            height: 88,
            borderRadius: 10,
            marginRight: 16,
          }}
          source={{
            uri: "https://www.folhadaregiao.com.br/wp-content/uploads/2021/08/PodcastManoBrownDIVULGACAO.jpg",
          }}
        />
        <View style={styles.textWrapper}>
          <Text style={styles.titleText}>{title}</Text>

          <View style={styles.midContentTextWrapper}>
            <Text style={styles.genericText}>
              {artist} • {length}
            </Text>
          </View>
          <Text style={[styles.genericText, { fontFamily: "spaceGrotesk500" }]}>
            {releaseDate}
          </Text>
        </View>
      </View>

      <Image source={MoreVertical} />
    </TouchableOpacity>
  );
}
