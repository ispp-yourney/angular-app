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

export class ItineraryDto {
    id: number;
    name: string;
    description: string;
    estimatedDays: number;
    budget: number;
    image: string;
    recommendedSeason: string;

    constructor(id: number, name: string, description: string, budget: number,
                image: string, recommendedSeason: string) {
            this.id = id;
            this.name = name
            this.description = description;
            this.estimatedDays = 1;
            this.budget = budget;
            this.image = image;
            this.recommendedSeason = recommendedSeason;
    }
}

export class ActivityDto {
    id: number;
    title: string;
    description: string;
    day: number;
    itinerary: number;
    landmark: number;

    constructor(id: number, title: string, description: string, day: number,
        itinerary: number, landmark: number) {
    this.id = id;
    this.title = title
    this.description = description;
    this.day = day;
    this.itinerary = itinerary;
    this.landmark = landmark;
    }
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