import SearchBar from "@/components/SearchBar";
import { StyleSheet, View, Text, Pressable, TextInput } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import MapView from "react-native-maps";
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
          {/* Map Preview Section */}

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
            />
          </Pressable>

          {/* Saved Locations Section */}
          <View style={styles.savedLocationsContainer}>
            <Pressable
              style={styles.savedLocationButton}
              onPress={() => {
                router.push({
                  pathname: "/_maps",
                  params: {
                    cords: JSON.stringify([{ lat: 50.051061, lon: 19.944739 }]),
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
                    cords: JSON.stringify([{ lat: 50.064405, lon: 19.960025 }]),
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
