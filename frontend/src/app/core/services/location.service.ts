import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

@Injectable({ providedIn: 'root' })
export class LocationService {
  getCurrentPosition(): Observable<Coordinates> {
    return new Observable<Coordinates>(subscriber => {
      if (!navigator.geolocation) {
        subscriber.error(new Error('Geolocation is not supported by this browser.'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        position => {
          subscriber.next({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          subscriber.complete();
        },
        error => subscriber.error(error),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
      );
    });
  }
}
