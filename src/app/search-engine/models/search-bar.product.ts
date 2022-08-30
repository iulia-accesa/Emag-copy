import { ProductRating } from "./product";

export interface SearchBarProduct {
    id: number,
    title: string,
    category: string,
    rating: ProductRating
}


export const defaultSearchBarProduct:SearchBarProduct = {
    id:-1,
    title:"",
    category:"",
    rating:{rate:0,
            count:0}
}