import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IUserApi } from './user-api.interface';


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

  getUserByUsername(username: string | undefined): Observable<IUserApi | undefined> {
    return this._httpClient.get<IUserApi[]>(`${this._apiUrl}/users`)
      .pipe(
        map(users => {
          users = users.filter(user => user.username === username);
          return users[0];
        })
      );
  }
}
