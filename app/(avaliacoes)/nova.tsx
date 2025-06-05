import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { getIdToken } from "firebase/auth";
import { auth } from "../../src/services/firebase";
import { colors } from "../../src/constants/colors";
import { AvaliacaoService } from "../../src/services/AvaliacaoService";

export default function NovaAvaliacao() {
  const router = useRouter();
  const { abrigoId } = useLocalSearchParams();

  const [nota, setNota] = useState("");
  const [comentario, setComentario] = useState("");

  const handleEnviar = async () => {
    if (!nota || !comentario) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    const notaInt = parseInt(nota);
    if (isNaN(notaInt) || notaInt < 1 || notaInt > 5) {
      Alert.alert("Erro", "Nota deve ser um número entre 1 e 5.");
      return;
    }

    try {
      const user = auth.currentUser;
      if (!user) throw new Error("Usuário não autenticado.");
      const token = await getIdToken(user);

      await AvaliacaoService.criar({ abrigoId: String(abrigoId), nota: notaInt, comentario }, token);

      Alert.alert("Sucesso", "Avaliação enviada com sucesso.");
      router.replace(`/abrigos/${abrigoId}`);
    } catch (error: any) {
      Alert.alert("Erro", error?.response?.data?.message || error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova Avaliação</Text>

      <TextInput
        style={styles.input}
        placeholder="Nota (1 a 5)"
        placeholderTextColor={colors.textGray}
        value={nota}
        onChangeText={setNota}
        keyboardType="numeric"
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Comentário"
        placeholderTextColor={colors.textGray}
        value={comentario}
        onChangeText={setComentario}
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity style={styles.button} onPress={handleEnviar}>
        <Text style={styles.buttonText}>Enviar Avaliação</Text>
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
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 24,
  },
  input: {
    backgroundColor: "#2a2a2a",
    color: colors.textLight,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 8,
    marginTop: 8,
  },
  buttonText: {
    color: colors.buttonText,
    fontWeight: "bold",
    textAlign: "center",
  },
});
