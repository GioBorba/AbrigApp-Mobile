import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { auth } from "../src/services/firebase";
import { useAuth } from "../src/context/AuthContext";
import { colors } from "../src/constants/colors";
import { useEffect } from "react";

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
      Alert.alert("Sucesso", "Deslogado com sucesso.");
      router.replace("/login");
    } catch (error: any) {
      Alert.alert("Erro ao sair", error.message);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.email}>{user?.email}</Text>

      <View style={styles.menu}>
        <TouchableOpacity style={styles.button} onPress={() => router.push("/(abrigos)/")}>
          <Text style={styles.buttonText}>🔎 Ver Abrigos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => router.push("/(avaliacoes)/minhas")}>
          <Text style={styles.buttonText}>📝 Minhas Avaliações</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => router.push("/dicas")}>
          <Text style={styles.buttonText}>⚠️ Dicas de Emergência</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => router.push("/numeros")}>
          <Text style={styles.buttonText}>📞 Números de Emergência</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: colors.textGray,
    marginBottom: 24,
  },
  menu: {
    width: "100%",
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    color: colors.buttonText,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  logoutButton: {
    marginTop: 30,
    padding: 12,
    backgroundColor: "#333",
    borderRadius: 10,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  loading: {
    color: colors.textLight,
    textAlign: "center",
    fontSize: 16,
  },
});
