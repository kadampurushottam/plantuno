import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CareRemindersComponent } from './care-reminders.component';
describe('CareRemindersComponent',()=>{let fixture:ComponentFixture<CareRemindersComponent>; beforeEach(async()=>{await TestBed.configureTestingModule({imports:[CareRemindersComponent]}).compileComponents(); fixture=TestBed.createComponent(CareRemindersComponent);}); it('creates',()=>expect(fixture.componentInstance).toBeTruthy());});
