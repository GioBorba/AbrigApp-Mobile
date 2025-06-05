import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../constants/colors";

type Props = {
  autor: string;
  comentario: string;
  nota: number;
  data: string;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function AvaliacaoCard({
  autor,
  comentario,
  nota,
  data,
  onEdit,
  onDelete,
}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.autor}>{autor}</Text>
      <Text style={styles.comentario}>{comentario}</Text>
      <Text style={styles.nota}>Nota: {nota}/5</Text>
      <Text style={styles.data}>{new Date(data).toLocaleDateString()}</Text>

      {(onEdit || onDelete) && (
        <View style={styles.botoes}>
          {onEdit && (
            <TouchableOpacity onPress={onEdit} style={styles.botao}>
              <Text style={styles.botaoTexto}>Editar</Text>
            </TouchableOpacity>
          )}
          {onDelete && (
            <TouchableOpacity onPress={onDelete} style={[styles.botao, { backgroundColor: "#800000" }]}>
              <Text style={styles.botaoTexto}>Excluir</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#2a2a2a",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderColor: colors.border,
    borderWidth: 1,
  },
  autor: {
    fontWeight: "bold",
    color: colors.primary,
  },
  comentario: {
    color: colors.textLight,
    marginVertical: 4,
  },
  nota: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  data: {
    color: colors.textGray,
    fontSize: 12,
    marginBottom: 8,
  },
  botoes: {
    flexDirection: "row",
    gap: 12,
  },
  botao: {
    backgroundColor: colors.primary,
    padding: 8,
    borderRadius: 6,
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
  },
});
