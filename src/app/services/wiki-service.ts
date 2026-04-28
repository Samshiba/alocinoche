import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WikiService {
  private readonly API_URL = 'https://fr.wikipedia.org/w/api.php';

  constructor(private http: HttpClient) {}

  getProfileImage(personName: string): Observable<string | null> {
    const params = new HttpParams()
      .set('action', 'query')
      .set('titles', personName)
      .set('prop', 'pageimages')
      .set('format', 'json')
      .set('pithumbsize', '500')
      .set('origin', '*');

    return this.http.get<any>(this.API_URL, { params }).pipe(
      map(response => {
        const pages = response.query.pages;
        const pageId = Object.keys(pages)[0];
        return pages[pageId].thumbnail ? pages[pageId].thumbnail.source : null;
      })
    );
  }
}