import { Component, OnInit } from '@angular/core';
import {Contato, Grupo} from '../../models/Contato';

import { NavigationEnd, Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contatos: Contato[] = [];
  gruposDisponiveis: Grupo[] = [];
  grupoSelecionado: string = '';
  mostrarSomenteFavoritos = false;
  carregando = true;

  constructor(private service: ApiService, private router: Router) {

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.buscarContatos());
  }

  ngOnInit(): void {
    this.buscarContatos();
    this.carregarGrupos();
  }

  carregarGrupos(): void {
    this.service.getGrupos().subscribe({
      next: (grupos) => this.gruposDisponiveis = grupos,
      error: (err) => console.error('Erro ao buscar grupos:', err)
    });
  }

  buscarContatos(): void {
    this.carregando = true;
    this.service.findAll().subscribe({
      next: (contatos) => {
        this.contatos = contatos;
        this.carregando = false;
      },
      error: (err) => {
        console.error('Erro ao buscar contatos:', err);
        this.carregando = false;
      }
    });
  }

  contatosFiltrados(): Contato[] {
    let filtrados = this.mostrarSomenteFavoritos
      ? this.contatos.filter(c => c.favorito)
      : this.contatos;

    if (this.grupoSelecionado) {
      filtrados = filtrados.filter(c =>
        c.grupos?.some(grupo => grupo.nome === this.grupoSelecionado) || false
      );
    }

    return filtrados;
  }

  detalhe(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate(['/detalhe', id]);
    }
  }

  novoContato(): void {
    this.router.navigate(['/formulario']);
  }

  alternarFavorito(id: number): void {
    this.service.alternarFavorito(id).subscribe({
      next: () => this.buscarContatos(),
      error: (err) => console.error('Erro ao alternar favorito:', err)
    });
  }
}
