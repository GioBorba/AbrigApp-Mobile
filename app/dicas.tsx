import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { colors } from "../src/constants/colors";
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={28} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Dicas de Emergência</Text>
      </View>
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContentContainer}
      >
        <Text style={styles.subtitle}>
          O que fazer para se manter seguro:
        </Text>

        {dicas.map((texto, index) => (
          <View key={index} style={styles.card}>
            <MaterialCommunityIcons 
              name="chevron-right-circle-outline" 
              size={24} 
              color={colors.secondary} 
              style={styles.cardIcon}
            />
            <Text style={styles.itemText}>{texto}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.textLight,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContentContainer: {
    padding: 20,
  },
  subtitle: {
    fontSize: 18,
    color: colors.textGray,
    marginBottom: 24,
    fontWeight: '500',
  },
  card: {
    backgroundColor: "#2a2a2a",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    flexDirection: 'row', 
    alignItems: 'center', 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  cardIcon: {
    marginRight: 12,
  },
  itemText: {
    flex: 1,
    color: colors.textLight,
    fontSize: 16,
    lineHeight: 24,
  },
});