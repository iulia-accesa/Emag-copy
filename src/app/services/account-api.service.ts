import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";


export class AccountApiService {
    private _apiUrl = environment.apiUrl;
    private _loginUrl = this._apiUrl + "/auth/login"

    constructor(private _httpClient: HttpClient){

    }

    login(username: string,password: string){
       
    }

}