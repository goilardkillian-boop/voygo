import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>MD</Text>
        </View>
        <Text style={styles.name}>Marie Dupont</Text>
        <Text style={styles.email}>marie@example.com</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Préférences alimentaires</Text>
        <View style={styles.badges}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Aucun régime</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Pas d&apos;allergie</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Paramètres</Text>
        {[
          { icon: "notifications-outline" as const, label: "Notifications" },
          { icon: "shield-outline" as const, label: "Confidentialité" },
          { icon: "card-outline" as const, label: "Voygo Premium" },
          { icon: "log-out-outline" as const, label: "Se déconnecter", danger: true },
        ].map((item) => (
          <TouchableOpacity key={item.label} style={styles.settingsRow}>
            <Ionicons
              name={item.icon}
              size={20}
              color={item.danger ? "#EF4444" : "#64748B"}
            />
            <Text style={[styles.settingsLabel, item.danger && styles.danger]}>
              {item.label}
            </Text>
            <Ionicons name="chevron-forward" size={16} color="#CBD5E1" />
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.version}>Voygo v0.1.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  header: { alignItems: "center", paddingVertical: 24 },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { fontSize: 24, fontWeight: "700", color: "#FFFFFF" },
  name: { fontSize: 20, fontWeight: "700", color: "#0F172A", marginTop: 12 },
  email: { fontSize: 14, color: "#64748B", marginTop: 2 },
  section: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  sectionTitle: { fontSize: 16, fontWeight: "600", color: "#0F172A", marginBottom: 12 },
  badges: { flexDirection: "row", gap: 8 },
  badge: {
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: { fontSize: 13, color: "#64748B" },
  settingsRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  settingsLabel: { flex: 1, fontSize: 15, color: "#0F172A" },
  danger: { color: "#EF4444" },
  version: { textAlign: "center", fontSize: 12, color: "#94A3B8", paddingVertical: 24 },
});
