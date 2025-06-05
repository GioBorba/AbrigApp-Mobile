import { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import { getIdToken } from "firebase/auth";
import { auth } from "../../src/services/firebase";
import { api } from "../../src/services/api";
import { colors } from "../../src/constants/colors";
import AvaliacaoCard from "../../src/components/AvaliacaoCard";
import { useRouter } from "expo-router";

type Avaliacao = {
  id: string;
  autor: string;
  comentario: string;
  nota: number;
  dataCriacao: string;
};

export default function MinhasAvaliacoes() {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const router = useRouter();

  const carregarAvaliacoes = async () => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("Usuário não autenticado.");
      const token = await getIdToken(user);

      const res = await api.get("/avaliacoes/minhas", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAvaliacoes(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deletarAvaliacao = async (id: string) => {
    Alert.alert("Excluir", "Tem certeza que deseja excluir esta avaliação?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            const token = await getIdToken(auth.currentUser!);
            await api.delete(`/avaliacoes/${id}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            carregarAvaliacoes();
          } catch (error) {
            Alert.alert("Erro", "Erro ao excluir.");
          }
        },
      },
    ]);
  };

  useEffect(() => {
    carregarAvaliacoes();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Avaliações</Text>

      <FlatList
        data={avaliacoes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AvaliacaoCard
            autor={item.autor}
            comentario={item.comentario}
            nota={item.nota}
            data={item.dataCriacao}
            onEdit={() => router.push(`/avaliacoes/editar?id=${item.id}`)}
            onDelete={() => deletarAvaliacao(item.id)}
          />
        )}
        contentContainerStyle={{ paddingBottom: 24 }}
        ListEmptyComponent={<Text style={styles.vazio}>Você ainda não avaliou nenhum abrigo.</Text>}
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
    fontSize: 24,
    color: colors.primary,
    fontWeight: "bold",
    marginBottom: 16,
  },
  vazio: {
    color: colors.textGray,
    textAlign: "center",
    marginTop: 20,
  },
});
