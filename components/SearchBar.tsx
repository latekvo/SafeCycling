import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";

const SearchBar = ({
  onSearch,
  highContrast = false,
  style,
  redirects = false,
  value = "",
}: {
  onSearch: (updatedValue: string) => void;
  highContrast?: boolean;
  style?: StyleProp<ViewStyle>;
  redirects?: boolean;
  value?: string;
}) => {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState(value);

  const navigationPath = "/navigate";

  const handleSearch = () => {
    onSearch(searchQuery);

    if (redirects) {
      router.push({ pathname: navigationPath, params: { query: searchQuery } });
      return;
    }
  };

  return (
    <View style={[styles.container, style]}>
      <TextInput
        style={[styles.input, highContrast && styles.textContrast]}
        placeholder="Type your destination..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <View style={highContrast && styles.submitContrast}>
        <Button title="Search" onPress={handleSearch} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textContrast: {
    backgroundColor: "white",
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingLeft: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  submitContrast: {
    backgroundColor: "white",
    borderRadius: 10,
  },
});

export default SearchBar;
