import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrativoFormComponent } from './administrativo-form.component';

describe('AdministrativoFormComponent', () => {
  let component: AdministrativoFormComponent;
  let fixture: ComponentFixture<AdministrativoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministrativoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministrativoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
