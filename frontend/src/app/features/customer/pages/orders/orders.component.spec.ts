import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdersComponent } from './orders.component';
describe('OrdersComponent',()=>{let fixture:ComponentFixture<OrdersComponent>; beforeEach(async()=>{await TestBed.configureTestingModule({imports:[OrdersComponent]}).compileComponents(); fixture=TestBed.createComponent(OrdersComponent);}); it('creates',()=>expect(fixture.componentInstance).toBeTruthy());});
