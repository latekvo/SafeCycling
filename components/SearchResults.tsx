import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ScrollView,
} from "react-native";

const SearchResults = ({
  searchQuery,
  style,
}: {
  searchQuery: string | null;
  style?: StyleProp<ViewStyle>;
}) => {
  const [queryResult, setQueryResults] = useState<any[]>([]);

  // API rate limited to >1000ms

  const isQueryScheduled = useRef(false);
  const isOnCooldown = useRef(false);
  const cooldownStart = useRef(0);
  const cooldownDuration = 1250;

  const scheduleCooldownClear = () => {
    cooldownStart.current = Date.now();
    setTimeout(() => {
      isOnCooldown.current = false;
      isQueryScheduled.current = false;
    }, cooldownDuration);
  };

  const queryForResults = () => {
    // geocode.maps.co a-p-i k-e-y, since this is a frontend-only proof-of-concept app,
    // there's no need or way for hiding it.
    // minimal obfuscation is used to prevent automatic github scrapers
    const ak = ["66f87e8e", "62945678", "322262yj", "afc7c5e"].join("");
    const akName = ["a", "p", "i", "_", "k", "e", "y"].join("");

    const geolocationApiUrl = `https://geocode.maps.co/search?q=${searchQuery}&${akName}=${ak}`;

    // On error restart timer with incremented backoff
    fetch(geolocationApiUrl)
      .then((response) => response.json())
      .then((response) => {
        console.log("API request success:", response);

        // lower importance - more important
        const sortedResults = (response as { importance: number }[]).sort(
          (left, right) => right.importance - left.importance
        );

        setQueryResults(sortedResults);
      })
      .catch((error) => {
        console.log("API request error:", error);
        tryQueryForResults(); // retry
      });
  };

  const tryQueryForResults = () => {
    if (isOnCooldown.current) {
      const remainingCooldown = 0;
      setTimeout(queryForResults, remainingCooldown);
    } else {
      if (!isQueryScheduled.current) {
        queryForResults();
        isQueryScheduled.current = true;
        isOnCooldown.current = true;
        scheduleCooldownClear();
      }
    }
  };

  useEffect(() => {
    if (searchQuery) {
      tryQueryForResults();
    }
  }, [searchQuery]);

  return (
    <ScrollView style={[style]}>
      {queryResult.map((value: { display_name: string }, index) => (
        <View key={index} style={styles.locationCard}>
          <Text>{value.display_name}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
  locationCard: {
    padding: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#8b8b8b",
  },
});

export default SearchResults;
