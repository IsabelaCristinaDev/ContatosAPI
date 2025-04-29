import {ApiService} from '../../service/api.service';
import {Router} from '@angular/router';
import {Component, OnDestroy} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-formulario',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnDestroy {
  nome: string = '';
  telefone: string = '';
  email: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  adiciona() {
    console.log('Botão salvar foi clicado!');
    this.apiService.save({ nome: this.nome, email: this.email, telefone: this.telefone })
      .subscribe({
        next: (res) => {
          console.log('Contato salvo:', res);
          alert("Contato adicionado com sucesso!");
          this.router.navigateByUrl('/lista');
        },
        error: (err) => {
          console.error('Erro ao salvar o contato:', err);
          alert("Erro ao salvar o contato! ");
        }
      });
  }

  voltar() {
    this.router.navigateByUrl('/lista');
  }

  ngOnDestroy(): void {
    this.nome = '';
    this.telefone = '';
    this.email = '';
  }
}
