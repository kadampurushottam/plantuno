import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyPlantsComponent } from './my-plants.component';
describe('MyPlantsComponent',()=>{let fixture:ComponentFixture<MyPlantsComponent>; beforeEach(async()=>{await TestBed.configureTestingModule({imports:[MyPlantsComponent]}).compileComponents(); fixture=TestBed.createComponent(MyPlantsComponent);}); it('creates',()=>expect(fixture.componentInstance).toBeTruthy());});
