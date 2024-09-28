import SearchBar from "@/components/SearchBar";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NavigationScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <SearchBar onSearch={(newTerm) => console.log(newTerm)}></SearchBar>
      <ScrollView>{/* Searches history etc. */}</ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
