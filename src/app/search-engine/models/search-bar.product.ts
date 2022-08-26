import { ProductRating } from "./product";

export interface SearchBarProduct {
    id: number,
    title: string,
    category: string,
    rating: ProductRating
}