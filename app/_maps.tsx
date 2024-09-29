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
  // 50.083608, 19.940153;
  // 50.078969, 19.971754
  const origin = { latitude: 37.78825, longitude: -122.4324 }; // Starting point
  const destination = { latitude: 37.78925, longitude: -122.4344 }; // Ending point

  // Hardcoded coordinates for the path
  // const coordinates = [
  //   { latitude: 50.083608, longitude: 19.940153 },
  //   { latitude: 37.78875, longitude: -122.433 },
  //   { latitude: 50.078969, longitude: 19.971754 },
  // ];

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
      setCoordinates([
        location,
        { latitude: coordinate[0].lat, longitude: coordinate[0].lon },
      ]);
    }
  }, []);

  // const [location, setLocation] = useState<any>();
  // const [errorMsg, setErrorMsg] = useState(String);

  // const getPermission = async () => {
  //   let { status } = await Location.requestForegroundPermissionsAsync();
  //   if (status !== "granted") {
  //     setErrorMsg("Permission to access location was denied");
  //     return;
  //   }

  //   let currentLocation = await Location.getCurrentPositionAsync({});
  //   setLocation(currentLocation);
  // };

  // let text = "Waiting..";
  // if (errorMsg) {
  //   text = errorMsg;
  //   console.log(text);
  // } else if (location) {
  //   text = `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`;
  //   console.log(text);
  // }

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
