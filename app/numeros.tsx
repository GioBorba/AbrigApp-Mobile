import { View, Text, StyleSheet, ScrollView } from "react-native";
import { colors } from "../src/constants/colors";

const numeros = [
  { label: "Polícia", numero: "190" },
  { label: "Bombeiros", numero: "193" },
  { label: "SAMU (ambulância)", numero: "192" },
  { label: "Defesa Civil", numero: "199" },
  { label: "Central de atendimento à mulher", numero: "180" },
  { label: "Disque Denúncia", numero: "181" },
];

export default function Numeros() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Números de Emergência</Text>

      {numeros.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.label}>{item.label}</Text>
          <Text style={styles.numero}>{item.numero}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#2a2a2a",
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    marginBottom: 14,
  },
  label: {
    fontSize: 16,
    color: colors.textLight,
    marginBottom: 4,
  },
  numero: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.secondary,
  },
});
