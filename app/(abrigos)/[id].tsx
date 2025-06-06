import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Alert, TouchableOpacity, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import { AbrigoService, Abrigo } from "../../src/services/AbrigoService";
import { AvaliacaoService, Avaliacao } from "../../src/services/AvaliacaoService";
import AvaliacaoCard from "../../src/components/AvaliacaoCard";
import { colors } from "../../src/constants/colors";
import { auth } from "../../src/services/firebase";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function DetalhesAbrigo() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [abrigo, setAbrigo] = useState<Abrigo | null>(null);
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [loading, setLoading] = useState(true);
  const userId = auth.currentUser?.uid;

  const carregarDados = async () => {
    if (!id) return;

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

  const abrirNoMaps = () => {
    if (!abrigo) return;
    const endereco = `${abrigo.endereco}, ${abrigo.cidade} - ${abrigo.estado}`;
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

  useEffect(() => {
    carregarDados();
  }, [id]);

  if (loading || !abrigo) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={28} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>{abrigo.nome}</Text>
      </View>
      <Text style={styles.endereco}>
        {abrigo.endereco}, {abrigo.cidade} - {abrigo.estado}
      </Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.secondary, marginBottom: 24 }]}
        onPress={abrirNoMaps}
      >
        <Text style={styles.buttonText}>Como chegar</Text>
      </TouchableOpacity>

      <Text style={styles.subtitulo}>Avaliações</Text>

      <FlatList
        data={avaliacoes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 12 }}>
            <AvaliacaoCard
              comentario={item.comentario}
              nota={item.nota}
              data={item.dataCriacao}
            />

            {item.usuarioId === userId && (
              <View style={styles.acoes}>
                <TouchableOpacity
                  style={[styles.botao, { backgroundColor: colors.secondary }]}
                  onPress={() => router.push(`/(avaliacoes)/editar?id=${item.id}`)}
                >
                  <Text style={styles.botaoTexto}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.botao, { backgroundColor: "#cc3333" }]}
                  onPress={() => deletarAvaliacao(item.id)}
                >
                  <Text style={styles.botaoTexto}>Excluir</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
        ListEmptyComponent={<Text style={styles.semDados}>Nenhuma avaliação encontrada.</Text>}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      {auth.currentUser && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push(`/(avaliacoes)/nova?abrigoId=${abrigo.id}`)}
        >
          <Text style={styles.buttonText}>Nova Avaliação</Text>
        </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  title: {
    fontSize: 28,
    color: colors.primary,
    fontWeight: "bold",
    marginBottom: 4,
  },
  endereco: {
    fontSize: 16,
    color: colors.textGray,
    marginBottom: 20,
    marginTop: 20
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.textLight,
    marginBottom: 16,
    marginTop: 12,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  acoes: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
    marginTop: 8,
  },
  botao: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  botaoTexto: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  semDados: {
    color: colors.textGray,
    textAlign: "center",
    marginTop: 16,
    fontSize: 14,
  },
});
