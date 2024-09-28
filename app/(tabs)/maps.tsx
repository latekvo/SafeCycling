import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { UrlTile } from "react-native-maps";

export default function MapsScreen() {
  const region = {
    latitude: 50.0647, // Example coordinates (Krakow, Poland)
    longitude: 19.945,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  return (
    <SafeAreaView>
      <MapView style={styles.map} initialRegion={region} showsUserLocation>
        <UrlTile
          urlTemplate={"http://c.tile.openstreetmap.org/{z}/{x}/{y}.png"}
          maximumZ={19} // iOS only max zoom level
          tileSize={256}
          flipY={false}
        />
      </MapView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: 800,
  },
});
