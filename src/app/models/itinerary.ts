import { Comment } from "./comment";

export interface Itinerary {
    id: number
    name: string
    description: string
    status: string
    budget: number
    estimatedDays: number
    createDate: Date
    views: number
    image: Image
    recommendedSeason: string
    activities: Array<Activity>
    author: Author
    calcPlan: number
    calcPromotion: number
    username: string
    imageUrl: string
    comments: Array<Comment>
    avgRating:number
}

export class ItineraryDto {
    id: number;
    name: string;
    description: string;
    estimatedDays: number;
    budget: number;
    recommendedSeason: string;
    status: string;

    constructor(id: number, name: string, description: string, estimatedDays:number ,budget: number,
                recommendedSeason: string, status: string) {
            this.id = id;
            this.name = name
            this.description = description;
            this.estimatedDays = estimatedDays;
            this.budget = budget;
            this.recommendedSeason = recommendedSeason;
            this.status = status;
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
    landmark: Landmark
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
    endPromotionDate: Date
    category: string
    email: string
    phone: string
    website: string
    instagram: string
    twitter: string
    createDate: Date
    views: number
    image:Image
}

export class LandmarkDto  {
    id: number
    name: string
    description: string
    price: number
    country: string
    city: string
    latitude: number
    longitude: number
    category: string
    email: string
    phone: string
    website: string
    instagram: string
    twitter: string
    activity: number
    landmarkImage: File

    constructor(id: number, name: string, description: string, price: number, country: string, city: string, latitude: number, longitude: number,
        category: string, email: string, phone: string, website: string, instagram: string, twitter: string, activity: number) {
    this.id = id;
    this.name = name
    this.description = description;
    this.price = price;
    this.country = country;
    this.city = city;
    this.latitude = latitude;
    this.longitude = longitude;
    this.category = category;
    this.email = email;
    this.phone = phone;
    this.website = website;
    this.instagram = instagram;
    this.twitter = twitter;
    this.activity = activity;
        }
}

export class UpgradeLandmarkDto {
    text: string

    constructor(text: string){
        this.text = text
    }
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
    image: Image
    imageUrl: string
}

export interface Role {
    id: number
    name: string
}