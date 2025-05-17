import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Grupo } from '../../models/Contato';

@Component({
  selector: 'app-contact-groups',
  templateUrl: './contact-groups.component.html',
  styleUrls: ['./contact-groups.component.css']
})
export class ContactGroupsComponent implements OnInit {
  groups: Grupo[] = [];
  newGroup: string = '';
  editingGroup: Grupo | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadGroups();
  }

  loadGroups(): void {
    this.apiService.getGrupos().subscribe({
      next: (dados) => this.groups = dados,
      error: (err) => console.error('Erro ao carregar grupos:', err)
    });
  }

  addGroup(): void {
    const nome = this.newGroup.trim();
    if (!nome) {
      alert('Nome do grupo não pode ser vazio!');
      return;
    }

    this.apiService.criarGrupo({ nome }).subscribe({
      next: () => {
        this.newGroup = '';
        this.loadGroups();
      },
      error: (err) => {
        console.error('Erro ao adicionar grupo:', err);
        alert('Erro ao adicionar grupo.');
      }
    });
  }

  editGroup(group: Grupo): void {
    this.editingGroup = { ...group };
  }
  saveGroup(): void {
    if (!this.editingGroup) return;


    const grupoEditado = this.editingGroup as Grupo;
    const nome = grupoEditado.nome.trim();

    if (!nome) {
      alert('Nome do grupo não pode ser vazio!');
      return;
    }

    this.apiService.editarGrupo(grupoEditado).subscribe({
      next: () => {
        this.editingGroup = null;
        this.loadGroups();
      },
      error: (err) => {
        console.error('Erro ao editar grupo:', err);
        alert('Erro ao editar grupo.');
      }
    });
  }



  removeGroup(id: number): void {
    if (confirm('Tem certeza que deseja excluir este grupo?')) {
      this.apiService.deletarGrupo(id).subscribe({
        next: () => this.loadGroups(),
        error: (err) => {
          console.error('Erro ao remover grupo:', err);
          alert('Erro ao remover grupo. Tente novamente.');
        }
      });
    }
  }
}
