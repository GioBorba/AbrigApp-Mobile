import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import AbrigoCard from "../../src/components/AbrigoCard";
import { AbrigoService, Abrigo } from "../../src/services/AbrigoService";
import { colors } from "../../src/constants/colors";
import { useApiStatus } from "../../src/services/useApiStatus"; 

export default function Abrigos() {
  const [abrigos, setAbrigos] = useState<Abrigo[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  // Enquanto o render não colocar a api no ar de novo, vai mostrar o conectando a api
  const { apiOnline, checking } = useApiStatus("https://abrigapp.onrender.com/api/abrigos");

  const carregarAbrigos = async () => {
    try {
      setLoading(true);
      const dados = await AbrigoService.listarTodos();
      setAbrigos(dados);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os abrigos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (apiOnline) {
      carregarAbrigos();
    }
  }, [apiOnline]);

  if (checking || loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>
          {checking ? "Conectando à API..." : "Carregando abrigos..."} 
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Abrigos Disponíveis</Text>
      <FlatList
        data={abrigos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AbrigoCard abrigo={item} onPress={() => router.push(`/(abrigos)/${item.id}`)} />
        )}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
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
    fontSize: 22,
    color: colors.primary,
    fontWeight: "bold",
    marginBottom: 16,
    alignSelf: "flex-start",
  },
  loadingText: {
    color: colors.textLight,
    marginTop: 16,
    fontSize: 16,
    textAlign: "center",
  },
});
