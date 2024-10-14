import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, InfiniteScrollCustomEvent } from '@ionic/angular/standalone';
import { MovieService } from '../services/movie.service';
import { catchError, finalize } from 'rxjs';
import { MovieResult } from '../services/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
  private movieService = inject(MovieService)
  private currentPage = 1
  private error = null
  private isLoading = false
  private movies: MovieResult[] = []
  constructor() {
    this.loadMovies()
  }

  loadMovies(event?: InfiniteScrollCustomEvent){
    this.error = null
    if (!event){
      this.isLoading = true

    }
    this.movieService.getTopRatedMovies(this.currentPage).pipe(
      finalize(()=> {
        this.isLoading = false
        if(event){
          event.target.complete()
          // event.target.disabled
        }
      }),
      catchError((e: any)=> {
        this.error = e.error.status_message;
        return  []
      })
    ).subscribe({
      next: (res) => {
        this.movies.push(...res.results)
        if(event){
          event.target.disabled = res.total_pages === this.currentPage
        }
      }
    })
  }

  loadMove(event: InfiniteScrollCustomEvent){

  }
}
