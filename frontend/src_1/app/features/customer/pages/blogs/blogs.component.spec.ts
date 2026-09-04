import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlogsComponent } from './blogs.component';
describe('BlogsComponent',()=>{let fixture:ComponentFixture<BlogsComponent>; beforeEach(async()=>{await TestBed.configureTestingModule({imports:[BlogsComponent]}).compileComponents(); fixture=TestBed.createComponent(BlogsComponent);}); it('creates',()=>expect(fixture.componentInstance).toBeTruthy());});
