import { View, Text, TouchableOpacity, StyleSheet, Alert, SafeAreaView, StatusBar } from "react-native";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { auth } from "../src/services/firebase";
import { useAuth } from "../src/context/AuthContext";
import { colors } from "../src/constants/colors";
import { useEffect } from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Dashboard() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert("Sucesso", "Você foi desconectado.");
    } catch (error: any) {
      Alert.alert("Erro ao sair", error.message);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />

      <View style={styles.header}>
        <Text style={styles.title}>Bem-vindo!</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>
      <View style={styles.menuGrid}>
        <TouchableOpacity style={styles.cardButton} onPress={() => router.push("/(abrigos)/")}>
          <MaterialCommunityIcons name="shield-home-outline" size={32} color={colors.primary} />
          <Text style={styles.cardButtonText}>Ver Abrigos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cardButton} onPress={() => router.push("/(avaliacoes)/minhas")}>
          <MaterialCommunityIcons name="star-outline" size={32} color={colors.primary} />
          <Text style={styles.cardButtonText}>Minhas Avaliações</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cardButton} onPress={() => router.push("/dicas")}>
           <MaterialCommunityIcons name="lightbulb-on-outline" size={32} color={colors.primary} />
          <Text style={styles.cardButtonText}>Dicas de Emergência</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cardButton} onPress={() => router.push("/numeros")}>
           <MaterialCommunityIcons name="phone-outline" size={32} color={colors.primary} />
          <Text style={styles.cardButtonText}>Números Úteis</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <MaterialCommunityIcons name="logout" size={20} color={colors.textGray} />
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
    justifyContent: "space-between"
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: colors.textLight,
    fontSize: 18,
    fontWeight: '500',
  },
  header: {
    alignItems: "center",
    marginBottom: 25, 
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.textLight,
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: colors.textGray,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: -8, 
  },
  cardButton: {
    backgroundColor: '#2a2a2a', 
    width: '48%', 
    aspectRatio: 1, 
    borderRadius: 16,
    padding: 15,
    marginBottom: 16, 
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  cardButtonText: {
    color: colors.textLight,
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 10,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.textGray,
    marginTop: 20,
  },
  logoutText: {
    color: colors.textGray,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
    marginLeft: 8,
  },
});