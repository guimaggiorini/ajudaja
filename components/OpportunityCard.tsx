import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Opportunity } from '../types'
import { useTheme } from '../styles/ThemeContext'
import { AppColors } from '../styles/colors'

interface OpportunityCardProps {
  opportunity: Opportunity
  onPress: () => void
  featured?: boolean
}

const OpportunityCard: React.FC<OpportunityCardProps> = ({ opportunity, onPress, featured = false }) => {
  const { colors } = useTheme()
  const styles = getStyles(colors)

  return (
    <TouchableOpacity 
      style={[styles.card, featured && styles.featuredCard]} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      {featured && (
        <View style={styles.featuredBadge}>
          <Text style={styles.featuredText}>Destaque</Text>
        </View>
      )}
      <Image 
        source={{ uri: opportunity.image }} 
        style={styles.image} 
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{opportunity.title}</Text>
        <Text style={styles.organization}>{opportunity.organization}</Text>
        
        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={16} color={colors.secondary} />
          <Text style={styles.infoText}>{opportunity.location}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Ionicons name="calendar-outline" size={16} color={colors.secondary} />
          <Text style={styles.infoText}>{opportunity.date}</Text>
        </View>
        
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{opportunity.category}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const getStyles = (colors: AppColors) => StyleSheet.create({
  card: {
    backgroundColor: colors.background,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 3,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  featuredBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  featuredCard: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  featuredText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 150,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.secondary,
    marginBottom: 4,
  },
  organization: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  categoryBadge: {
    backgroundColor: colors.badge,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  categoryText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '500',
  },
})

export default OpportunityCard