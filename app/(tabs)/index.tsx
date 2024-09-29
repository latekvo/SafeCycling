import SearchBar from "@/components/SearchBar";
import { StyleSheet, View, Text, Pressable, TextInput } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";
import { useRouter } from "expo-router";

import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const region = {
    latitude: 50.0647,
    longitude: 19.945,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };
  const router = useRouter();

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Pressable style={styles.userPreview}>
            <Text style={styles.userText}>User Info</Text>
          </Pressable>
          <Pressable
            style={styles.mapPreview}
            onPress={() => {
              router.push("/_maps");
            }}
          >
            <MapView
              style={styles.map}
              initialRegion={region}
              showsUserLocation
              scrollEnabled={false}
              moveOnMarkerPress={false}
            >
              <Marker
                coordinate={{
                  latitude: 50.06545,
                  longitude: 19.93704,
                }}
                title={"Heavy pedestrian traffic!"}
                description={"Heavy pedestrian traffic in the area!"}
              >
                <Text style={{ fontSize: 35 }}>⚠️</Text>
                {/* Example emoji */}
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
                {/* Example emoji */}
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
                {/* Example emoji */}
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
                {/* Example emoji */}
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
                {/* Example emoji */}
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
                {/* Example emoji */}
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
                {/* Example emoji */}
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
                {/* Example emoji */}
              </Marker>
            </MapView>
          </Pressable>

          {/* Saved Locations Section */}
          <View style={styles.savedLocationsContainer}>
            <Pressable
              style={styles.savedLocationButton}
              onPress={() => {
                router.push({
                  pathname: "/_maps",
                  params: {
                    cords: JSON.stringify([
                      { lat: 50.9440906, lon: 19.944739 },
                    ]),
                  },
                });
              }}
            >
              <Text style={styles.savedLocationText}>🏠 Home</Text>
            </Pressable>
            <Pressable
              style={styles.savedLocationButton}
              onPress={() => {
                router.push({
                  pathname: "/_maps",
                  params: {
                    cords: JSON.stringify([
                      { lat: 50.061225, lon: 19.9440906 },
                    ]),
                  },
                });
              }}
            >
              <Text style={styles.savedLocationText}>🏢 Office</Text>
            </Pressable>
          </View>
          <SearchBar
            onSearch={(newTerm) => console.log(newTerm)}
            style={{ marginTop: 20 }}
            redirects
            highContrast
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2", // Light gray background
    padding: 20,
    justifyContent: "space-between",
  },
  userPreview: {
    marginTop: 10,
    alignSelf: "flex-end",
  },
  userText: {
    fontSize: 20,
    color: "gray",
  },
  mapPreview: {
    marginTop: 20,
    height: 400,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#ffffff",
  },
  mapText: {
    color: "#fff",
    fontSize: 20,
  },
  savedLocationsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  savedLocationButton: {
    backgroundColor: "#ffffff", // Darker gray for buttons
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
  },
  savedLocationText: {
    color: "#000000", // White text on dark gray button
    fontSize: 16,
  },
  input: {
    backgroundColor: "#d0d0d0", // Light gray input field
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#333", // Dark gray text
    marginTop: 20,
  },
  map: {
    height: "100%",
    width: "100%",
    opacity: 0.9,
  },
});
