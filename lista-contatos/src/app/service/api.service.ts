import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Contato, Grupo} from '../models/Contato';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8080';
  private contatosUrl = `${this.baseUrl}/contatos`;
  private gruposUrl = `${this.baseUrl}/grupos`;

  constructor(private http: HttpClient) {}


  findAll(): Observable<Contato[]> {
    return this.http.get<Contato[]>(this.contatosUrl);
  }

  findById(id: number): Observable<Contato> {
    return this.http.get<Contato>(`${this.contatosUrl}/${id}`);
  }

  save(contato: Contato): Observable<Contato> {
    return this.http.post<Contato>(this.contatosUrl, contato);
  }

  update(id: number, contato: Contato): Observable<Contato> {
    return this.http.put<Contato>(`${this.contatosUrl}/${id}`, contato);
  }

  alternarFavorito(id: number): Observable<void> {
    return this.http.patch<void>(`${this.contatosUrl}/${id}/favorito`, {});
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.contatosUrl}/${id}`);
  }

  findFavoritos(): Observable<Contato[]> {
    return this.http.get<Contato[]>(`${this.contatosUrl}/favoritos`);
  }

  getContato(id: number): Observable<Contato> {
    return this.findById(id);
  }


  getGrupos(): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(this.gruposUrl);
  }

  criarGrupo(grupo: { nome: string }): Observable<Grupo> {
    return this.http.post<Grupo>(this.gruposUrl, grupo);
  }

  deletarGrupo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.gruposUrl}/${id}`);
  }

  editarGrupo(grupo: { id: number, nome: string }): Observable<Grupo> {
    return this.http.put<Grupo>(`${this.gruposUrl}/${grupo.id}`, grupo);
  }
}
