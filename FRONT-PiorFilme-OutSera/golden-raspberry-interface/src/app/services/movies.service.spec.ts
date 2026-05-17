import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';

import { provideHttpClient } from '@angular/common/http';

import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MoviesService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(MoviesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve listar filmes com filtros', () => {
    service
      .listarFilmes(0, 15, '2018', 'true')
      .subscribe(r => {
        expect(r.content.length).toBe(0);
      });

    const req = httpMock.expectOne(
      request =>
        request.url === 'https://challenge.outsera.tech/api/movies' &&
        request.params.get('page') === '0' &&
        request.params.get('size') === '15' &&
        request.params.get('year') === '2018' &&
        request.params.get('winner') === 'true'
    );

    expect(req.request.method).toBe('GET');

    req.flush({
      content: [],
      totalElements: 0,
      totalPages: 0,
      number: 0,
      size: 15
    });
  });

  it('deve buscar intervalos dos produtores', () => {
    service
      .buscarIntervalosDosProdutores()
      .subscribe(r => {
        expect(r.min.length).toBe(1);
      });

    const req = httpMock.expectOne(
      'https://challenge.outsera.tech/api/movies?projection=max-min-win-interval-for-producers'
    );

    expect(req.request.method).toBe('GET');

    req.flush({
      min: [
        {
          producer: 'Producer',
          interval: 1,
          previousWin: 2000,
          followingWin: 2001
        }
      ],
      max: []
    });
  });
});