import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CafeespecificoPage } from './cafeespecifico.page';

describe('CafeespecificoPage', () => {
  let component: CafeespecificoPage;
  let fixture: ComponentFixture<CafeespecificoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CafeespecificoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
