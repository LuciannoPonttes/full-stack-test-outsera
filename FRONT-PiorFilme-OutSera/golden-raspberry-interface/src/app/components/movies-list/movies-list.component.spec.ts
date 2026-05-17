import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { MoviesListComponent } from './movies-list.component';
import { MoviesService } from '../../services/movies.service';

describe('MoviesListComponent', () => {
  let component: MoviesListComponent;
  let fixture: ComponentFixture<MoviesListComponent>;

  const serviceMock = {
    listarFilmes: () =>
      of({
        content: [
          {
            id: 1,
            year: 1980,
            title: 'Movie',
            studios: [],
            producers: [],
            winner: true
          }
        ],
        totalElements: 1,
        totalPages: 1,
        number: 0,
        size: 15
      })
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesListComponent],
      providers: [
        {
          provide: MoviesService,
          useValue: serviceMock
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MoviesListComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('deve criar a lista de filmes', () => {
    expect(component).toBeTruthy();
  });

  it('deve carregar filmes', () => {
    expect(component.filmes.length).toBe(1);
  });

  it('deve limpar filtros', () => {
    component.filtroAno = '2018';
    component.filtroVencedor = 'true';

    component.limparFiltros();

    expect(component.filtroAno).toBe('');
    expect(component.filtroVencedor).toBe('');
  });
});