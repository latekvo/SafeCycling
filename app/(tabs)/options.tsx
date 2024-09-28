import { StyleSheet, View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function OptionsScreen() {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.mainContainer}>
          <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.contentWrapper}>
              <Text style={styles.header}>Settings</Text>

              <Pressable style={styles.textButton}>
                <Text style={styles.textButtonLabel}>Account Settings</Text>
                <FontAwesome5
                  style={styles.iconeButton}
                  name="user-cog"
                  size={24}
                  color="#4d4d4d"
                />
              </Pressable>
              <View style={styles.separator} />

              <Pressable style={styles.textButton}>
                <Text style={styles.textButtonLabel}>Map Settings</Text>
                <FontAwesome
                  style={styles.iconeButton}
                  name="map"
                  size={24}
                  color="#4d4d4d"
                />
              </Pressable>
              <View style={styles.separator} />

              <Pressable style={styles.textButton}>
                <Text style={styles.textButtonLabel}>Path Search Settings</Text>
                <MaterialCommunityIcons
                  style={styles.iconeButton}
                  name="map-marker-path"
                  size={26}
                  color="#4d4d4d"
                />
              </Pressable>
              <View style={styles.separator} />
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#f2f2f2", // Light grey background
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  contentWrapper: {
    width: "100%",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333", // Dark grey color for text
    marginBottom: 40,
  },
  textButton: {
    paddingVertical: 15,
    width: "80%",
    flexDirection: "row", // Keep row alignment
    justifyContent: "space-between", // Push text to left and icon to right
    alignItems: "center",
  },
  textButtonLabel: {
    fontSize: 18,
    color: "#4d4d4d", // Medium grey text
    paddingLeft: 10, // Add padding from the left
    marginRight: 20,
    // alignSelf: "flex-start",
  },
  iconeButton: {
    alignSelf: "flex-end",
  },
  separator: {
    width: "80%",
    height: 1,
    backgroundColor: "#d9d9d9", // Light grey horizontal line
    marginVertical: 10,
  },
});
