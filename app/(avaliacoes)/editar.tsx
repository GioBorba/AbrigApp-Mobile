// app/avaliacoes/editar.tsx
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { AvaliacaoService } from "../../src/services/AvaliacaoService";
import { auth } from "../../src/services/firebase";
import { colors } from "../../src/constants/colors";

export default function EditarAvaliacao() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [comentario, setComentario] = useState("");
  const [nota, setNota] = useState("5");
  const [abrigoId, setAbrigoId] = useState("");
  const [loading, setLoading] = useState(true);

  const carregar = async () => {
    try {
      const token = await auth.currentUser?.getIdToken();
      const minhas = await AvaliacaoService.listarMinhas(token!);
      const avaliacao = minhas.find((a) => a.id === id);

      if (!avaliacao) {
        Alert.alert("Erro", "Avaliação não encontrada ou não pertence a você.");
        router.back();
        return;
      }

      setComentario(avaliacao.comentario);
      setNota(avaliacao.nota.toString());
      setAbrigoId(avaliacao.abrigoId || "");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar a avaliação.");
    } finally {
      setLoading(false);
    }
  };

  const enviar = async () => {
    const notaNumero = parseInt(nota);
    if (!comentario || isNaN(notaNumero) || notaNumero < 1 || notaNumero > 5) {
      Alert.alert("Erro", "Preencha todos os campos corretamente.");
      return;
    }

    try {
      setLoading(true);
      const token = await auth.currentUser?.getIdToken();
      await AvaliacaoService.editar(String(id), { comentario, nota: notaNumero }, token!);
      Alert.alert("Sucesso", "Avaliação atualizada!");
      router.replace(`/(abrigos)/${abrigoId}`);
    } catch (error) {
      Alert.alert("Erro", "Falha ao editar a avaliação.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) carregar();
  }, [id]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Avaliação</Text>

      <Text style={styles.label}>Nota (1 a 5):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={nota}
        onChangeText={setNota}
      />

      <Text style={styles.label}>Comentário:</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        multiline
        value={comentario}
        onChangeText={setComentario}
        placeholder="Atualize seu comentário..."
        textAlignVertical="top"
      />

      <TouchableOpacity style={styles.button} onPress={enviar} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Salvando..." : "Salvar Alterações"}</Text>
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
    fontSize: 22,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 24,
  },
  label: {
    color: colors.textLight,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    color: colors.textLight,
    backgroundColor: "#2a2a2a",
  },
  button: {
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 8,
    marginTop: 12,
  },
  buttonText: {
    color: colors.buttonText,
    textAlign: "center",
    fontWeight: "bold",
  },
});
