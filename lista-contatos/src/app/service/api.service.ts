import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Contato} from '../models/Contato';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string = 'http://localhost:8080/contatos';

  constructor(private http: HttpClient) { }

  findAll():Observable<Contato[]> {
    return this.http.get<Contato[]>(this.url)
  }

  findById(id: number):Observable<Contato>{
    return this.http.get<Contato>(this.url+'/'+id)
  }

  save(contato: Contato): Observable<Contato> {
    return this.http.post<Contato>(this.url, contato);
  }

  update(contato: Contato): Observable<Contato> {
    return this.http.put<Contato>(this.url, contato);
  }

  delete(id: number): void {
    this.http.delete(this.url+'/'+id)
  }
}
