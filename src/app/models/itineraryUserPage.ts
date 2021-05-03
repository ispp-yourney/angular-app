import { Itinerary, Landmark } from "./itinerary";

export interface ItineraryUserPage {
    content: Itinerary[];
    numberOfElements: number;
    totalPages: number;
    totalElements:number;
}

export interface LandmarkPage {
    content: Landmark[];
    numberOfElements: number;
    totalPages: number;

}