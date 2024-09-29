import SearchBar from "@/components/SearchBar";
import SearchResults from "@/components/SearchResults";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NavigationScreen() {
  const [searchQuery, setSearchQuery] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar onSearch={(newTerm) => setSearchQuery(newTerm)} />
      <SearchResults searchQuery={searchQuery} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
