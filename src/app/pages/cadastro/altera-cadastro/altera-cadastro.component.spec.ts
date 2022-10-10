import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlteraCadastroComponent } from './altera-cadastro.component';

describe('AlteraCadastroComponent', () => {
  let component: AlteraCadastroComponent;
  let fixture: ComponentFixture<AlteraCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlteraCadastroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlteraCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
