import { map, take, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';


@Injectable()
export class AccountApiService {
  private _apiUrl = environment.apiUrl;

  constructor(
    private _httpClient: HttpClient
  ) {}

  login(
    username: string, 
    password: string
  ) {
    return this._httpClient.post<{ token: string }>(
      `${this._apiUrl}/auth/login`, 
      {   username,
          password
      })
  }
}
