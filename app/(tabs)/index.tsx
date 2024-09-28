import { StyleSheet, View, Text, Pressable, TextInput } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const savedLocalizationFirst = (location: string) => {
    console.log(location);
  };

  const savedLocalizationSecond = (location: string) => {
    console.log(location);
  };
  const handleMap = () => {
    console.log("map");
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Pressable style={styles.userPreview}>
            <Text style={styles.userText}>User Info</Text>
          </Pressable>
          {/* Map Preview Section */}

          <Pressable style={styles.mapPreview} onPress={() => handleMap()}>
            <Text style={styles.mapText}>Map Preview</Text>
          </Pressable>

          {/* Saved Locations Section */}
          <View style={styles.savedLocationsContainer}>
            <Pressable
              style={styles.savedLocationButton}
              onPress={() => savedLocalizationFirst("Location 1")}
            >
              <Text style={styles.savedLocationText}>Location 1</Text>
            </Pressable>
            <Pressable
              style={styles.savedLocationButton}
              onPress={() => savedLocalizationSecond("Location 2")}
            >
              <Text style={styles.savedLocationText}>Location 2</Text>
            </Pressable>
          </View>

          {/* Input for Location */}
          <TextInput
            style={styles.input}
            placeholder="Enter location"
            placeholderTextColor="#999"
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
    // height: 30,
    // backgroundColor: "black",
    alignSelf: "flex-end",
  },
  userText: {
    fontSize: 20,
    color: "gray",
  },
  mapPreview: {
    marginTop: 20,
    backgroundColor: "#b0b0b0", // Medium gray for map preview
    height: 400,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
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
    backgroundColor: "#a0a0a0", // Darker gray for buttons
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
  },
  savedLocationText: {
    color: "#fff", // White text on dark gray button
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
});
