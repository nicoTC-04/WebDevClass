import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeApiPageComponent } from './poke-api-page.component';

describe('PokeApiPageComponent', () => {
  let component: PokeApiPageComponent;
  let fixture: ComponentFixture<PokeApiPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokeApiPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokeApiPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
