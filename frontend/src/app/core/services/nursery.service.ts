import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface NurseryLocation {
  _id: string;
  owner?: string;
  name: string;
  address?: string;
  locality?: string;
  city?: string;
  district?: string;
  state?: string;
  pincode?: string;
  latitude: number;
  longitude: number;
  distanceKm?: number;
  rating?: number;
  phone?: string;
  openNow?: boolean;
}

@Injectable({ providedIn: 'root' })
export class NurseryService {
  private readonly http = inject(HttpClient);
  private readonly api = 'http://localhost:5000/api/nurseries';

  nearby(latitude: number, longitude: number, radiusKm = 10): Observable<NurseryLocation[]> {
    const params = new HttpParams()
      .set('latitude', latitude)
      .set('longitude', longitude)
      .set('radiusKm', radiusKm);
    return this.http.get<NurseryLocation[]>(this.api, { params });
  }

  mine(): Observable<NurseryLocation> {
    return this.http.get<NurseryLocation>(`${this.api}/mine`);
  }
}
