import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subject, catchError, debounceTime, distinctUntilChanged, finalize, of, switchMap, takeUntil } from 'rxjs';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { Plant, PlantListResponse } from '../../../../core/models/plant.model';
import { PlantService } from '../../../../core/services/plant.service';
import { CartService } from '../../../../core/services/cart.service';
import { AuthService } from '../../../../core/services/auth.service';
import { LocationService } from '../../../../core/services/location.service';
import { NurseryLocation, NurseryService } from '../../../../core/services/nursery.service';

@Component({
  selector: 'app-landing', standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './landing.component.html', styleUrl: './landing.component.scss'
})
export class LandingComponent implements OnInit, OnDestroy {
  private readonly plantService = inject(PlantService);
  private readonly cart = inject(CartService);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly location = inject(LocationService);
  private readonly nurseryService = inject(NurseryService);
  private readonly searchSubject = new Subject<string>();
  private readonly destroy$ = new Subject<void>();

  readonly categories = ['All', 'Indoor Plants', 'Outdoor Plants', 'Flowering Plants', 'Succulents', 'Medicinal Plants', 'Fruit Plants', 'Herb Plants', 'Bonsai Plants', 'Gift Plants', 'Office Plants'];
  readonly categoryImages: Record<string, string> = {
    'Indoor Plants': 'assets/plants/indoorPlant.jpg', 'Outdoor Plants': 'assets/plants/outdoorPlant.jpg', 'Flowering Plants': 'assets/plants/flowrining.jpg',
    'Succulents': 'assets/plants/succulent.jpg', 'Medicinal Plants': 'assets/plants/tulsi.svg', 'Fruit Plants': 'assets/plants/orchid.svg',
    'Herb Plants': 'assets/plants/money.svg', 'Bonsai Plants': 'assets/plants/bonsai.svg', 'Gift Plants': 'assets/plants/orchid.svg', 'Office Plants': 'assets/plants/snake.svg'
  };
  readonly quickSearches = ['Money Plant', 'Snake Plant', 'Rose', 'Aloe Vera', 'Tulsi', 'Indoor Plants', 'Outdoor Plants'];
  readonly services = [
    ['assets/plants/monstera.svg', 'Plant Doctor', 'Consult experts', 'From ₹299'],
    ['assets/plants/rose.svg', 'Pruning', 'Professional trimming', 'From ₹199'],
    ['assets/plants/aloe.svg', 'Repotting', 'Fresh soil & pots', 'From ₹149'],
    ['assets/plants/tulsi.svg', 'Plant Health Check', 'Expert diagnosis', 'From ₹249'],
    ['assets/plants/areca.svg', 'Garden Maintenance', 'Monthly care', 'From ₹499'],
    ['assets/plants/money.svg', 'Watering Service', 'Reliable local care', 'From ₹199']
  ];

  plants: Plant[] = []; featured: Plant[] = []; nearbyNurseries: NurseryLocation[] = [];
  searchTerm = ''; selectedCategory = 'All'; loading = false; error = '';
  locationLabel = 'Pune, Maharashtra'; locationLoading = false; locationError = ''; cartCount = 0;

  ngOnInit(): void {
    this.searchSubject.pipe(
      debounceTime(300), distinctUntilChanged(),
      switchMap(term => this.loadPlants$(term, this.selectedCategory)), takeUntil(this.destroy$)
    ).subscribe(result => this.applyResult(result));
    this.loadPlants();
    this.cartCount = this.cart.count;
  }

  onSearch(value: string): void { this.searchTerm = value; this.searchSubject.next(value); }
  selectCategory(category: string): void { this.selectedCategory = category; this.loadPlants(); this.scrollTo('plants'); }

  detectLocation(): void {
    this.locationLoading = true; this.locationError = '';
    this.location.getCurrentPosition().pipe(
      switchMap(coords => this.nurseryService.nearby(coords.latitude, coords.longitude, 10)),
      finalize(() => this.locationLoading = false),
      catchError(() => { this.locationError = 'Location permission was not available. Showing saved Pune nurseries.'; return of([] as NurseryLocation[]); })
    ).subscribe(items => {
      this.nearbyNurseries = items;
      if (items.length) { this.locationLabel = items[0].city ? `${items[0].city}, ${items[0].state || 'India'}` : 'Nearby'; }
    });
  }

  buyNow(plant: Plant): void {
    if (!this.auth.isLoggedIn) { this.cart.setPendingBuy(plant); this.router.navigate(['/auth/login'], { queryParams: { returnUrl: '/checkout' } }); return; }
    this.cart.add(plant); this.cartCount = this.cart.count; this.router.navigate(['/checkout']);
  }

  addToCart(plant: Plant): void {
    if (!this.auth.isLoggedIn) { this.cart.setPendingBuy(plant); this.router.navigate(['/auth/login'], { queryParams: { returnUrl: '/checkout' } }); return; }
    this.cart.add(plant); this.cartCount = this.cart.count;
  }

  trackByPlant(_: number, plant: Plant): string { return plant._id; }
  scrollTo(id: string): void { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  onImageError(event: Event): void { (event.target as HTMLImageElement).src = 'assets/plants/money.svg'; }

  private loadPlants$(term: string, category: string) {
    this.loading = true; this.error = '';
    return this.plantService.search(term, category).pipe(
      finalize(() => this.loading = false),
      catchError(() => { this.error = 'Unable to load plants. Please try again.'; return of({ items: [], total: 0 } as PlantListResponse); })
    );
  }

  loadPlants(): void {
    this.loading = true; this.error = '';
    this.plantService.search(this.searchTerm, this.selectedCategory).pipe(
      finalize(() => this.loading = false),
      catchError(() => { this.error = 'Unable to load plants. Please check your connection.'; return of({ items: [], total: 0 } as PlantListResponse); })
    ).subscribe(result => this.applyResult(result));
  }

  private applyResult(result: PlantListResponse): void {
    this.plants = result.items || [];
    this.featured = this.plants.filter(p => p.featured).slice(0, 5);
  }

  ngOnDestroy(): void { this.destroy$.next(); this.destroy$.complete(); }
}
