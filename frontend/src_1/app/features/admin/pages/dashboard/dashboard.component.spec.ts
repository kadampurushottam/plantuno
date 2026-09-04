import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { provideRouter } from '@angular/router';

describe('AdminDashboard', () => {
  let fixture: ComponentFixture<DashboardComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({imports:[DashboardComponent],providers:[provideRouter([])]}).compileComponents();
    fixture=TestBed.createComponent(DashboardComponent);
    fixture.detectChanges();
  });
  it('should create',()=>expect(fixture.componentInstance).toBeTruthy());
});
