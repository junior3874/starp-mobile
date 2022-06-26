import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  StyleSheet,
} from "react-native";

import Logo from "../../../assets/logo-fill.png";
import Bell from "../../../assets/bell.png";
import ArrowRight from "../../../assets/arrow-right.png";

import { MostListenedPodcast } from "../../components/mostListenedPodcast";
import { RecommendedPodcast } from "../../components/recomendedPodcast";
import { FollowingPodcast } from "../../components/followingPodcast";

import PaddingOnSidesView from "../../hoc/PaddingOnSidesView";

const MOST_LISTENED_DATA = [
  {
    id: "0",
    title: "LUCAS INUTILISMO - Podpah #404",
    artist: "Flow Podcast",
    length: "1:24h",
    timesListened: "407K",
    timesStarred: "65K",
  },
  {
    id: "1",
    title: "LUCAS INUTILISMO - Podpah #404",
    artist: "Flow Podcast",
    length: "1:24h",
    timesListened: "407K",
    timesStarred: "65K",
  },
];

const RECOMMENDED_DATA = [
  {
    id: "0",
    artist: "Flow Podcast",
  },
  {
    id: "1",
    artist: "Flow Podcast",
  },
];

export function Home() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerView}>
        <View style={styles.headerViewFlex}>
          <Image source={Logo} />
          <Image source={Bell} />
        </View>

        <Text style={styles.headerViewTitle}>
          Olá, <Text style={styles.headerViewTitleSpan}>Jonas</Text>
        </Text>
        <Text style={styles.headerViewSubtitle}>
          O que deseja escutar hoje?
        </Text>
      </View>

      <View style={styles.sectionView}>
        <View style={styles.sectionViewFlex}>
          <Text style={styles.sectionViewTitle}>Em alta</Text>
          <View style={styles.seeMoreView}>
            <Text style={styles.seeMoreText}>ver todos</Text>
            <Image style={styles.seeMoreIcon} source={ArrowRight} />
          </View>
        </View>

        <FlatList
          horizontal={true}
          data={MOST_LISTENED_DATA}
          renderItem={({ item, index }) => (
            <PaddingOnSidesView
              data={MOST_LISTENED_DATA}
              index={index}
              paddingAmount={24}
            >
              <MostListenedPodcast
                artist={item.artist}
                length={item.length}
                timesListened={item.timesListened}
                timesStarred={item.timesStarred}
                title={item.title}
              />
            </PaddingOnSidesView>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator}></View>}
          keyExtractor={(item) => item.id}
        />
      </View>

      <View style={[styles.sectionView, { paddingVertical: 0 }]}>
        <View style={styles.sectionViewFlex}>
          <Text style={styles.sectionViewTitle}>Recomendados</Text>
          <View style={styles.seeMoreView}>
            <Text style={styles.seeMoreText}>ver todos</Text>
            <Image style={styles.seeMoreIcon} source={ArrowRight} />
          </View>
        </View>

        <FlatList
          horizontal={true}
          data={RECOMMENDED_DATA}
          renderItem={({ item, index }) => (
            <PaddingOnSidesView
              data={RECOMMENDED_DATA}
              index={index}
              paddingAmount={24}
            >
              <RecommendedPodcast artist={item.artist} />
            </PaddingOnSidesView>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator}></View>}
          keyExtractor={(item) => item.id}
        />
      </View>

      <View style={[styles.sectionView, { paddingRight: 24 }]}>
        <View style={[styles.sectionViewFlex, { paddingRight: 0 }]}>
          <Text style={styles.sectionViewTitle}>Seguindo</Text>
          <View style={styles.seeMoreView}>
            <Text style={styles.seeMoreText}>ver todos</Text>
            <Image style={styles.seeMoreIcon} source={ArrowRight} />
          </View>
        </View>

        {[
          {
            id: "0",
            title: "Mano a Mano | Mano Brown recebe Lula",
            artist: "Mano a Mano",
            length: "2:03h",
            releaseDate: "13 de abr. de 2022",
          },
          {
            id: "1",
            title: "Mano a Mano | Mano Brown recebe Lula",
            artist: "Mano a Mano",
            length: "2:03h",
            releaseDate: "13 de abr. de 2022",
          },
        ].map((item, index) => (
          <View
            key={item.id}
            style={{ marginTop: index > 0 ? 24 : 0, marginLeft: 24 }}
          >
            <FollowingPodcast
              artist={item.artist}
              title={item.title}
              length={item.length}
              releaseDate={item.releaseDate}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#141414" },
  headerView: {
    paddingHorizontal: 24,
    paddingVertical: 48,
    backgroundColor: "#1C1C1C",
  },
  headerViewFlex: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerViewTitle: {
    marginTop: 48,
    color: "#FFF",
    fontFamily: "spaceGrotesk500",
    fontSize: 20,
  },
  headerViewTitleSpan: {
    color: "#8338EC",
    fontFamily: "spaceGrotesk500",
    fontSize: 20,
  },
  headerViewSubtitle: {
    marginTop: 8,
    color: "#767676",
    fontFamily: "spaceGrotesk500",
    fontSize: 18,
  },
  sectionView: {
    paddingVertical: 48,
  },
  sectionViewFlex: {
    paddingHorizontal: 24,
    marginBottom: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionViewTitle: {
    color: "#FFFFFF",
    fontFamily: "spaceGrotesk500",
    fontSize: 20,
  },
  seeMoreView: {
    flexDirection: "row",
    alignItems: "center",
  },
  seeMoreText: {
    color: "#767676",
    fontFamily: "spaceGrotesk400",
    fontSize: 16,
  },
  seeMoreIcon: {
    marginTop: 4,
    marginLeft: 6,
  },
  separator: {
    width: 24,
  },
});
