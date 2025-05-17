import { Component,OnInit  } from '@angular/core';
import {Contato} from '../../models/Contato';
import {ApiService} from '../../service/api.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.css'
})
export class FavoritosComponent implements OnInit{

  contatosFavoritos: Contato[] = [];
  constructor(private contatoService: ApiService) {

  }
  ngOnInit(): void {
    this.getFavoritos();
}
   getFavoritos(): void{
    this.contatoService.findFavoritos().subscribe(
      (data)=> {
        this.contatosFavoritos = data;
      },
      (error)=> {
        console.error('Erro ao carregar contatos favoritos!', error);
      }
    );
   }

}
