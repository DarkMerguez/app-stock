import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdateProductComponent } from './form-update-product.component';

describe('FormUpdateProductComponent', () => {
  let component: FormUpdateProductComponent;
  let fixture: ComponentFixture<FormUpdateProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormUpdateProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormUpdateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
