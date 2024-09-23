import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddEnterpriseComponent } from './form-add-enterprise.component';

describe('FormAddEnterpriseComponent', () => {
  let component: FormAddEnterpriseComponent;
  let fixture: ComponentFixture<FormAddEnterpriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAddEnterpriseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAddEnterpriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
