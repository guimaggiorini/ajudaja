import React, { useState, useEffect } from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import CategoryButton from '../components/CategoryButton'
import { 
  fetchFeaturedOpportunities, 
  fetchIBGEStates 
} from '../api/opportunitiesApi'
import { Opportunity, IBGEState } from '../types'
import { HomeScreenProps, RootStackParamList, TabParamList } from '../navigation/types'
import OpportunityCard from '../components/OpportunityCard'
import { AppColors } from '../styles/colors'
import { useTheme } from '../styles/ThemeContext'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const { colors } = useTheme()
  const styles = getStyles(colors)

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const tabNavigation = useNavigation<BottomTabNavigationProp<TabParamList>>()

  const [featuredOpportunities, setFeaturedOpportunities] = useState<Opportunity[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos')
  const [states, setStates] = useState<IBGEState[]>([])

  useEffect(() => {
    const loadData = async () => {
      try {
        const opportunitiesData = await fetchFeaturedOpportunities()
        setFeaturedOpportunities(opportunitiesData)
        
        const statesData = await fetchIBGEStates()
        setStates(statesData)
        
        setLoading(false)
      } catch (error) {
        console.error('Erro ao carregar dados:', error)
        setLoading(false)
        Alert.alert('Erro', 'Não foi possível carregar os dados. Tente novamente mais tarde.')
      }
    }

    loadData()
  }, [])

  const categories: { id: string, title: string, icon: keyof typeof Ionicons.glyphMap }[] = [
    { id: '1', title: 'Todos', icon: 'grid-outline' },
    { id: '2', title: 'Combate à Fome', icon: 'fast-food-outline' },
    { id: '3', title: 'Proteção Animal', icon: 'paw-outline' },
    { id: '4', title: 'Meio Ambiente', icon: 'leaf-outline' },
    { id: '5', title: 'Educação', icon: 'book-outline' },
    { id: '6', title: 'Saúde', icon: 'medical-outline' },
  ]

  const filteredOpportunities = selectedCategory === 'Todos' 
    ? featuredOpportunities 
    : featuredOpportunities.filter(opp => opp.category === selectedCategory)

  const handleOpportunityPress = (opportunity: Opportunity) => {
    navigation.navigate('OpportunityDetails', { opportunityId: opportunity.id })
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.bannerContainer}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }} 
          style={styles.bannerImage}
          resizeMode="cover"
        />
      </View>

      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeTitle}>Bem vindo! 👋</Text>
        <Text style={styles.welcomeText}>
          Descubra ONGs perto de você e faça a diferença como voluntário. Sua ajuda transforma vidas!
        </Text> 
      </View>

      <Text style={styles.sectionTitle}>Categorias</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map((category) => (
          <CategoryButton 
            key={category.id}
            title={category.title}
            icon={category.icon}
            isSelected={selectedCategory === category.title}
            onPress={() => setSelectedCategory(category.title)}
          />
        ))}
      </ScrollView>

      <View style={styles.opportunitiesSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Oportunidades em Destaque</Text>
          <TouchableOpacity 
            style={styles.viewAllButton}
            onPress={() => tabNavigation.navigate('Oportunidades')}
          >
            <Text style={styles.viewAllText}>Ver Todas</Text>
            <Ionicons name="arrow-forward" size={16} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />
        ) : filteredOpportunities.length > 0 ? (
          filteredOpportunities.map((opportunity) => (
            <OpportunityCard 
              key={opportunity.id}
              opportunity={opportunity}
              featured={true}
              onPress={() => handleOpportunityPress(opportunity)}
            />
          ))
        ) : (
          <Text style={styles.noResultsText}>
            Nenhuma oportunidade encontrada nesta categoria.
          </Text>
        )}
      </View>

      <View style={styles.impactSection}>
        <Text style={styles.impactTitle}>Nosso Impacto</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>1.148+</Text>
            <Text style={styles.statLabel}>Voluntários</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>148+</Text>
            <Text style={styles.statLabel}>ONGs</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>51.479+</Text>
            <Text style={styles.statLabel}>Pessoas Ajudadas</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const getStyles = (colors: AppColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  bannerContainer: {
    position: 'relative',
    height: 200,
    width: '100%',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(93, 87, 107, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  bannerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 8,
  },
  bannerSubtitle: {
    fontSize: 16,
    color: colors.white,
    textAlign: 'center',
  },
  welcomeSection: {
    padding: 20,
    backgroundColor: colors.backgroundLight,
    borderRadius: 12,
    margin: 16,
    marginTop: -20,
    elevation: 4,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.secondary,
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 16,
    color: colors.secondary,
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.secondary,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
  },
  statesContainer: {
    marginBottom: 16,
  },
  statesContent: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  stateButton: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    minWidth: 50,
    alignItems: 'center',
  },
  stateText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
  categoriesContainer: {
    marginBottom: 16,
  },
  categoriesContent: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  opportunitiesSection: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    color: colors.primary,
    marginRight: 4,
  },
  loader: {
    marginVertical: 20,
  },
  smallLoader: {
    marginVertical: 10,
    alignSelf: 'center',
  },
  noResultsText: {
    textAlign: 'center',
    color: colors.textSecondary,
    marginVertical: 20,
    fontSize: 16,
  },
  impactSection: {
    backgroundColor: colors.backgroundLight,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 12,
  },
  impactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.secondary,
    marginBottom: 16,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: colors.secondary,
  },
})

export default HomeScreen