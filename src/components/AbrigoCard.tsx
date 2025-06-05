import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../constants/colors";

type Abrigo = {
  id: string;
  nome: string;
  endereco: string;
};

type Props = {
  abrigo: Abrigo;
  onPress: () => void;
};

export default function AbrigoCard({ abrigo, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.nome}>{abrigo.nome}</Text>
      <Text style={styles.endereco}>{abrigo.endereco}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#2a2a2a",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  nome: {
    color: colors.textLight,
    fontSize: 18,
    fontWeight: "bold",
  },
  endereco: {
    color: colors.textGray,
    marginTop: 4,
  },
});
