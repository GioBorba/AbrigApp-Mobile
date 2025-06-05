import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity, Linking, Alert } from "react-native";
import { useEffect, useState } from "react";
import { colors } from "../../src/constants/colors";
import AvaliacaoCard from "../../src/components/AvaliacaoCard";
import { auth } from "../../src/services/firebase";
import { AbrigoService } from "../../src/services/AbrigoService";
import { AvaliacaoService } from "../../src/services/AvaliacaoService";

type Abrigo = {
  id: string;
  nome: string;
  endereco: string;
  cidade: string;
  estado: string;
};

type Avaliacao = {
  id: string;
  autor: string;
  comentario: string;
  nota: number;
  dataCriacao: string;
  usuarioId: string;
};

export default function DetalhesAbrigo() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [abrigo, setAbrigo] = useState<Abrigo | null>(null);
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [loading, setLoading] = useState(true);

  const userId = auth.currentUser?.uid;

  const carregarDados = async () => {
    try {
      const abrigoRes = await AbrigoService.buscarPorId(String(id));
      const avaliacoesRes = await AvaliacaoService.listarPorAbrigo(String(id));
      setAbrigo(abrigoRes);
      setAvaliacoes(avaliacoesRes);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os dados do abrigo.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const abrirNoMaps = () => {
    const endereco = `${abrigo?.endereco}, ${abrigo?.cidade} - ${abrigo?.estado}`;
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(endereco)}`;
    Linking.openURL(url);
  };

  const deletarAvaliacao = async (avaliacaoId: string) => {
    try {
      const token = await auth.currentUser?.getIdToken();
      await AvaliacaoService.deletar(avaliacaoId, token!);
      carregarDados();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível deletar a avaliação.");
    }
  };

  if (loading || !abrigo) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{abrigo.nome}</Text>
      <Text style={styles.endereco}>
        {abrigo.endereco}, {abrigo.cidade} - {abrigo.estado}
      </Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.secondary, marginBottom: 24 }]}
        onPress={abrirNoMaps}
      >
        <Text style={styles.buttonText}>Como chegar</Text>
      </TouchableOpacity>

      <Text style={styles.subtitulo}>Avaliações:</Text>

      <FlatList
        data={avaliacoes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AvaliacaoCard
            autor={item.autor}
            comentario={item.comentario}
            nota={item.nota}
            data={item.dataCriacao}
            onEdit={item.usuarioId === userId ? () => router.push(`/avaliacoes/editar?id=${item.id}`) : undefined}
            onDelete={item.usuarioId === userId ? () => deletarAvaliacao(item.id) : undefined}
          />
        )}
        contentContainerStyle={{ paddingBottom: 24 }}
        ListEmptyComponent={<Text style={styles.vazio}>Nenhuma avaliação encontrada.</Text>}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push(`/avaliacoes/nova?abrigoId=${abrigo.id}`)}
      >
        <Text style={styles.buttonText}>Nova Avaliação</Text>
      </TouchableOpacity>
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
  },
  endereco: {
    color: colors.textGray,
    marginBottom: 12,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.secondary,
    marginBottom: 12,
    marginTop: 8,
  },
  vazio: {
    color: colors.textGray,
    textAlign: "center",
    marginTop: 20,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: colors.buttonText,
    fontWeight: "bold",
    textAlign: "center",
  },
});
