import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';
import {Contato} from '../../models/Contato';
import {Router} from '@angular/router';
import {ApiService} from '../../service/api.service';

@Component({
  selector: 'app-contact-list',
  imports: [
    NgForOf
  ],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent {
  contatos: Contato [] = [];

  constructor(private service : ApiService, private router:Router) {
    this.service.findAll().subscribe(contatos=> this.contatos = contatos);

  }
  detalhe(id: number | undefined){
    alert(id);
    this.router.navigateByUrl(`/detalhe/${id}`);
  }
 novoContato(){
    this.router.navigateByUrl('/formulario');
 }
}
