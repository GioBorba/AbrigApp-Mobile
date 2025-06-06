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

const numeros = [
  { label: "Polícia Militar", numero: "190", icon: "police-badge-outline" },
  { label: "Bombeiros", numero: "193", icon: "fire-truck" },
  { label: "SAMU (Ambulância)", numero: "192", icon: "ambulance" },
  { label: "Defesa Civil", numero: "199", icon: "shield-alert-outline" },
  { label: "Atendimento à Mulher", numero: "180", icon: "face-woman-outline" },
  { label: "Disque Denúncia", numero: "181", icon: "phone-alert-outline" },
];

export default function Numeros() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={28} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Números Úteis</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        {numeros.map((item, index) => (
          <View key={index} style={styles.card} >
            <View style={styles.cardContent}>
              <MaterialCommunityIcons name={item.icon as any} size={32} color={colors.primary} style={styles.serviceIcon} />
              <View>
                <Text style={styles.label}>{item.label}</Text>
                <Text style={styles.numero}>{item.numero}</Text>
              </View>
            </View>
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
    paddingTop: 10
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
    color: colors.textLight
  },
  scrollContentContainer: {
    padding: 20,
  },
  card: {
    backgroundColor: "#2a2a2a",
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceIcon: {
    marginRight: 16,
  },
  label: {
    fontSize: 18,
    color: colors.textLight,
    fontWeight: '500',
    marginBottom: 4,
  },
  numero: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.secondary,
  },
});