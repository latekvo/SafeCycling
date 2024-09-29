import { Dimensions, StyleSheet, View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker, Polyline } from "react-native-maps";
import SearchBar from "@/components/SearchBar";
import { Link } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";

export default function MapsScreen() {
  const { width, height } = Dimensions.get("window");

  const { cords: coordinateJson } = useLocalSearchParams<{ cords: string }>();

  const location = { latitude: 50.061225, longitude: 19.9440906 };

  // Parse the 'cords' parameter since it's passed as a JSON string
  const destinationCoordinate = JSON.parse(
    coordinateJson ?? JSON.stringify([location])
  )[0];

  const [region, setRegion] = useState({
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  const [coordinates, setCoordinates] = useState<any>([]);

  useEffect(() => {
    if (destinationCoordinate.lat) {
      setRegion({
        latitude: destinationCoordinate.lat,
        longitude: destinationCoordinate.lon,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });

      const presentationCordinates = [
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

      const areSimilar = (
        a: number,
        b: number,
        treshold: number = 0.006
      ): boolean => Math.abs(a - b) < treshold;

      // pathfinding demo
      if (
        areSimilar(
          presentationCordinates.at(-1)!!.latitude,
          destinationCoordinate.lat
        ) &&
        areSimilar(
          presentationCordinates.at(-1)!!.longitude,
          destinationCoordinate.lon
        )
      ) {
        setCoordinates(presentationCordinates);
      } else {
        // straight line from fixed point to destination
        setCoordinates([
          location,
          {
            latitude: destinationCoordinate.lat,
            longitude: destinationCoordinate.lon,
          },
        ]);
      }
    }
  }, []);

  return (
    <SafeAreaView>
      <View style={[styles.container, { width, height }]}>
        <MapView style={styles.map} initialRegion={region} showsUserLocation>
          {destinationCoordinate.lat && (
            <Marker
              coordinate={{
                latitude: destinationCoordinate.lat,
                longitude: destinationCoordinate.lon,
              }}
              title={"Destination"}
              description={"GG"}
            />
          )}
          {destinationCoordinate.lon && (
            <Polyline
              coordinates={coordinates}
              strokeWidth={4}
              strokeColor="blue"
            />
          )}
          <Marker
            coordinate={{
              latitude: 50.06545,
              longitude: 19.93704,
            }}
            title={"Heavy pedestrian traffic!"}
            description={"Heavy pedestrian traffic in the area!"}
          >
            <Text style={{ fontSize: 35 }}>⚠️</Text>
          </Marker>
          <Marker
            coordinate={{
              latitude: 50.06794,
              longitude: 19.95946,
            }}
            title={"Intence trefic!"}
            description={"Intence trefic in the area!"}
          >
            <Text style={{ fontSize: 35 }}>‼️</Text>
          </Marker>
          <Marker
            coordinate={{
              latitude: 50.06003,
              longitude: 19.92567,
            }}
            title={"Intence trefic!"}
            description={"Intence trefic in the area!"}
          >
            <Text style={{ fontSize: 35 }}>‼️</Text>
          </Marker>
          <Marker
            coordinate={{
              latitude: 50.08033,
              longitude: 19.97229,
            }}
            title={"Intence trefic!"}
            description={"Intence trefic in the area!"}
          >
            <Text style={{ fontSize: 35 }}>‼️</Text>
          </Marker>
          <Marker
            coordinate={{
              latitude: 50.05851,
              longitude: 19.9589,
            }}
            title={"Intence trefic!"}
            description={"Intence trefic in the area!"}
          >
            <Text style={{ fontSize: 35 }}>‼️</Text>
          </Marker>
          <Marker
            coordinate={{
              latitude: 50.07945,
              longitude: 19.91873,
            }}
            title={"Intence trefic!"}
            description={"Intence trefic in the area!"}
          >
            <Text style={{ fontSize: 35 }}>‼️</Text>
          </Marker>
          <Marker
            coordinate={{
              latitude: 50.05515,
              longitude: 19.93215,
            }}
            title={"Heavy pedestrian traffic!"}
            description={"Heavy pedestrian traffic in the area!"}
          >
            <Text style={{ fontSize: 35 }}>⚠️</Text>
          </Marker>
          <Marker
            coordinate={{
              latitude: 50.05154,
              longitude: 19.9457,
            }}
            title={"Heavy pedestrian traffic!"}
            description={"Heavy pedestrian traffic in the area!"}
          >
            <Text style={{ fontSize: 35 }}>⚠️</Text>
          </Marker>
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
