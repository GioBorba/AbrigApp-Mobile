// app/avaliacoes/minhas.tsx
import { View, Text, StyleSheet, FlatList, Alert, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { AvaliacaoService, Avaliacao } from "../../src/services/AvaliacaoService";
import { auth } from "../../src/services/firebase";
import { colors } from "../../src/constants/colors";
import { useRouter } from "expo-router";
import AvaliacaoCard from "../../src/components/AvaliacaoCard";

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
        <Text style={styles.loading}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Avaliações</Text>

      <FlatList
        data={avaliacoes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <AvaliacaoCard
              autor={item.autor}
              comentario={item.comentario}
              nota={item.nota}
              data={item.dataCriacao}
            />

            <View style={styles.acoes}>
              <TouchableOpacity
                style={[styles.botao, { backgroundColor: colors.secondary }]}
                onPress={() => router.push(`/avaliacoes/editar?id=${item.id}`)}
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
          <Text style={styles.vazio}>Você ainda não fez nenhuma avaliação.</Text>
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
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 16,
  },
  loading: {
    textAlign: "center",
    color: colors.textLight,
  },
  vazio: {
    textAlign: "center",
    color: colors.textGray,
    marginTop: 32,
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
