export interface Itinerary {
    id: number;
    name: string;
    description: string;
    views: number;
    main_image: string;
    author_username: string;
}

export class ItineraryDto {
    id: number;
    name: string;
    description: string;
    budget: number;
    estimatedDays: number;
    image: string;
    recommendedSeason: string;

    constructor(id: number, name: string, description: string, budget: number, estimatedDays: number,
                image: string, recommendedSeason: string) {
            this.id = id;
            this.name = name
            this.description = description;
            this.budget = budget;
            this.estimatedDays = estimatedDays;
            this.image = image;
            this.recommendedSeason = recommendedSeason;
    }
}

export class Activity {
    id: number;
    title: string;
    description: string;
    day: number;
    itinerary: number;
    landmark: number;
    views: number;

}