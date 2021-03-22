export interface Itinerary {
    id: number
    name: string
    status: string
    description: string
    createDate: Date
    deleteDate: Date
    author: Author
    estimatedDays: number
    views: number
    budget: number
    image: Image
    activities: Array<Activity>
    recommendedSeasons: Array<RecommendedSeason>
}

export interface Image {
    id: number
    name: string
    imageUrl: string
}

export interface Activity {
    id: number
    day: number
    title: string
    description: string
}

export interface Day {
    id: number
    day: number
    activities: Array<Activity>
}

export interface Author {
    id: number
    firstName: string
    email: string
    lastName: string
    username: string
}

export interface RecommendedSeason {
    id: number
    recommendedSeason: string
}