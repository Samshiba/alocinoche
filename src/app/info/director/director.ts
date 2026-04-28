import { Component, inject, Input } from '@angular/core';
import { WikiService } from '../../services/wiki-service';

@Component({
  selector: 'app-info-director',
  imports: [],
  templateUrl: './director.html',
  styleUrl: './director.scss',
})
export class Director {
  @Input({ required: true })
  director!: string;

  private readonly wikiService = inject(WikiService)
  directorPhoto: string | null = "no-image-icon.png";

  ngOnInit() {
    this.searchImage(this.director);
  }

  searchImage(name: string) {
    this.wikiService.getProfileImage(name).subscribe({
      next: (url) => this.directorPhoto = url,
      error: (err) => console.error('Erreur API', err)
    });
  }


  
}
