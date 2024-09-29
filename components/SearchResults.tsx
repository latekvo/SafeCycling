import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ScrollView,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";

const SearchResults = ({
  searchQuery,
  style,
}: {
  searchQuery: string | null;
  style?: StyleProp<ViewStyle>;
}) => {
  const [queryResult, setQueryResults] = useState<any[]>([]);

  // API rate limited to >1000
  const baseRequestCooldown = 1250;
  const requestBackoff = 500;
  const maxConsecutiveFails = 5;

  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const currentConsecutiveFails = useRef<number>(0);
  const currentRequestCooldown = useRef(baseRequestCooldown);

  const queryForResults = () => {
    timeoutId.current = null;

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

        currentConsecutiveFails.current = 0;
        currentRequestCooldown.current = baseRequestCooldown;

        // lower importance - more important
        const sortedResults = (response as { importance: number }[]).sort(
          (left, right) => right.importance - left.importance
        );

        setQueryResults(sortedResults);
      })
      .catch((error) => {
        if (currentConsecutiveFails.current >= maxConsecutiveFails) {
          console.log(`API max retries reached (${maxConsecutiveFails})`);
          timeoutId.current = null;
          return;
        }

        console.log("API request error:", error);

        currentConsecutiveFails.current += 1;
        currentRequestCooldown.current += requestBackoff;

        timeoutId.current = setTimeout(
          queryForResults,
          currentRequestCooldown.current
        );
      });
  };

  useEffect(() => {
    if (timeoutId.current !== null) {
      clearTimeout(timeoutId.current);
    }

    currentConsecutiveFails.current = 0;

    if (searchQuery != null) {
      timeoutId.current = setTimeout(
        queryForResults,
        currentRequestCooldown.current
      );
    }
  }, [searchQuery]);

  const router = useRouter();

  return (
    <ScrollView style={[style]}>
      {queryResult.map(
        (value: { display_name: string; lon: number; lat: number }, index) => (
          <Pressable
            key={index}
            style={styles.locationCard}
            onPress={() => {
              router.push({
                pathname: "/_maps",
                params: {
                  cords: JSON.stringify([{ lat: value.lat, lon: value.lon }]),
                },
              });
            }}
          >
            <Text>{value.display_name}</Text>
            <Text>{value.lon}</Text>
            <Text>{value.lat}</Text>
          </Pressable>
        )
      )}
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
