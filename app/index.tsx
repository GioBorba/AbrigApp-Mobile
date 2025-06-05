import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { colors } from "../src/constants/colors";

export default function Welcome() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AbrigApp</Text>
      <Text style={styles.subtitle}>Encontre segurança. Avalie. Ajude.</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push("/login")}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonSecondary} onPress={() => router.push("/signup")}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: colors.textGray,
    textAlign: "center",
    marginBottom: 40,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginBottom: 16,
    width: "100%",
  },
  buttonSecondary: {
    backgroundColor: colors.secondary,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: "100%",
  },
  buttonText: {
    color: colors.buttonText,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});
