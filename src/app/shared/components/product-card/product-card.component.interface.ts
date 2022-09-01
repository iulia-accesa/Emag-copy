export interface IProduct {
    "id": number,
    "title": string,
    "price": number,
    "description": string,
    "category": string,
    "image": string,
    "rating":{
        "rate": number,
        "count": number,
    }
}


export const defaultIProduct :IProduct = {
    id:-1,
    title: "",
    price:0,
    description:"",
    category: "",
    image: "",
    rating: {
        rate:0,
        count:0
    }
}