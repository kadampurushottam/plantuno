import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plant, PlantListResponse } from '../models/plant.model';

@Injectable({ providedIn: 'root' })
export class PlantService {
  private readonly http = inject(HttpClient);
  private readonly api = 'http://localhost:5000/api/plants';

  search(search = '', category = 'All'): Observable<PlantListResponse> {
    let params = new HttpParams();
    if (search.trim()) params = params.set('search', search.trim());
    if (category !== 'All') params = params.set('category', category);
    return this.http.get<PlantListResponse>(this.api, { params });
  }

  mine(): Observable<PlantListResponse> {
    return this.http.get<PlantListResponse>(`${this.api}/mine`);
  }

  create(payload: {
    name: string; category: string; price: number; image?: string;
    description?: string; light?: string; water?: string; difficulty?: string; featured?: boolean;
  }): Observable<Plant> {
    return this.http.post<Plant>(this.api, payload);
  }
}
