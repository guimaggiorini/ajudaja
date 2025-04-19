import { Opportunity, SocialStats, IBGEState, IBGECity } from '../types'

export const fetchFeaturedOpportunities = (): Promise<Opportunity[]> => {
  return Promise.resolve(featuredOpportunities)
}

export const fetchAllOpportunities = (): Promise<Opportunity[]> => {
  return Promise.resolve([...featuredOpportunities, ...otherOpportunities])
}

export const fetchOpportunityById = (id: string): Promise<Opportunity | undefined> => {
  const allOpportunities = [...featuredOpportunities, ...otherOpportunities]
  const opportunity = allOpportunities.find(opp => opp.id === id)
  return Promise.resolve(opportunity)
}

export const fetchIBGEStates = async (): Promise<IBGEState[]> => {
  try {
    const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Erro ao buscar estados do IBGE:', error)
    return []
  }
}

export const fetchIBGECities = async (stateId: number): Promise<IBGECity[]> => {
  try {
    const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateId}/municipios?orderBy=nome`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Erro ao buscar cidades do IBGE:', error)
    return []
  }
}

const featuredOpportunities: Opportunity[] = [
  {
    id: '1',
    title: 'Campanha de Arrecadação de Alimentos',
    organization: 'Banco de Alimentos',
    category: 'Combate à Fome',
    location: 'São Paulo, SP',
    date: '15/06/2023',
    image: 'https://images.unsplash.com/photo-1593113630400-ea4288922497?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    description: 'Ajude a arrecadar alimentos não perecíveis para famílias em situação de vulnerabilidade social. Precisamos de voluntários para organizar as doações e montar as cestas básicas.',
    requirements: 'Disponibilidade aos sábados, das 9h às 13h.',
    contactPhone: '(11) 99999-9999',
    contactEmail: 'contato@bancodealimentos.org',
    website: 'https://www.bancodealimentos.org.br',
    isFeatured: true,
  },
  {
    id: '2',
    title: 'Abrigo de Animais - Cuidadores Voluntários',
    organization: 'Patinhas Felizes',
    category: 'Proteção Animal',
    location: 'Rio de Janeiro, RJ',
    date: 'Todos os finais de semana',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    description: 'Nosso abrigo precisa de voluntários para ajudar a cuidar dos animais resgatados. As atividades incluem alimentação, limpeza, passeios e carinho para os bichinhos.',
    requirements: 'Amor pelos animais e disponibilidade nos finais de semana.',
    contactPhone: '(21) 98888-8888',
    contactEmail: 'voluntarios@patinhasfelizes.org',
    website: 'https://www.patinhasfelizes.org',
    isFeatured: true,
  },
  {
    id: '3',
    title: 'Mutirão de Limpeza de Praia',
    organization: 'Oceano Limpo',
    category: 'Meio Ambiente',
    location: 'Salvador, BA',
    date: '22/06/2023',
    image: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    description: 'Participe do nosso mutirão de limpeza da Praia do Forte. Juntos podemos fazer a diferença para o meio ambiente e os animais marinhos.',
    requirements: 'Levar luvas e protetor solar. Recomendado uso de chapéu.',
    contactPhone: '(71) 97777-7777',
    contactEmail: 'acao@oceanolimpo.org',
    website: 'https://www.oceanolimpo.org',
    isFeatured: true,
  },
]

const otherOpportunities: Opportunity[] = [
  {
    id: '4',
    title: 'Aulas de Reforço para Crianças',
    organization: 'Educação para Todos',
    category: 'Educação',
    location: 'Belo Horizonte, MG',
    date: 'Segundas e Quartas, 14h às 16h',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    description: 'Procuramos voluntários para dar aulas de reforço em matemática e português para crianças do ensino fundamental.',
    requirements: 'Conhecimento nas disciplinas e experiência com crianças.',
    contactPhone: '(31) 96666-6666',
    contactEmail: 'voluntarios@educacaoparatodos.org',
    website: 'https://www.educacaoparatodos.org',
    isFeatured: false,
  },
  {
    id: '5',
    title: 'Doação de Sangue Coletiva',
    organization: 'Hemocentro Regional',
    category: 'Saúde',
    location: 'Curitiba, PR',
    date: '30/06/2023',
    image: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    description: 'Campanha de doação de sangue para abastecer os estoques do Hemocentro Regional. Uma doação pode salvar até 4 vidas!',
    requirements: 'Estar em boas condições de saúde, ter entre 16 e 69 anos e pesar mais de 50kg.',
    contactPhone: '(41) 95555-5555',
    contactEmail: 'doacao@hemocentro.org',
    website: 'https://www.hemocentro.org',
    isFeatured: false,
  },
  {
    id: '6',
    title: 'Construção de Casas Populares',
    organization: 'Teto Brasil',
    category: 'Habitação',
    location: 'Recife, PE',
    date: '15-17/07/2023',
    image: 'https://images.unsplash.com/photo-1503596476-1c12a8ba09a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    description: 'Ajude a construir casas de emergência para famílias em situação de extrema pobreza. Um final de semana de trabalho que transforma vidas.',
    requirements: 'Disposição para trabalho físico. Não é necessário conhecimento prévio em construção.',
    contactPhone: '(81) 94444-4444',
    contactEmail: 'voluntarios@tetobrasil.org',
    website: 'https://www.tetobrasil.org',
    isFeatured: false,
  },
  {
    id: '7',
    title: 'Campanha de Agasalho',
    organization: 'Solidariedade Inverno',
    category: 'Assistência Social',
    location: 'Porto Alegre, RS',
    date: 'Todo o mês de junho',
    image: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    description: 'Arrecadação de agasalhos, cobertores e roupas de inverno para pessoas em situação de rua durante o inverno.',
    requirements: 'Pode ajudar doando ou como voluntário nos pontos de coleta.',
    contactPhone: '(51) 93333-3333',
    contactEmail: 'contato@solidariedadeinverno.org',
    website: 'https://www.solidariedadeinverno.org',
    isFeatured: false,
  },
  {
    id: '8',
    title: 'Plantio de Árvores Nativas',
    organization: 'Refloresta Brasil',
    category: 'Meio Ambiente',
    location: 'Brasília, DF',
    date: '08/07/2023',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    description: 'Participe do plantio de mudas de árvores nativas do Cerrado para recuperação de áreas degradadas.',
    requirements: 'Levar água, protetor solar e roupas adequadas para atividade ao ar livre.',
    contactPhone: '(61) 92222-2222',
    contactEmail: 'acao@reflorestabrasil.org',
    website: 'https://www.reflorestabrasil.org',
    isFeatured: false,
  },
]