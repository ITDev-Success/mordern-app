import { Component, inject, Input, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { MovieService } from '../services/movie.service';
import { environment } from 'src/environments/environment';
import { MovieResult } from '../services/interfaces';
import { addIcons } from 'ionicons';
import {cashOutline, calendarOutline} from 'ionicons/icons'

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class DetailsPage implements OnInit {
  private movieService = inject(MovieService);
  public imageBaseUrl = environment.IMAGE_BASE;
  public movie: WritableSignal<MovieResult | null> = signal(null);

  @Input() set id(movieId: string){
    this.movieService.getMovieDetails(movieId).subscribe((movie)=> {
      this.movie.set(movie)
      console.log(movie)
    })
  }
  constructor() {addIcons({cashOutline, calendarOutline})}

  ngOnInit() {}
}
