import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FinalizarPage } from './finalizar.page';

describe('FinalizarPage', () => {
  let component: FinalizarPage;
  let fixture: ComponentFixture<FinalizarPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalizarPage] // usa imports, não declarations
    }).compileComponents();

    fixture = TestBed.createComponent(FinalizarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

