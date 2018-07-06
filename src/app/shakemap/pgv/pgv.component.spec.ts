import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MockComponent } from 'ng2-mock-component';
import { of } from 'rxjs/observable/of';

import { Event } from '../../event';
import { EventService } from '../../core/event.service';
import { MockPipe } from '../../mock-pipe';
import { PgvComponent } from './pgv.component';

describe('PgvComponent', () => {
  let component: PgvComponent;
  let fixture: ComponentFixture<PgvComponent>;

  beforeEach(async(() => {
    const eventServiceStub = {
      event$: of(new Event({})),
      product$: null
    };

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        PgvComponent,

        MockComponent({
          selector: 'shared-map',
          inputs: [
            'overlays',
            'showScaleControl',
            'showAttributionControl',
            'baselayer'
          ]
        }),

        MockPipe('shakemapOverlays')
      ],
      providers: [
        { provide: EventService, useValue: eventServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PgvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
