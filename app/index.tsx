import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  Text,
  TextInput,
  View
} from "react-native";
import { searchSeries } from "./api/search";
import { fetchPopularSeries, getImageUrl, TMDBSeries } from "./api/tmdb";

export default function HomeScreen() {
  const router = useRouter();
  const [series, setSeries] = useState<TMDBSeries[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchPopularSeries()
      .then(setSeries)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "black",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "black", padding: 16 }}>
      <Text
        style={{
          color: "white",
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 16,
        }}
      >
        المسلسلات
      </Text>
      <TextInput
        placeholder="ابحث عن مسلسل..."
        placeholderTextColor="#71717a"
        value={query}
        onChangeText={(text) => {
          setQuery(text);
          searchSeries(text).then(setSeries);
        }}
        style={{
          backgroundColor: "#18181b",
          color: "white",
          padding: 12,
          borderRadius: 10,
          marginBottom: 16,
        }}
      />

      <FlatList
        data={series}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <Pressable
          onPress={() =>
            router.push({
              pathname: '/series/[id]',
              params: { id: String(item.id) },
            })
          }
            style={{
              width: "48%",
              marginBottom: 16,
              backgroundColor: "#18181b",
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            <Image
              source={{ uri: getImageUrl(item.poster_path) ?? undefined }}
              style={{ height: 220, width: "100%" }}
            />

            <View style={{ padding: 10 }}>
              <Text
                style={{
                  color: "white",
                  fontSize: 15,
                  fontWeight: "bold",
                }}
                numberOfLines={1}
              >
                {item.name}
              </Text>

              <Text style={{ color: "#facc15", marginTop: 4 }}>
                ⭐ {item.vote_average.toFixed(1)}
              </Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}
