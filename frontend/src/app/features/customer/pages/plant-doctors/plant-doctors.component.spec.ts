import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlantDoctorsComponent } from './plant-doctors.component';
describe('PlantDoctorsComponent',()=>{let fixture:ComponentFixture<PlantDoctorsComponent>; beforeEach(async()=>{await TestBed.configureTestingModule({imports:[PlantDoctorsComponent]}).compileComponents(); fixture=TestBed.createComponent(PlantDoctorsComponent);}); it('creates',()=>expect(fixture.componentInstance).toBeTruthy());});
