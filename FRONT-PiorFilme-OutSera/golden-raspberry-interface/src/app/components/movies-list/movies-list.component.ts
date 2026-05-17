import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Movie } from '../../models/movie.model';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movies-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.css'
})
export class MoviesListComponent implements OnInit {
  filmes: Movie[] = [];

  paginaAtual = 0;
  tamanhoPagina = 15;
  totalPaginas = 0;

  filtroAno = '';
  filtroVencedor = '';

  carregando = false;
  erro = '';

  constructor(
    private readonly moviesService: MoviesService
  ) {}

  ngOnInit(): void {
    this.carregarFilmes();
  }

  carregarFilmes(): void {
    this.carregando = true;
    this.erro = '';

    this.moviesService
      .listarFilmes(
        this.paginaAtual,
        this.tamanhoPagina,
        this.filtroAno,
        this.filtroVencedor
      )
      .subscribe({
        next: r => {
          this.filmes = r.content;
          this.totalPaginas = r.totalPages;
          this.paginaAtual = r.number;
          this.carregando = false;
        },

        error: () => {
          this.erro = 'Não foi possível carregar a lista de filmes.';
          this.carregando = false;
        }
      });
  }

  aplicarFiltros(): void {
    this.paginaAtual = 0;
    this.carregarFilmes();
  }

  limparFiltros(): void {
    this.filtroAno = '';
    this.filtroVencedor = '';
    this.paginaAtual = 0;

    this.carregarFilmes();
  }

  paginaAnterior(): void {
    if (this.paginaAtual > 0) {
      this.paginaAtual--;
      this.carregarFilmes();
    }
  }

  proximaPagina(): void {
    if (this.paginaAtual + 1 < this.totalPaginas) {
      this.paginaAtual++;
      this.carregarFilmes();
    }
  }
}