import React, { useState, useEffect } from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { fetchOpportunityById } from '../api/opportunitiesApi'
import { Opportunity, FormErrors, VolunteerFormData } from '../types'
import { VolunteerFormScreenProps } from '../navigation/types'
import { useTheme } from '../styles/ThemeContext'
import { AppColors } from '../styles/colors'

const VolunteerFormScreen: React.FC<VolunteerFormScreenProps> = ({ route, navigation }) => {
  const { colors } = useTheme()
  const styles = getStyles(colors)

  const { opportunityId } = route.params
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [submitting, setSubmitting] = useState<boolean>(false)
  
  const [formData, setFormData] = useState<VolunteerFormData>({
    name: '',
    email: '',
    phone: '',
    area: '',
    availability: '',
    message: ''
  })
  
  const [errors, setErrors] = useState<FormErrors>({})

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

  const handleChange = (field: keyof VolunteerFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const validate = (): boolean => {
    const newErrors: FormErrors = {}
    
    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório'
    if (!formData.email.trim()) newErrors.email = 'Email é obrigatório'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email inválido'
    
    if (!formData.phone.trim()) newErrors.phone = 'Telefone é obrigatório'
    if (!formData.availability.trim()) newErrors.availability = 'Disponibilidade é obrigatória'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validate()) {
      setSubmitting(true)
      
      setTimeout(() => {
        setSubmitting(false)
        Alert.alert(
          'Cadastro Enviado!',
          'Obrigado por se voluntariar! A organização entrará em contato em breve.',
          [
            { 
              text: 'OK', 
              onPress: () => navigation.navigate('HomeScreen') 
            }
          ]
        )
      }, 1500)
    }
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    )
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Cadastro para Voluntariado</Text>
          <Text style={styles.subtitle}>
            {opportunity ? opportunity.title : 'Carregando...'}
          </Text>
        </View>
        
        <View style={styles.formContainer}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Nome Completo *</Text>
            <TextInput
              style={[styles.input, errors.name && styles.inputError]}
              placeholder="Digite seu nome completo"
              value={formData.name}
              onChangeText={(value) => handleChange('name', value)}
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Email *</Text>
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              placeholder="Digite seu email"
              value={formData.email}
              onChangeText={(value) => handleChange('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Telefone *</Text>
            <TextInput
              style={[styles.input, errors.phone && styles.inputError]}
              placeholder="(00) 00000-0000"
              value={formData.phone}
              onChangeText={(value) => handleChange('phone', value)}
              keyboardType="phone-pad"
            />
            {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Área que gostaria de ajudar</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Organização, Divulgação, Logística"
              value={formData.area}
              onChangeText={(value) => handleChange('area', value)}
            />
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Disponibilidade *</Text>
            <TextInput
              style={[styles.input, errors.availability && styles.inputError]}
              placeholder="Ex: Finais de semana, Noites, Horário comercial"
              value={formData.availability}
              onChangeText={(value) => handleChange('availability', value)}
            />
            {errors.availability && <Text style={styles.errorText}>{errors.availability}</Text>}
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Mensagem (opcional)</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Conte-nos um pouco sobre você e por que deseja participar"
              value={formData.message}
              onChangeText={(value) => handleChange('message', value)}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
          
          <Text style={styles.requiredText}>* Campos obrigatórios</Text>
          
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            disabled={submitting}
          >
            {submitting ? (
              <ActivityIndicator size="small" color={colors.white} />
            ) : (
              <Text style={styles.submitButtonText}>Enviar Cadastro</Text>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
            disabled={submitting}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  header: {
    backgroundColor: colors.backgroundLight,
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.secondary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.secondary,
  },
  formContainer: {
    padding: 20,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.secondary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.backgroundInput,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.secondary,
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    color: colors.error,
    fontSize: 14,
    marginTop: 4,
  },
  textArea: {
    minHeight: 100,
  },
  requiredText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 20,
    fontStyle: 'italic',
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  cancelButtonText: {
    color: colors.secondary,
    fontSize: 18,
    fontWeight: '500',
  },
})

export default VolunteerFormScreen