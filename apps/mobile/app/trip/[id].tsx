import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TripDetailScreen() {
  const { id } = useLocalSearchParams();

  return (
    <ScrollView style={styles.container}>
      {/* Trip header */}
      <View style={styles.header}>
        <Text style={styles.title}>Week-end à Lisbonne</Text>
        <View style={styles.metaRow}>
          <Ionicons name="location-outline" size={14} color="#64748B" />
          <Text style={styles.metaText}>Lisbonne, Portugal</Text>
        </View>
        <View style={styles.metaRow}>
          <Ionicons name="calendar-outline" size={14} color="#64748B" />
          <Text style={styles.metaText}>18 — 20 avril 2026</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>J-24</Text>
        </View>
      </View>

      {/* Preparation score */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Score de préparation</Text>
          <Text style={styles.scoreText}>72%</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: "72%", backgroundColor: "#F59E0B" }]} />
        </View>
        <Text style={styles.cardSubtext}>6/9 tâches complétées</Text>
      </View>

      {/* Budget */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Budget</Text>
        <View style={styles.budgetRow}>
          <View>
            <Text style={styles.budgetAmount}>445 €</Text>
            <Text style={styles.cardSubtext}>dépensé</Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={[styles.budgetAmount, { color: "#CBD5E1" }]}>600 €</Text>
            <Text style={styles.cardSubtext}>budget</Text>
          </View>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: "74%", backgroundColor: "#2563EB" }]} />
        </View>
      </View>

      {/* Checklist preview */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Prochaines tâches</Text>
        {["Planifier le trajet", "Vêtements adaptés à la météo", "Médicaments si besoin"].map(
          (task) => (
            <View key={task} style={styles.taskRow}>
              <View style={styles.checkbox} />
              <Text style={styles.taskText}>{task}</Text>
            </View>
          )
        )}
        <TouchableOpacity>
          <Text style={styles.linkText}>Voir toute la checklist →</Text>
        </TouchableOpacity>
      </View>

      {/* Quick phrases */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Phrases utiles en portugais</Text>
        {[
          { fr: "Bonjour", pt: "Bom dia" },
          { fr: "Merci", pt: "Obrigado/a" },
          { fr: "L'addition, svp", pt: "A conta, por favor" },
        ].map((phrase) => (
          <View key={phrase.fr} style={styles.phraseRow}>
            <Text style={styles.phraseFr}>{phrase.fr}</Text>
            <Text style={styles.phrasePt}>{phrase.pt}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  header: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  title: { fontSize: 24, fontWeight: "700", color: "#0F172A" },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 4 },
  metaText: { fontSize: 14, color: "#64748B" },
  badge: {
    marginTop: 8,
    backgroundColor: "#FEF3C7",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: { fontSize: 12, fontWeight: "600", color: "#D97706" },
  card: {
    backgroundColor: "#FFFFFF",
    margin: 16,
    marginBottom: 0,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  cardTitle: { fontSize: 16, fontWeight: "600", color: "#0F172A", marginBottom: 8 },
  scoreText: { fontSize: 24, fontWeight: "700", color: "#0F172A" },
  cardSubtext: { fontSize: 13, color: "#94A3B8", marginTop: 4 },
  progressBar: {
    height: 6,
    backgroundColor: "#F1F5F9",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: { height: "100%", borderRadius: 3 },
  budgetRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  budgetAmount: { fontSize: 24, fontWeight: "700", color: "#0F172A" },
  taskRow: { flexDirection: "row", alignItems: "center", gap: 8, paddingVertical: 6 },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: "#CBD5E1",
  },
  taskText: { fontSize: 14, color: "#334155" },
  linkText: { fontSize: 13, fontWeight: "600", color: "#2563EB", marginTop: 8 },
  phraseRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  phraseFr: { fontSize: 14, color: "#64748B" },
  phrasePt: { fontSize: 14, fontWeight: "600", color: "#0F172A" },
});
