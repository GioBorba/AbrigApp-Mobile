// src/components/AvaliacaoCard.tsx
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../constants/colors";

type Props = {
  autor: string;
  comentario: string;
  nota: number;
  data: string;
};

export default function AvaliacaoCard({ autor, comentario, nota, data }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.autor}>Por: {autor}</Text>
      <Text style={styles.comentario}>{comentario}</Text>
      <Text style={styles.nota}>Nota: {nota}</Text>
      <Text style={styles.data}>{new Date(data).toLocaleDateString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  autor: {
    fontWeight: "bold",
    color: colors.primary,
  },
  comentario: {
    marginTop: 4,
    color: colors.textLight,
  },
  nota: {
    marginTop: 6,
    color: colors.secondary,
  },
  data: {
    marginTop: 4,
    color: colors.textGray,
    fontSize: 12,
  },
});
