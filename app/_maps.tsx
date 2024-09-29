import { Dimensions, StyleSheet, View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker, Polyline } from "react-native-maps";
import SearchBar from "@/components/SearchBar";
import { Link } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useRef, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import * as Location from "expo-location";

export default function MapsScreen() {
  const { width, height } = Dimensions.get("window");
  const origin = { latitude: 37.78825, longitude: -122.4324 }; // Starting point
  const destination = { latitude: 37.78925, longitude: -122.4344 }; // Ending point

  const { cords } = useLocalSearchParams<{ cords: string }>();

  // Parse the 'cords' parameter since it's passed as a JSON string
  const coordinate = cords ? JSON.parse(cords) : [];

  const location = { latitude: 50.083608, longitude: 19.940153 };
  const [region, setRegion] = useState({
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  const [coordinates, setCoordinates] = useState<any>([]);

  useEffect(() => {
    if (coordinate?.[0]?.lat != undefined) {
      setRegion({
        latitude: coordinate[0].lat,
        longitude: coordinate[0].lon,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
      const presentationCordinats = [
        { longitude: 19.9440906, latitude: 50.061225 },
        { longitude: 19.9437044, latitude: 50.0607705 },
        { longitude: 19.9426637, latitude: 50.0599922 },
        { longitude: 19.9419556, latitude: 50.0600817 },
        { longitude: 19.9416659, latitude: 50.0599715 },
        { longitude: 19.9413119, latitude: 50.0603572 },
        { longitude: 19.9401639, latitude: 50.0607773 },
        { longitude: 19.939842, latitude: 50.0608393 },
        { longitude: 19.9397025, latitude: 50.0608393 },
        { longitude: 19.9383078, latitude: 50.0613008 },
        { longitude: 19.9377284, latitude: 50.0605845 },
        { longitude: 19.9376426, latitude: 50.0605432 },
        { longitude: 19.937428, latitude: 50.0607291 },
        { longitude: 19.9371169, latitude: 50.0609289 },
        { longitude: 19.9366877, latitude: 50.0610735 },
        { longitude: 19.9364517, latitude: 50.0607705 },
        { longitude: 19.936323, latitude: 50.0605363 },
        { longitude: 19.9362586, latitude: 50.0603434 },
        { longitude: 19.9362586, latitude: 50.060247 },
      ];

      setCoordinates([
        location,
        { latitude: coordinate[0].lat, longitude: coordinate[0].lon },
      ]);
    }
  }, []);

  return (
    <SafeAreaView>
      <View style={[styles.container, { width, height }]}>
        <MapView style={styles.map} initialRegion={region} showsUserLocation>
          {!!coordinate?.[0]?.lat && (
            <Marker
              coordinate={{
                latitude: coordinate[0].lat,
                longitude: coordinate[0].lon,
              }}
              pinColor={"#dc1619"} // any color
              title={"Destination"}
              description={"GG"}
            />
          )}
          {/* <Marker coordinate={destination} title="End" /> */}
          {!!coordinate?.[0]?.lon && (
            <Polyline
              coordinates={coordinates}
              strokeWidth={4}
              strokeColor="blue"
            />
          )}
        </MapView>
        <Link href="../" style={styles.backButton}>
          <Ionicons name="arrow-back-circle" size={47} color="#898989" />
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
