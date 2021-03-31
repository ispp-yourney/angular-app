export class searchFilter {

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