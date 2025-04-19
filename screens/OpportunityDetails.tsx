import React, { useState, useEffect } from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  Linking,
  ActivityIndicator,
  Alert
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { fetchOpportunityById } from '../api/opportunitiesApi'
import { Opportunity } from '../types'
import { OpportunityDetailsScreenProps } from '../navigation/types'
import { useTheme } from '../styles/ThemeContext'
import { AppColors } from '../styles/colors'

const OpportunityDetailsScreen: React.FC<OpportunityDetailsScreenProps> = ({ route, navigation }) => {
  const { colors } = useTheme()
  const styles = getStyles(colors)

  const { opportunityId } = route.params
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const loadOpportunity = async () => {
      try {
        const data = await fetchOpportunityById(opportunityId)
        if (data) {
          setOpportunity(data)
        }
        setLoading(false)
      } catch (error) {
        console.error('Error loading opportunity details:', error)
        setLoading(false)
        Alert.alert('Erro', 'Não foi possível carregar os detalhes da oportunidade.')
      }
    }

    loadOpportunity()
  }, [opportunityId])

  const handleVolunteerPress = () => {
    navigation.navigate('VolunteerForm', { opportunityId: opportunityId })
  }

  const handleWebsitePress = async (url: string) => {
    const supported = await Linking.canOpenURL(url)
    
    if (supported) {
      await Linking.openURL(url)
    } else {
      Alert.alert('Erro', `Não foi possível abrir o link: ${url}`)
    }
  }

  const handleContactPress = (type: 'phone' | 'email', value: string) => {
    let url: string
    
    if (type === 'phone') {
      url = `tel:${value}`
    } else {
      url = `mailto:${value}`
    }
    
    Linking.openURL(url).catch(() => {
      Alert.alert('Erro', `Não foi possível ${type === 'phone' ? 'ligar' : 'enviar email'}.`)
    })
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    )
  }

  if (!opportunity) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Oportunidade não encontrada.</Text>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Image 
        source={{ uri: opportunity.image }} 
        style={styles.image} 
        resizeMode="cover"
      />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{opportunity.category}</Text>
          </View>
          <Text style={styles.title}>{opportunity.title}</Text>
          <Text style={styles.organization}>{opportunity.organization}</Text>
        </View>
        
        <View style={styles.infoSection}>
          <View style={styles.infoItem}>
            <Ionicons name="location-outline" size={20} color={colors.secondary} />
            <Text style={styles.infoText}>{opportunity.location}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Ionicons name="calendar-outline" size={20} color={colors.secondary} />
            <Text style={styles.infoText}>{opportunity.date}</Text>
          </View>
        </View>
        
        <View>
          <Text style={styles.sectionTitle}>Descrição</Text>
          <Text style={styles.description}>{opportunity.description}</Text>
        </View>
        
        <View>
          <Text style={styles.sectionTitle}>Requisitos</Text>
          <Text style={styles.description}>{opportunity.requirements}</Text>
        </View>
        
        <View>
          <Text style={styles.sectionTitle}>Contato</Text>
          <TouchableOpacity 
            style={styles.contactItem}
            onPress={() => handleContactPress('phone', opportunity.contactPhone)}
          >
            <Ionicons name="call-outline" size={20} color={colors.secondary} />
            <Text style={styles.contactText}>{opportunity.contactPhone}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.contactItem}
            onPress={() => handleContactPress('email', opportunity.contactEmail)}
          >
            <Ionicons name="mail-outline" size={20} color={colors.secondary} />
            <Text style={styles.contactText}>{opportunity.contactEmail}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.contactItem, styles.websiteButton]}
            onPress={() => handleWebsitePress(opportunity.website)}
          >
            <Ionicons name="globe-outline" size={20} color={colors.secondary}  />
            <Text style={styles.websiteButtonText}>Visitar</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={styles.volunteerButton}
          onPress={handleVolunteerPress}
        >
          <Text style={styles.volunteerButtonText}>Quero Ajudar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const getStyles = (colors: AppColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.background,
  },
  errorText: {
    fontSize: 18,
    color: colors.secondary,
    marginBottom: 20,
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  backButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '500',
  },
  image: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: 20,
    gap: 16,
  },
  header: {
    marginBottom: 16,
  },
  categoryBadge: {
    backgroundColor: colors.backgroundLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  categoryText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.secondary,
    marginBottom: 8,
  },
  organization: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  infoSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.backgroundLight,
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    fontWeight: 'semibold',
    color: colors.textSecondary,
    marginLeft: 8,
  },
  section: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.secondary,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginLeft: 8,
  },
  websiteButton: {
    borderWidth: 2,
    borderColor: colors.secondary,
    borderRadius: 12,
    paddingVertical: 16,
    justifyContent: 'center',
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  websiteButtonText: {
    color: colors.secondary,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  volunteerButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  volunteerButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
})

export default OpportunityDetailsScreen