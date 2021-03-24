export interface Itinerary {
    id: number;
    name: string;
    description: string;
    views: number;
    main_image: string;
    author_username: string;
}

export class ItineraryForm implements Itinerary {
    id: number;
    name: string;
    description: string;
    budget: number;
    estimated_days: number;
    views: number;
    main_image: string;
    author_username: string;

    constructor(id: number, name: string, description: string, budget: number, 
        estimated_days: number, views: number, main_image: string, author_username: string) {
            this.id = id;
            this.description = description;
            this.budget = budget;
            this.estimated_days = estimated_days;
            this.views = views;
            this.main_image = main_image;
            this.author_username = author_username;
    }
}
