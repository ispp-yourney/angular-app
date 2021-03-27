export interface Itinerary {
    id: number;
    name: string;
    description: string;
    views: number;
    main_image: string;
    author_username: string;
}

export class ItineraryDto {
    name: string;
    description: string;
    status: string;
    budget: number;
    estimated_days: number;
    activities: number[];
    views: number;
    main_image: string;
    author: number;
    seasons: number[];

    constructor(name: string, description: string, budget: number, estimated_days: number, activities: number[],
        views: number, main_image: string, author: number, seasons: number[]) {
            this.name = name
            this.description = description;
            this.budget = budget;
            this.estimated_days = estimated_days;
            this.activities = activities;
            this.views = views;
            this.main_image = main_image;
            this.author = author;
            this.seasons = seasons;
    }
}

export class Activity {

    id: number;
    title: string;
    description: string;
    day: number;

}