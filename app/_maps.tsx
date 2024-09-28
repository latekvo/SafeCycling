import { Dimensions, StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView from "react-native-maps";
import SearchBar from "@/components/SearchBar";
import { Link } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function MapsScreen() {
  const region = {
    latitude: 50.0647,
    longitude: 19.945,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };
  const { width, height } = Dimensions.get("window");

  return (
    <SafeAreaView>
      <View style={[styles.container, { width, height }]}>
        <MapView style={styles.map} initialRegion={region} showsUserLocation />
        <Link href="../" style={styles.backButton}>
          <Ionicons name="arrow-back-circle" size={47} color="#525252" />
        </Link>
        <View style={styles.searchBarBerground}>
          <SearchBar
            onSearch={(newTerm) => console.log(newTerm)}
            highContrast
            style={{ margin: 10 }}
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
