import { View, Text, StyleSheet } from "react-native";
import { colors } from "../src/constants/colors";

export default function Numeros() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Números de Emergência</Text>

      <Text style={styles.item}>• Polícia: 190</Text>
      <Text style={styles.item}>• Bombeiros: 193</Text>
      <Text style={styles.item}>• SAMU (ambulância): 192</Text>
      <Text style={styles.item}>• Defesa Civil: 199</Text>
      <Text style={styles.item}>• Central de atendimento à mulher: 180</Text>
      <Text style={styles.item}>• Disque Denúncia: 181</Text>
      <Text style={styles.item}>• Proteção à Criança e Adolescente: 100</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 24,
  },
  title: {
    fontSize: 22,
    color: colors.primary,
    fontWeight: "bold",
    marginBottom: 16,
  },
  item: {
    color: colors.textLight,
    fontSize: 16,
    marginBottom: 12,
  },
});
