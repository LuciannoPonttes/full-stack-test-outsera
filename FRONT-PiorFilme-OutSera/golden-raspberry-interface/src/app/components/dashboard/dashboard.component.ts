import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  Movie,
  ProducerInterval,
  StudioWinCount,
  YearWinner
} from '../../models/movie.model';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  anosComMaisVencedores: YearWinner[] = [];
  topEstudios: StudioWinCount[] = [];
  produtoresMenorIntervalo: ProducerInterval[] = [];
  produtoresMaiorIntervalo: ProducerInterval[] = [];
  vencedoresPorAno: Movie[] = [];

  anoBusca = '';
  carregando = false;
  erro = '';

  constructor(private readonly moviesService: MoviesService) {}

  ngOnInit(): void {
    this.carregarDashboard();
  }

  carregarDashboard(): void {
    this.moviesService.buscarAnosComMaisDeUmVencedor()
      .subscribe({
        next: resposta => {
          this.anosComMaisVencedores = resposta.years;
        },
        error: () => {
          this.erro = 'Não foi possível carregar os anos com mais de um vencedor.';
        }
      });

    this.moviesService.buscarEstudiosComMaisVitorias()
      .subscribe({
        next: resposta => {
          this.topEstudios = resposta.studios.slice(0, 3);
        },
        error: () => {
          this.erro = 'Não foi possível carregar os estúdios com mais vitórias.';
        }
      });

    this.moviesService.buscarIntervalosDosProdutores()
      .subscribe({
        next: resposta => {
          this.produtoresMenorIntervalo = resposta.min;
          this.produtoresMaiorIntervalo = resposta.max;
        },
        error: () => {
          this.erro = 'Não foi possível carregar os intervalos dos produtores.';
        }
      });
  }

  buscarVencedoresPorAno(): void {
    if (!this.anoBusca) {
      this.vencedoresPorAno = [];
      return;
    }

    this.carregando = true;
    this.erro = '';

    this.moviesService.buscarVencedoresPorAno(this.anoBusca)
      .subscribe({
        next: filmes => {
          this.vencedoresPorAno = filmes;
          this.carregando = false;
        },
        error: () => {
          this.erro = 'Não foi possível buscar os vencedores por ano.';
          this.carregando = false;
        }
      });
  }
}