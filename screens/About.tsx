import React from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  Linking,
  Alert
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Developer } from '../types'
import { useTheme } from '../styles/ThemeContext'
import { AppColors } from '../styles/colors'

const AboutScreen: React.FC = () => {
  const developers: Developer[] = [
    {
      id: '1',
      name: 'Arhur Mariano',
      role: 'Desenvolvedor FullStack',
      image: 'https://github.com/arthvm.png',
      bio: 'Entusiasta de tecnologia, sempre em busca de inovação e aprendizado contínuo.',
      github: 'https://github.com/arthvm',
      linkedin: 'https://linkedin.com/in/arthvm',
    },
    {
      id: '2',
      name: 'Guilherme Maggiorini',
      role: 'Desenvolvedor FrontEnd',
      image: 'https://github.com/guimaggiorini.png',
      bio: 'Focado em criar interfaces acessíveis e intuitivas, transformando ideias em realidade.',
      github: 'https://github.com/guimaggiorini',
      linkedin: 'https://linkedin.com/in/guimaggiorini',
    },
    {
      id: '3',
      name: 'Ian Braga',
      role: 'Desenvolvedor BackEnd',
      image: 'https://github.com/iannrb.png',
      bio: 'Explorador de novas tecnologias, apaixonado por facilitar a vida de outras pessoas.',
      github: 'https://github.com/iannrb',
      linkedin: 'https://linkedin.com/in/ianrossato',
    },
  ]

  const { colors } = useTheme()
  const styles = getStyles(colors)

  const handleSocialPress = async (url: string) => {
    const supported = await Linking.canOpenURL(url)
    
    if (supported) {
      await Linking.openURL(url)
    } else {
      Alert.alert('Erro', `Não foi possível abrir o link: ${url}`)
    }
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nossa Missão</Text>
        <Text style={styles.text}>
          Conectar pessoas a oportunidades de voluntariado e doações em suas cidades, 
          facilitando o engajamento em causas sociais e promovendo um impacto positivo 
          na sociedade.
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Como Funciona</Text>
        <View style={styles.stepContainer}>
          <View style={styles.stepCircle}>
            <Text style={styles.stepNumber}>1</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Encontre Oportunidades</Text>
            <Text style={styles.stepText}>
              Navegue pelas diversas oportunidades de voluntariado e doações disponíveis em sua região.
            </Text>
          </View>
        </View>
        
        <View style={styles.stepContainer}>
          <View style={styles.stepCircle}>
            <Text style={styles.stepNumber}>2</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Cadastre-se</Text>
            <Text style={styles.stepText}>
              Preencha um formulário simples para se candidatar como voluntário ou fazer uma doação.
            </Text>
          </View>
        </View>
        
        <View style={styles.stepContainer}>
          <View style={styles.stepCircle}>
            <Text style={styles.stepNumber}>3</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Faça a Diferença</Text>
            <Text style={styles.stepText}>
              Participe das ações e ajude a transformar vidas e comunidades.
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Equipe de Desenvolvimento</Text>
        {developers.map((developer) => (
          <View key={developer.id} style={styles.developerCard}>
            <Image 
              source={{ uri: developer.image }} 
              style={styles.developerImage} 
              resizeMode="cover"
            />
            <View style={styles.developerInfo}>
              <Text style={styles.developerName}>{developer.name}</Text>
              <Text style={styles.developerRole}>{developer.role}</Text>
              <Text style={styles.developerBio}>{developer.bio}</Text>
              <View style={styles.socialLinks}>
                <TouchableOpacity 
                  style={styles.socialButton}
                  onPress={() => handleSocialPress(developer.github)}
                >
                  <Ionicons name="logo-github" size={24} color={colors.secondary} />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.socialButton}
                  onPress={() => handleSocialPress(developer.linkedin)}
                >
                  <Ionicons name="logo-linkedin" size={24} color={colors.secondary} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

const getStyles = (colors: AppColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.backgroundLight,
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.secondary,
    textAlign: 'center',
  },
  section: {
    padding: 20,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.secondary,
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    color: colors.secondary,
    lineHeight: 24,
    marginBottom: 16,
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  stepNumber: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.secondary,
    marginBottom: 4,
  },
  stepText: {
    fontSize: 16,
    color: colors.secondary,
    lineHeight: 22,
  },
  developerCard: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundInput,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  developerImage: {
    width: 100,
    height: 170,
  },
  developerInfo: {
    flex: 1,
    padding: 12,
  },
  developerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.secondary,
    marginBottom: 4,
  },
  developerRole: {
    fontSize: 14,
    color: colors.primary,
    marginBottom: 8,
  },
  developerBio: {
    fontSize: 14,
    color: colors.secondary,
    lineHeight: 20,
    marginBottom: 8,
  },
  socialLinks: {
    flexDirection: 'row',
  },
  socialButton: {
    marginRight: 16,
  }
})

export default AboutScreen