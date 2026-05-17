import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { DashboardComponent } from './dashboard.component';
import { MoviesService } from '../../services/movies.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  const serviceMock = {
    buscarAnosComMaisDeUmVencedor: () =>
      of({
        years: [{ year: 1986, winnerCount: 2 }]
      }),

    buscarEstudiosComMaisVitorias: () =>
      of({
        studios: [{ name: 'Studio', winCount: 3 }]
      }),

    buscarIntervalosDosProdutores: () =>
      of({
        min: [
          {
            producer: 'Min',
            interval: 1,
            previousWin: 2000,
            followingWin: 2001
          }
        ],
        max: [
          {
            producer: 'Max',
            interval: 10,
            previousWin: 1990,
            followingWin: 2000
          }
        ]
      }),

    buscarVencedoresPorAno: () =>
      of([
        {
          id: 1,
          year: 2018,
          title: 'Movie',
          studios: [],
          producers: [],
          winner: true
        }
      ])
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        {
          provide: MoviesService,
          useValue: serviceMock
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o dashboard', () => {
    expect(component).toBeTruthy();
  });

  it('deve carregar dados do dashboard', () => {
    expect(component.anosComMaisVencedores.length).toBe(1);
    expect(component.topEstudios.length).toBe(1);
    expect(component.produtoresMenorIntervalo.length).toBe(1);
  });

  it('deve buscar vencedores por ano', () => {
    component.anoBusca = '2018';
    component.buscarVencedoresPorAno();

    expect(component.vencedoresPorAno.length).toBe(1);
  });
});