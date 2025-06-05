import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import AbrigoCard from "../../src/components/AbrigoCard";
import { api } from "../../src/services/api";
import { colors } from "../../src/constants/colors";

type Abrigo = {
  id: string;
  nome: string;
  endereco: string;
};

export default function Abrigos() {
  const [abrigos, setAbrigos] = useState<Abrigo[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const carregarAbrigos = async () => {
    try {
      const response = await api.get("/abrigos");
      setAbrigos(response.data);
    } catch (error) {
      console.error("Erro ao buscar abrigos", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarAbrigos();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Abrigos disponíveis</Text>

      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        <FlatList
          data={abrigos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <AbrigoCard
              abrigo={item}
              onPress={() => router.push(`/abrigos/${item.id}`)}
            />
          )}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      )}
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
});
