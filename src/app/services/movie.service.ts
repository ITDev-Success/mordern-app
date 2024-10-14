import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { ApiResult, MovieResult } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private http = inject(HttpClient)
  constructor() { }

  getTopRatedMovies(page=1): Observable<ApiResult>{
    return this.http.get<ApiResult>(`${environment.BASE_URL}/movie/popular?page=${page}&api_key=${environment.apiKey}`)
  }

  getMovieDetails(id: string): Observable<MovieResult>{
    return this.http.get<MovieResult>(`${environment.BASE_URL}/movie/${id}?api_key=${environment.apiKey}`)
  }
}
