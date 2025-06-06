import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  RefreshControl
} from "react-native";
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "expo-router";
import AbrigoCard from "../../src/components/AbrigoCard";
import { AbrigoService, Abrigo } from "../../src/services/AbrigoService";
import { colors } from "../../src/constants/colors";
import { useApiStatus } from "../../src/services/useApiStatus";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Abrigos() {
  const [abrigos, setAbrigos] = useState<Abrigo[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { apiOnline, checking } = useApiStatus("https://abrigapp.onrender.com/api/abrigos");

  const carregarAbrigos = async () => {
    try {
      if(!isRefreshing) setLoading(true);
      const dados = await AbrigoService.listarTodos();
      setAbrigos(dados);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os abrigos.");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    carregarAbrigos();
  }

  useEffect(() => {
    if (apiOnline) {
      carregarAbrigos();
    }
  }, [apiOnline]);

  const filteredAbrigos = useMemo(() => {
    if (!searchQuery) {
      return abrigos;
    }
    return abrigos.filter((abrigo) =>
      abrigo.nome.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [abrigos, searchQuery]);

  const LoadingState = () => (
    <View style={styles.centeredContainer}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.infoText}>
        {checking ? "Conectando à API..." : "Carregando abrigos..."}
      </Text>
    </View>
  );

  const EmptyState = () => (
     <View style={styles.centeredContainer}>
        <MaterialCommunityIcons name="home-search-outline" size={60} color={colors.textGray} />
        <Text style={styles.infoText}>
          {searchQuery ? "Nenhum abrigo encontrado" : "Não há abrigos disponíveis no momento."}
        </Text>
      </View>
  )

  if (checking || loading) {
    return <LoadingState />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={28} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Abrigos Disponíveis</Text>
      </View>

      <View style={styles.searchContainer}>
        <MaterialCommunityIcons name="magnify" size={22} color={colors.textGray} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por nome do abrigo..."
          placeholderTextColor={colors.textGray}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredAbrigos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AbrigoCard abrigo={item} onPress={() => router.push(`/(abrigos)/${item.id}`)} />
        )}
        contentContainerStyle={styles.listContentContainer}
        ListEmptyComponent={!loading && <EmptyState />}
        refreshControl={
            <RefreshControl
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
                tintColor={colors.primary}
            />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  title: {
    fontSize: 24,
    color: colors.textLight,
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 10,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 45,
    color: colors.textLight,
    fontSize: 16,
  },
  listContentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  infoText: {
    color: colors.textGray,
    marginTop: 16,
    fontSize: 16,
    textAlign: "center",
  },
});