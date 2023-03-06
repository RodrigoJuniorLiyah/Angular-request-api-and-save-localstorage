import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cep } from './interfaces/models-api';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  private apiUrl = 'https://viacep.com.br/ws/30160907/json/';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Cep> {
    return this.http.get<Cep>(this.apiUrl);
  }
}
