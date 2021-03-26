export interface Itinerary {
    id: number
    name: string
    description: string
    status: string
    budget: number
    estimatedDays: number
    createDate: Date
    views: 5
    image: Image
    recommendedSeason: string
    activities: Array<Activity>
    author: Author
    calcPlan: number
    calcPromotion: number
    username: string
    imageUrl: string
}

export interface Image {
    id: number
    name: string
    imageUrl: string
}

export interface Activity {
    id: number
    title: string
    description: string
    day: number
    createDate: Date
    views: number
    landmak: Landmark
}

export interface Landmark {
    id: number
    name: string
    description: string
    price: number
    country: string
    city: string
    latitude: number
    longitude: number
    promoted: boolean
    category: string
    email: string
    phone: string
    website: string
    instagram: string
    twitter: string
    createDate: Date
    views: number
}

export interface Author {
    id: number
    username: string
    email: string
    firstName: string
    lastName: string
    expirationDate: Date
    plan: number
    roles: Array<Role>
}

export interface Role {
    id: number
    name: string
}