import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Movie,
  MoviePage,
  ProducerIntervalResponse,
  StudiosWithWinCountResponse,
  YearsWithMultipleWinnersResponse
} from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private readonly apiUrl = 'https://challenge.outsera.tech/api/movies';

  constructor(private readonly http: HttpClient) {}

  listarFilmes(page = 0, size = 15, year?: string, winner?: string): Observable<MoviePage> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size);

    if (year) {
      params = params.set('year', year);
    }

    if (winner !== undefined && winner !== '') {
      params = params.set('winner', winner);
    }

    return this.http.get<MoviePage>(this.apiUrl, { params });
  }

  buscarAnosComMaisDeUmVencedor(): Observable<YearsWithMultipleWinnersResponse> {
    return this.http.get<YearsWithMultipleWinnersResponse>(
      `${this.apiUrl}/yearsWithMultipleWinners`
    );
  }

  buscarEstudiosComMaisVitorias(): Observable<StudiosWithWinCountResponse> {
    return this.http.get<StudiosWithWinCountResponse>(
      `${this.apiUrl}/studiosWithWinCount`
    );
  }

  buscarIntervalosDosProdutores(): Observable<ProducerIntervalResponse> {
    return this.http.get<ProducerIntervalResponse>(
      `${this.apiUrl}/maxMinWinIntervalForProducers`
    );
  }

  buscarVencedoresPorAno(year: string): Observable<Movie[]> {
    const params = new HttpParams().set('year', year);

    return this.http.get<Movie[]>(
      `${this.apiUrl}/winnersByYear`,
      { params }
    );
  }
}