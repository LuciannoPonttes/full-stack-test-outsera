export interface Movie {
  id: number;
  year: number;
  title: string;
  studios: string[];
  producers: string[];
  winner: boolean;
}

export interface MoviePage {
  content: Movie[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

export interface YearWinner {
  year: number;
  winnerCount: number;
}

export interface YearsWithMultipleWinnersResponse {
  years: YearWinner[];
}

export interface StudioWinCount {
  name: string;
  winCount: number;
}

export interface StudiosWithWinCountResponse {
  studios: StudioWinCount[];
}

export interface ProducerInterval {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}

export interface ProducerIntervalResponse {
  min: ProducerInterval[];
  max: ProducerInterval[];
}