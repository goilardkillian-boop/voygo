import { View, Text, FlatList, StyleSheet } from "react-native";

const destinations = [
  { name: "Paris", country: "France", emoji: "🇫🇷" },
  { name: "Lisbonne", country: "Portugal", emoji: "🇵🇹" },
  { name: "Barcelone", country: "Espagne", emoji: "🇪🇸" },
  { name: "Rome", country: "Italie", emoji: "🇮🇹" },
  { name: "Tokyo", country: "Japon", emoji: "🇯🇵" },
  { name: "Marrakech", country: "Maroc", emoji: "🇲🇦" },
  { name: "Bangkok", country: "Thaïlande", emoji: "🇹🇭" },
  { name: "Istanbul", country: "Turquie", emoji: "🇹🇷" },
];

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explorer</Text>
      <Text style={styles.subtitle}>Découvre nos destinations</Text>
      <FlatList
        data={destinations}
        keyExtractor={(item) => item.name}
        numColumns={2}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.emoji}>{item.emoji}</Text>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardCountry}>{item.country}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  title: { fontSize: 28, fontWeight: "700", color: "#0F172A", paddingHorizontal: 16, paddingTop: 8 },
  subtitle: { fontSize: 14, color: "#64748B", paddingHorizontal: 16, marginBottom: 16 },
  grid: { padding: 16 },
  row: { gap: 12, marginBottom: 12 },
  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    alignItems: "center",
  },
  emoji: { fontSize: 32, marginBottom: 8 },
  cardTitle: { fontSize: 16, fontWeight: "600", color: "#0F172A" },
  cardCountry: { fontSize: 13, color: "#64748B" },
});
