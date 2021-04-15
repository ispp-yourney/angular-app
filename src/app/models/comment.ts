import { Author } from "./itinerary";

export class Comment {

    id:number;
    content:string;
    rating:number;
    createDate:Date;
    author:Author
    itinerary:number;

    constructor(itinerary:number, content:string, rating:number) {
        this.itinerary = itinerary;
        this.content = content
        this.rating = rating;
    }
}