import { Component, inject, Input } from '@angular/core';
import { PhotoSearch } from '../../services/photo-search';

@Component({
  selector: 'app-info-director',
  imports: [],
  templateUrl: './director.html',
  styleUrl: './director.scss',
})
export class Director {
  @Input({ required: true })
  director!: string;

  private readonly photoSearchApi = inject(PhotoSearch)
  directorPhoto: string = "no-image-icon.png";

  ngOnInit(): void {
    this.photoSearchApi; // a voir
  }


  
}
