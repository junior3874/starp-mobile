import React from "react";
import { Text, Image, StyleSheet, TouchableOpacity } from "react-native";

type RecommendedPodcastProps = {
  image?: string;
  artist: string;
  onPress: () => void;
};

const _styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  artistText: {
    fontFamily: "spaceGrotesk400",
    fontSize: 18,
    color: "#FFF",
  },
});

export function RecommendedPodcast({
  artist,
  image,
  onPress,
}: RecommendedPodcastProps) {
  return (
    <TouchableOpacity style={_styles.container} onPress={onPress}>
      <Image
        style={{
          width: 120,
          height: 120,
          marginBottom: 16,
          borderRadius: 10,
        }}
        source={{
          uri: "https://pbs.twimg.com/profile_images/1429922301148008450/DjeYQb1d_400x400.jpg",
        }}
      />
      <Text style={_styles.artistText}>{artist}</Text>
    </TouchableOpacity>
  );
}
