import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokedexLogComponent } from './pokedex-log.component';

describe('PokedexLogComponent', () => {
  let component: PokedexLogComponent;
  let fixture: ComponentFixture<PokedexLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokedexLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokedexLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
