export interface Opportunity {
    id: string
    title: string
    organization: string
    category: string
    location: string
    date: string
    image: string
    description: string
    requirements: string
    contactPhone: string
    contactEmail: string
    website: string
    isFeatured: boolean
  }
  
  export interface Developer {
    id: string
    name: string
    role: string
    image: string
    bio: string
    github: string
    linkedin: string
  }
  
  export interface Category {
    id: string
    title: string
    icon: string
  }
  
  export interface IBGERegion {
    id: number
    nome: string
    sigla: string
  }
  
  export interface IBGEState {
    id: number
    nome: string
    sigla: string
    regiao: IBGERegion
  }
  
  export interface IBGECity {
    id: number
    nome: string
  }
  
  export interface SocialStats {
    region: string
    volunteerCount: number
    organizationCount: number
    peopleHelped: number
  }
  
  export interface VolunteerFormData {
    name: string
    email: string
    phone: string
    area: string
    availability: string
    message: string
  }
  
  export interface FormErrors {
    name?: string
    email?: string
    phone?: string
    availability?: string
    [key: string]: string | undefined
  }