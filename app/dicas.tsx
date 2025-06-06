import { View, Text, StyleSheet, ScrollView } from "react-native";
import { colors } from "../src/constants/colors";

const dicas = [
  "Mantenha a calma e siga as orientações das autoridades locais.",
  "Tenha um kit de emergência com documentos, água, alimentos não perecíveis e medicamentos.",
  "Identifique previamente abrigos próximos da sua residência.",
  "Evite áreas de risco como encostas, margens de rios e regiões alagadas.",
  "Mantenha o celular carregado e acompanhe notícias por meios oficiais.",
  "Em caso de evacuação, avise vizinhos e familiares.",
  "Se estiver em um abrigo, colabore com a organização e respeite os protocolos de segurança.",
];

export default function Dicas() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>O que fazer em caso de emergência</Text>

      {dicas.map((texto, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.item}>• {texto}</Text>
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
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: colors.secondary,
    marginBottom: 14,
  },
  item: {
    color: colors.textLight,
    fontSize: 16,
    lineHeight: 22,
  },
});
