import { Component } from '@angular/core';
import {Contato} from '../../models/Contato';
import {ApiService} from '../../service/api.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-contact-detail',
  imports: [],
  templateUrl: './contact-detail.component.html',
  standalone: true,
  styleUrl: './contact-detail.component.css'
})
export class ContactDetailComponent {
  contato: Contato | null = null;

  constructor(private service : ApiService, private router:Router,private route: ActivatedRoute){
    this.route.params.subscribe(params => {
      this.service.findById(params['id']).subscribe(res => this.contato = res )
    });
  }
voltar() {
    this.router.navigateByUrl('/lista')
}
}
