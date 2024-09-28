import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView from "react-native-maps";
import SearchBar from "@/components/SearchBar";

export default function MapsScreen() {
  const region = {
    latitude: 50.0647,
    longitude: 19.945,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  return (
    <SafeAreaView>
      <MapView style={styles.map} initialRegion={region} showsUserLocation />
      <SearchBar
        onSearch={(newTerm) => console.log(newTerm)}
        highContrast
        style={{ margin: 10 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative", // set position anchor
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: 800,
  },
});
