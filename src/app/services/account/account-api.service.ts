import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

export interface AccountResponseData {
    token: string;
}

@Injectable()
export class AccountApiService {
  private apiUrl = environment.apiUrl;

  constructor(
    private httpClient: HttpClient
  ) {}

  login(
    username: string, 
    password: string
  ) {
    return this.httpClient.post<AccountResponseData>(
        `${this.apiUrl}/auth/login`, 
        {   username,
            password
        })
  }
}
