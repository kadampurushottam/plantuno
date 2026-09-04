import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HelpComponent } from './help.component';
describe('HelpComponent',()=>{let fixture:ComponentFixture<HelpComponent>; beforeEach(async()=>{await TestBed.configureTestingModule({imports:[HelpComponent]}).compileComponents(); fixture=TestBed.createComponent(HelpComponent);}); it('creates',()=>expect(fixture.componentInstance).toBeTruthy());});
