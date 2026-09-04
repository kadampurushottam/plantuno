import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NurseriesComponent } from './nurseries.component';
describe('NurseriesComponent',()=>{let fixture:ComponentFixture<NurseriesComponent>; beforeEach(async()=>{await TestBed.configureTestingModule({imports:[NurseriesComponent]}).compileComponents(); fixture=TestBed.createComponent(NurseriesComponent);}); it('creates',()=>expect(fixture.componentInstance).toBeTruthy());});
