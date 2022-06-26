import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Star from "../../assets/star.png";
import Headphones from "../../assets/headphones.png";
import Clock from "../../assets/clock.png";
import MoreVertical from "../../assets/more-vertical.png";

type MostListenedPodcastProps = {
  title: string;
  artist: string;
  length: string;
  timesListened: string;
  timesStarred: string;
  image?: string;
  onPress: () => void;
};

export function MostListenedPodcast({
  artist,
  length,
  timesListened,
  timesStarred,
  title,
  onPress,
  image = "https://i.ytimg.com/vi/kU4ZEyWVwn8/maxresdefault.jpg",
}: MostListenedPodcastProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <LinearGradient
        colors={["#141414", "#050505"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.content}
      >
        <View style={styles.topContent}>
          <Image
            style={{
              width: "30%",
              height: "auto",
              marginRight: 16,
              borderRadius: 10,
            }}
            source={{
              uri: "https://i.ytimg.com/vi/kU4ZEyWVwn8/maxresdefault.jpg",
            }}
          />
          <View>
            <Text style={styles.titleText}>{title}</Text>
            <Text style={styles.artistText}>{artist}</Text>
          </View>
        </View>
        <View style={styles.footerContent}>
          <View style={styles.relatedInformationsContent}>
            <View style={styles.relatedInformationsItem}>
              <Image source={Clock} />
              <Text style={styles.footerText}>{length}</Text>
            </View>
            <View style={styles.relatedInformationsItem}>
              <Image source={Headphones} />
              <Text style={styles.footerText}>{timesListened}</Text>
            </View>
            <View style={styles.relatedInformationsItem}>
              <Image source={Star} />
              <Text style={styles.footerText}>{timesStarred}</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Image source={MoreVertical} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: "#141414",
    borderColor: "#333333",
    borderWidth: 1,
    borderRadius: 10,
    padding: 24,
  },
  topContent: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  titleText: {
    marginBottom: 4,
    fontFamily: "spaceGrotesk400",
    fontSize: 18,
    color: "#FFF",
    flexShrink: 1,
    width: "80%",
  },
  artistText: {
    marginBottom: 4,
    fontFamily: "spaceGrotesk500",
    fontSize: 12,
    color: "#767676",
  },
  footerContent: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  footerText: {
    color: "#767676",
    fontFamily: "spaceGrotesk500",
    fontSize: 12,
    marginLeft: 8,
  },
  relatedInformationsContent: {
    flexDirection: "row",
  },
  relatedInformationsItem: {
    flexDirection: "row",
    marginRight: 16,
  },
});
