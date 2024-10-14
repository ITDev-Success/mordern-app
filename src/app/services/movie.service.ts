import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private http = inject(HttpClient)
  constructor() { }

  getTopRatedMovies(page=1){
    return this.http.get(`${environment.BASE_URL}/movie/popular?page=${page}&api_key=${environment.apiKey}`)
  }

  getMovieDetails(id: string){
    return this.http.get(`${environment.BASE_URL}/movie/${id}?api_key=${environment.apiKey}`)
  }
}
