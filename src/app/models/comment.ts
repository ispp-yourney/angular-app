import { Author } from "./itinerary";

export class Comment {

    id:number;
    content:string;
    rating:number;
    createDate:Date;
    author:Author
    itineraryId:number;



    constructor(id: number, content:string, rating:number, createDate:Date,
        author:Author, itineraryId:number) {
        this.id = id;
        this.content = content
        this.rating = rating;
        this.createDate = createDate;
        this.author = author;
        this.itineraryId = itineraryId;
    }
}