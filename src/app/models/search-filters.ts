export class SearchFilter {

    country: string;
    city: string;
    maxBudget: string;
    maxDays: string;

    constructor(country: string, city: string, maxBudget: string, maxDays: string) {
        this.country = country;
        this.city = city;
        this.maxBudget = maxBudget;
        this.maxDays = maxDays;
    }

}


export class SearchFilterLandmark {

    country: string;
    city: string;
   

    constructor(country: string, city: string) {
        this.country = country;
        this.city = city;
      
    }

}