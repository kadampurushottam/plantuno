import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccessoriesComponent } from './accessories.component';
describe('AccessoriesComponent',()=>{let fixture:ComponentFixture<AccessoriesComponent>; beforeEach(async()=>{await TestBed.configureTestingModule({imports:[AccessoriesComponent]}).compileComponents(); fixture=TestBed.createComponent(AccessoriesComponent);}); it('creates',()=>expect(fixture.componentInstance).toBeTruthy());});
