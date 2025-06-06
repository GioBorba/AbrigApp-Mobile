import { View, Text, StyleSheet, FlatList, Alert, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { AvaliacaoService, Avaliacao } from "../../src/services/AvaliacaoService";
import { auth } from "../../src/services/firebase";
import { colors } from "../../src/constants/colors";
import { useRouter } from "expo-router";
import AvaliacaoCard from "../../src/components/AvaliacaoCard";
import { Ionicons } from "@expo/vector-icons";

export default function MinhasAvaliacoes() {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const carregar = async () => {
    try {
      const token = await auth.currentUser?.getIdToken();
      const minhas = await AvaliacaoService.listarMinhas(token!);
      setAvaliacoes(minhas);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar suas avaliações.");
    } finally {
      setLoading(false);
    }
  };

  const deletar = async (id: string) => {
    Alert.alert("Confirmação", "Deseja mesmo excluir essa avaliação?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            const token = await auth.currentUser?.getIdToken();
            await AvaliacaoService.deletar(id, token!);
            carregar();
          } catch (error) {
            Alert.alert("Erro", "Falha ao excluir.");
          }
        },
      },
    ]);
  };

  useEffect(() => {
    carregar();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>Carregando suas avaliações...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.voltar}>
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Minhas Avaliações</Text>
      </View>

      <FlatList
        data={avaliacoes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <AvaliacaoCard
              comentario={item.comentario}
              nota={item.nota}
              data={item.dataCriacao}
            />

            <View style={styles.acoes}>
              <TouchableOpacity
                style={[styles.botao, { backgroundColor: colors.secondary }]}
                onPress={() => router.push(`/(avaliacoes)/editar?id=${item.id}`)}
              >
                <Text style={styles.botaoTexto}>Editar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.botao, { backgroundColor: "#cc3333" }]}
                onPress={() => deletar(item.id)}
              >
                <Text style={styles.botaoTexto}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.vazioContainer}>
            <Ionicons name="sad-outline" size={48} color={colors.textGray} />
            <Text style={styles.vazio}>Você ainda não fez nenhuma avaliação.</Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  voltar: {
    marginRight: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.primary,
  },
  loading: {
    textAlign: "center",
    color: colors.textLight,
    marginTop: 32,
    fontSize: 16,
  },
  vazioContainer: {
    marginTop: 48,
    alignItems: "center",
    gap: 12,
  },
  vazio: {
    textAlign: "center",
    color: colors.textGray,
    fontSize: 16,
  },
  cardContainer: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderColor: colors.border,
    paddingBottom: 12,
  },
  acoes: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    gap: 12,
  },
  botao: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  botaoTexto: {
    color: colors.buttonText,
    fontWeight: "bold",
    textAlign: "center",
  },
});
