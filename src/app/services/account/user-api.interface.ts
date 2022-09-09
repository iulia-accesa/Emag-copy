export interface IUserApi {
    id: number,
    email: string,
    username: string,
    password: string,
    name: {
        firstname: string,
        lastname: string
    },
    address: {
        city: string, 
        street: string,
        number: number,
        geolocation: {
            lat: string,
            long: string
        }
    },
    phone: string
}