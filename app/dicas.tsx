import { View, Text, StyleSheet, ScrollView } from "react-native";
import { colors } from "../src/constants/colors";

export default function Dicas() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>O que fazer em caso de emergência</Text>

      <Text style={styles.item}>
        • Mantenha a calma e siga as orientações das autoridades locais.
      </Text>
      <Text style={styles.item}>
        • Tenha um kit de emergência com documentos, água, alimentos não perecíveis e medicamentos.
      </Text>
      <Text style={styles.item}>
        • Identifique previamente abrigos próximos da sua residência.
      </Text>
      <Text style={styles.item}>
        • Evite áreas de risco como encostas, margens de rios e regiões alagadas.
      </Text>
      <Text style={styles.item}>
        • Mantenha o celular carregado e acompanhe notícias por meios oficiais.
      </Text>
      <Text style={styles.item}>
        • Em caso de evacuação, avise vizinhos e familiares.
      </Text>
      <Text style={styles.item}>
        • Se estiver em um abrigo, colabore com a organização e respeite os protocolos de segurança.
      </Text>
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
