import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Contato, Grupo } from '../../models/Contato';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  nome = '';
  telefone = '';
  email = '';
  favorito = false;
  selectedGroups: Grupo[] = [];
  allGroups: Grupo[] = [];
  contactId: number | null = null;
  modalGrupoAberto = false;
  novoGrupo = '';
  salvando = false;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.carregarGrupos();
    this.verificarModoEdicao();
  }
  compareGroups(g1: Grupo, g2: Grupo): boolean {
    return g1 && g2 ? g1.id === g2.id : g1 === g2;
  }
  private carregarGrupos(): void {
    this.apiService.getGrupos().subscribe({
      next: (grupos) => (this.allGroups = grupos),
      error: (err) => console.error('Erro ao buscar grupos:', err)
    });
  }

  private verificarModoEdicao(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.contactId = Number(idParam);
      this.carregarContato();
    }
  }

  private carregarContato(): void {
    if (this.contactId) {
      this.apiService.getContato(this.contactId).subscribe({
        next: (contato) => {
          this.nome = contato.nome;
          this.telefone = contato.telefone;
          this.email = contato.email;
          this.favorito = contato.favorito ?? false;
          this.selectedGroups = contato.grupos || [];
        },
        error: (err) => console.error('Erro ao carregar contato:', err)
      });
    }
  }

  adiciona(): void {
    if (this.salvando || !this.validarCampos()) return;

    this.salvando = true;
    const novoContato: Contato = {
      id: this.contactId || undefined,
      nome: this.nome,
      email: this.email,
      telefone: this.telefone,
      favorito: this.favorito,
      grupos: this.selectedGroups.map(grupo => ({ id: grupo.id, nome: grupo.nome }))

    };

    const operacao = this.contactId
      ? this.apiService.update(this.contactId, novoContato)
      : this.apiService.save(novoContato);

    operacao.subscribe({
      next: () => this.aoSalvar(),
      error: (err) => {
        console.error('Erro ao salvar contato:', err);
        alert('Erro ao salvar contato.');
        this.salvando = false;
      }
    });
  }


  private aoSalvar(): void {
    this.limparFormulario();
    this.router.navigate(['/lista'], { state: { shouldReload: true } });
  }

  abrirModalGrupo(): void {
    this.modalGrupoAberto = true;
  }

  fecharModalGrupo(): void {
    this.modalGrupoAberto = false;
    this.novoGrupo = '';
  }

  criarGrupo(): void {
    if (!this.novoGrupo.trim()) {
      alert('Nome do grupo não pode ser vazio!');
      return;
    }

    const grupoNovo = { nome: this.novoGrupo.trim() };

    this.apiService.criarGrupo(grupoNovo).subscribe({
      next: (grupoCriado) => {
        this.allGroups.push(grupoCriado);
        this.selectedGroups.push(grupoCriado);
        this.fecharModalGrupo();
      },
      error: (err) => console.error('Erro ao criar grupo:', err)
    });
  }

  private validarCampos(): boolean {
    if (!this.nome.trim() || !this.email.trim()) {
      alert('Nome e e-mail são obrigatórios!');
      return false;
    }

    if (!this.telefone.trim()) {
      alert('Telefone é obrigatório!');
      return false;
    }

    return true;
  }

  private limparFormulario(): void {
    this.nome = '';
    this.telefone = '';
    this.email = '';
    this.favorito = false;
    this.selectedGroups = [];
    this.salvando = false;
  }

  voltar(): void {
    this.router.navigate(['/lista'], { state: { shouldReload: true } });
  }
}

