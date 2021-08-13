import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretStuffComponent } from './secret-stuff.component';

describe('SecretStuffComponent', () => {
  let component: SecretStuffComponent;
  let fixture: ComponentFixture<SecretStuffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecretStuffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretStuffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
