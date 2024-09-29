import { Dimensions, StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker, Polyline } from "react-native-maps";
import SearchBar from "@/components/SearchBar";
import { Link } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";

export default function MapsScreen() {
  const region = {
    latitude: 50.0647,
    longitude: 19.945,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };
  const { width, height } = Dimensions.get("window");
  // 50.083608, 19.940153;
  // 50.078969, 19.971754
  const origin = { latitude: 37.78825, longitude: -122.4324 }; // Starting point
  const destination = { latitude: 37.78925, longitude: -122.4344 }; // Ending point

  // Hardcoded coordinates for the path
  const coordinates = [
    { latitude: 50.083608, longitude: 19.940153 },
    { latitude: 37.78875, longitude: -122.433 },
    { latitude: 50.078969, longitude: 19.971754 },
  ];

  return (
    <SafeAreaView>
      <View style={[styles.container, { width, height }]}>
        <MapView style={styles.map} initialRegion={region} showsUserLocation>
          <Marker coordinate={origin} title="Start" />
          <Marker coordinate={destination} title="End" />
          <Polyline
            coordinates={coordinates}
            strokeWidth={4}
            strokeColor="blue"
          />
        </MapView>
        <Link href="../" style={styles.backButton}>
          <Ionicons name="arrow-back-circle" size={47} color="#525252" />
        </Link>
        <View style={styles.searchBarBerground}>
          <SearchBar
            onSearch={(newTerm) => console.log(newTerm)}
            highContrast
            style={{ margin: 10 }}
            redirects
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  backButton: {
    alignSelf: "flex-start",
    margin: 10,
  },
  searchBarBerground: {
    position: "absolute",
    bottom: 52,
    height: 110,
    width: "100%",
    backgroundColor: "white",
  },
});
