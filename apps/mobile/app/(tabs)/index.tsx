import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { TRIP_TYPE_LABELS } from "@voygo/shared";

const DEMO_TRIPS = [
  {
    id: "1",
    title: "Week-end à Lisbonne",
    destination: "Lisbonne, Portugal",
    trip_type: "weekend",
    start_date: "2026-04-18",
    end_date: "2026-04-20",
    preparation_score: 72,
  },
  {
    id: "2",
    title: "Vacances au Japon",
    destination: "Tokyo, Japon",
    trip_type: "vacation",
    start_date: "2026-07-10",
    end_date: "2026-07-24",
    preparation_score: 35,
  },
];

export default function TripsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mes voyages</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={20} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Nouveau</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={DEMO_TRIPS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/trip/${item.id}`)}
            activeOpacity={0.7}
          >
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <View style={styles.cardMeta}>
                <Ionicons name="location-outline" size={14} color="#64748B" />
                <Text style={styles.cardMetaText}>{item.destination}</Text>
              </View>
              <View style={styles.cardMeta}>
                <Ionicons name="calendar-outline" size={14} color="#64748B" />
                <Text style={styles.cardMetaText}>
                  {item.start_date} → {item.end_date}
                </Text>
              </View>
              <Text style={styles.cardType}>{TRIP_TYPE_LABELS[item.trip_type]}</Text>
            </View>

            {/* Progress bar */}
            <View style={styles.progressContainer}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>Préparation</Text>
                <Text style={styles.progressValue}>{item.preparation_score}%</Text>
              </View>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${item.preparation_score}%`,
                      backgroundColor:
                        item.preparation_score >= 80
                          ? "#10B981"
                          : item.preparation_score >= 50
                            ? "#F59E0B"
                            : "#EF4444",
                    },
                  ]}
                />
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  title: { fontSize: 28, fontWeight: "700", color: "#0F172A" },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#2563EB",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  addButtonText: { color: "#FFFFFF", fontSize: 14, fontWeight: "600" },
  list: { padding: 16, gap: 12 },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 12,
  },
  cardContent: { marginBottom: 12 },
  cardTitle: { fontSize: 18, fontWeight: "600", color: "#0F172A", marginBottom: 8 },
  cardMeta: { flexDirection: "row", alignItems: "center", gap: 4, marginBottom: 4 },
  cardMetaText: { fontSize: 13, color: "#64748B" },
  cardType: { fontSize: 12, color: "#94A3B8", marginTop: 4 },
  progressContainer: { marginTop: 4 },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  progressLabel: { fontSize: 12, color: "#64748B" },
  progressValue: { fontSize: 12, fontWeight: "600", color: "#0F172A" },
  progressBar: {
    height: 6,
    backgroundColor: "#F1F5F9",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: { height: "100%", borderRadius: 3 },
});
