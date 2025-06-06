// app/avaliacoes/nova.tsx
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { AvaliacaoService } from "../../src/services/AvaliacaoService";
import { auth } from "../../src/services/firebase";
import { colors } from "../../src/constants/colors";

export default function NovaAvaliacao() {
  const { abrigoId } = useLocalSearchParams();
  const router = useRouter();

  const [comentario, setComentario] = useState("");
  const [nota, setNota] = useState("5");
  const [loading, setLoading] = useState(false);

  const enviar = async () => {
    if (!comentario || !nota) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    const notaNumero = parseInt(nota);
    if (isNaN(notaNumero) || notaNumero < 1 || notaNumero > 5) {
      Alert.alert("Erro", "A nota deve ser um número entre 1 e 5.");
      return;
    }

    try {
      setLoading(true);
      const token = await auth.currentUser?.getIdToken();
      await AvaliacaoService.criar({ abrigoId: String(abrigoId), comentario, nota: notaNumero }, token!);
      Alert.alert("Sucesso", "Avaliação enviada!");
      router.replace(`/(abrigos)/${abrigoId}`);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível enviar a avaliação.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova Avaliação</Text>

      <Text style={styles.label}>Nota (1 a 5):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        maxLength={1}
        value={nota}
        onChangeText={setNota}
      />

      <Text style={styles.label}>Comentário:</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        multiline
        textAlignVertical="top"
        value={comentario}
        onChangeText={setComentario}
        placeholder="Descreva sua experiência..."
      />

      <TouchableOpacity style={styles.button} onPress={enviar} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Enviando..." : "Enviar Avaliação"}</Text>
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
