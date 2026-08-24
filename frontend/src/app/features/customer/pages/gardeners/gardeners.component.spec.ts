import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GardenersComponent } from './gardeners.component';
describe('GardenersComponent',()=>{let fixture:ComponentFixture<GardenersComponent>; beforeEach(async()=>{await TestBed.configureTestingModule({imports:[GardenersComponent]}).compileComponents(); fixture=TestBed.createComponent(GardenersComponent);}); it('creates',()=>expect(fixture.componentInstance).toBeTruthy());});
