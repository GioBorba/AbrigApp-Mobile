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
      <Text style={styles.title}>Bem-vindo,</Text>
      <Text style={styles.email}>{user?.email}</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push("/abrigos")}>
        <Text style={styles.buttonText}>Abrigos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push("/(avaliacoes)/minhas")}>
        <Text style={styles.buttonText}>Minhas Avaliações</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push("/dicas")}>
        <Text style={styles.buttonText}>O que fazer em caso de emergência</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push("/numeros")}>
        <Text style={styles.buttonText}>Números de emergência</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sair</Text>
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
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: colors.textGray,
    marginBottom: 32,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonText: {
    color: colors.buttonText,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  logoutButton: {
    backgroundColor: "#333",
    padding: 14,
    borderRadius: 8,
    marginTop: 32,
  },
  logoutText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  loading: {
    color: colors.textLight,
    textAlign: "center",
    fontSize: 16,
  },
});
