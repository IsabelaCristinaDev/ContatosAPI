export interface Grupo {
  id: number;
  nome: string;
}

export interface Contato {
  id?: number;
  nome: string;
  email: string;
  telefone: string;
  grupos?: Grupo[];
  favorito?: boolean;
}

