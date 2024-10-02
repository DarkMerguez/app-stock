import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdateEnterpriseComponent } from './form-update-enterprise.component';

describe('FormUpdateEnterpriseComponent', () => {
  let component: FormUpdateEnterpriseComponent;
  let fixture: ComponentFixture<FormUpdateEnterpriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormUpdateEnterpriseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormUpdateEnterpriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
