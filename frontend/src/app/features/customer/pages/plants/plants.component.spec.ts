import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlantsComponent } from './plants.component';
describe('PlantsComponent',()=>{let fixture:ComponentFixture<PlantsComponent>; beforeEach(async()=>{await TestBed.configureTestingModule({imports:[PlantsComponent]}).compileComponents(); fixture=TestBed.createComponent(PlantsComponent);}); it('creates',()=>expect(fixture.componentInstance).toBeTruthy());});
