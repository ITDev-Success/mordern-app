import { Component, inject } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  InfiniteScrollCustomEvent,
  IonList,
  IonItem,
  IonAvatar,
  IonSkeletonText,
  IonAlert,
  IonLabel,
  IonText,
  IonBadge,
  IonInfiniteScroll,IonInfiniteScrollContent, IonSpinner } from '@ionic/angular/standalone';
import { MovieService } from '../services/movie.service';
import { catchError, finalize } from 'rxjs';
import { MovieResult } from '../services/interfaces';
import { environment } from 'src/environments/environment.prod';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-defer',
  templateUrl: 'home-defer.page.html',
  styleUrls: ['home-defer.page.scss'],
  standalone: true,
  imports: [IonSpinner, 
    IonInfiniteScrollContent,
    IonInfiniteScroll,
    IonBadge,
    IonText,
    IonLabel,
    IonAlert,
    IonSkeletonText,
    IonAvatar,
    IonItem,
    IonList,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    DatePipe,
    RouterLink,
  ],
})
export class HomeDeferPage {
  private movieService = inject(MovieService);
  private currentPage = 1;
  public error = null;
  public isLoading = false;
  public movies: MovieResult[] = [];
  public dummyArray = new Array(5);
  public imageBaseUrl = environment.IMAGE_BASE;
  constructor() {
    this.loadMovies();
  }

  loadMovies(event?: InfiniteScrollCustomEvent) {
    this.error = null;
    if (!event) {
      this.isLoading = true;
    }
    this.movieService
      .getTopRatedMovies(this.currentPage)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          if (event) {
            event.target.complete();
            // event.target.disabled
          }
        }),
        catchError((e: any) => {
          this.error = e.error.status_message;
          return [];
        })
      )
      .subscribe({
        next: (res) => {
          this.movies.push(...res.results);
          if (event) {
            event.target.disabled = res.total_pages === this.currentPage;
          }
        },
      });
  }

  loadMore(event: InfiniteScrollCustomEvent) {
    this.currentPage ++

    this.loadMovies(event)
  }
}
