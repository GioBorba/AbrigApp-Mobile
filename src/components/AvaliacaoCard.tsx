import { View, Text, StyleSheet } from "react-native";
import { colors } from "../constants/colors";
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Props = {
  comentario: string;
  nota: number;
  data: string;
};

export default function AvaliacaoCard({ comentario, nota, data }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.conteudo}>Comentário:</Text>
      <Text style={styles.comentario}>{comentario}</Text>
      <Text style={styles.nota}>Nota: {nota} <MaterialCommunityIcons name="star" color={colors.primary} /></Text>
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
  conteudo: {
    color: colors.primary,
    fontWeight: "bold"
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
