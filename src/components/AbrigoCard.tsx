import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../constants/colors";

type Props = {
  abrigo: {
    id: string;
    nome: string;
    endereco: string;
    cidade: string;
    estado: string;
  };
  onPress: () => void;
};

export default function AbrigoCard({ abrigo, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.nome}>{abrigo.nome}</Text>
      <Text style={styles.endereco}>
        {abrigo.endereco}, {abrigo.cidade} - {abrigo.estado}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background,
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  nome: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
  },
  endereco: {
    color: colors.textGray,
    marginTop: 4,
  },
});
