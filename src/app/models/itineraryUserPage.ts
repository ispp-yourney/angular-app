import { Itinerary } from "./itinerary";
import { Landmark } from "./itinerary";

export interface ItineraryUserPage {
    content: Itinerary[];
    numberOfElements: number;
    totalPages: number;
}

export interface LandmarkPage {
    content: Landmark[];
    numberOfElements: number;
    totalPages: number;
}