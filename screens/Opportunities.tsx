import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CategoryButton from "../components/CategoryButton";
import {
  fetchAllOpportunities,
  fetchIBGEStates,
} from "../api/opportunitiesApi";
import { Opportunity, IBGEState } from "../types";
import { OpportunitiesScreenProps } from "../navigation/types";
import OpportunityCard from "../components/OpportunityCard";
import { useTheme } from "../styles/ThemeContext";
import { AppColors } from "../styles/colors";

function OpportunitiesScreen({ navigation }: OpportunitiesScreenProps) {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState<
    Opportunity[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [states, setStates] = useState<IBGEState[]>([]);
  const [selectedState, setSelectedState] = useState<string>("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const opportunitiesData = await fetchAllOpportunities();
        setOpportunities(opportunitiesData);
        setFilteredOpportunities(opportunitiesData);

        const statesData = await fetchIBGEStates();
        setStates(statesData);

        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        setLoading(false);
        Alert.alert(
          "Erro",
          "Não foi possível carregar os dados. Tente novamente mais tarde.",
        );
      }
    };

    loadData();
  }, []);

  const categories: {
    id: string;
    title: string;
    icon: keyof typeof Ionicons.glyphMap;
  }[] = [
      { id: "1", title: "Todos", icon: "grid-outline" },
      { id: "2", title: "Combate à Fome", icon: "fast-food-outline" },
      { id: "3", title: "Proteção Animal", icon: "paw-outline" },
      { id: "4", title: "Meio Ambiente", icon: "leaf-outline" },
      { id: "5", title: "Educação", icon: "book-outline" },
      { id: "6", title: "Saúde", icon: "medical-outline" },
      { id: "7", title: "Habitação", icon: "home-outline" },
      { id: "8", title: "Assistência Social", icon: "people-outline" },
    ];

  useEffect(() => {
    filterOpportunities();
  }, [searchQuery, selectedCategory, selectedState, opportunities]);

  const filterOpportunities = () => {
    let filtered = opportunities;

    if (selectedCategory !== "Todos") {
      filtered = filtered.filter((opp) => opp.category === selectedCategory);
    }

    if (selectedState) {
      filtered = filtered.filter((opp) => {
        const state = opp.location.split(",")[1]?.trim();
        return state === selectedState;
      });
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (opp) =>
          opp.title.toLowerCase().includes(query) ||
          opp.organization.toLowerCase().includes(query) ||
          opp.location.toLowerCase().includes(query),
      );
    }

    setFilteredOpportunities(filtered);
  };

  const handleOpportunityPress = (opportunity: Opportunity) => {
    navigation.navigate("OpportunityDetails", {
      opportunityId: opportunity.id,
    });
  };

  const renderOpportunityItem = ({ item }: { item: Opportunity }) => (
    <OpportunityCard
      opportunity={item}
      featured={item.isFeatured}
      onPress={() => handleOpportunityPress(item)}
    />
  );

  const handleStateSelect = (state: IBGEState) => {
    setSelectedState(state.sigla);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons
          name="search-outline"
          size={20}
          color={colors.textSecondary}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar oportunidades..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={colors.textSecondary}
        />
        {searchQuery ? (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Ionicons
              name="close-circle"
              size={20}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        ) : null}
      </View>

      <View style={styles.filtersContainer}>
        <Text style={styles.filterTitle}>Filtrar por Estado:</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.statesContent}
        >
          <TouchableOpacity
            style={[
              styles.stateButton,
              !selectedState && styles.selectedStateButton,
            ]}
            onPress={() => setSelectedState("")}
          >
            <Text
              style={[
                styles.stateText,
                !selectedState && styles.selectedStateText,
              ]}
            >
              Todos
            </Text>
          </TouchableOpacity>

          {states.map((state) => (
            <TouchableOpacity
              key={state.id}
              style={[
                styles.stateButton,
                selectedState === state.sigla && styles.selectedStateButton,
              ]}
              onPress={() => handleStateSelect(state)}
            >
              <Text
                style={[
                  styles.stateText,
                  selectedState === state.sigla && styles.selectedStateText,
                ]}
              >
                {state.sigla}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CategoryButton
              title={item.title}
              icon={item.icon}
              isSelected={selectedCategory === item.title}
              onPress={() => setSelectedCategory(item.title)}
            />
          )}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color={colors.primary}
          style={styles.loader}
        />
      ) : (
        <FlatList
          data={filteredOpportunities}
          renderItem={renderOpportunityItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.opportunitiesList}
          ListEmptyComponent={
            <Text style={styles.noResultsText}>
              Nenhuma oportunidade encontrada. Tente outros filtros.
            </Text>
          }
        />
      )}
    </View>
  );
}

const getStyles = (colors: AppColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.backgroundLight,
      borderRadius: 12,
      margin: 16,
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    searchIcon: {
      marginRight: 8,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      color: colors.secondary,
      paddingVertical: 8,
    },
    filtersContainer: {
      marginHorizontal: 16,
      marginBottom: 8,
    },
    filterTitle: {
      fontSize: 14,
      fontWeight: "500",
      color: colors.secondary,
      marginBottom: 8,
    },
    statesContent: {
      paddingBottom: 8,
    },
    stateButton: {
      backgroundColor: colors.backgroundLight,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      marginRight: 8,
    },
    selectedStateButton: {
      backgroundColor: colors.secondary,
    },
    stateText: {
      color: colors.secondary,
      fontSize: 12,
      fontWeight: "500",
    },
    selectedStateText: {
      color: colors.white,
    },
    categoriesContainer: {
      marginBottom: 8,
    },
    categoriesList: {
      paddingHorizontal: 16,
      paddingBottom: 8,
    },
    opportunitiesList: {
      paddingHorizontal: 16,
      paddingBottom: 16,
    },
    loader: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    noResultsText: {
      textAlign: "center",
      color: colors.textSecondary,
      marginTop: 40,
      fontSize: 16,
    },
  });

export default OpportunitiesScreen;
