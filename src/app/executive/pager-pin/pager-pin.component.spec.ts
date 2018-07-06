import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng2-mock-component';

import { PagerPinComponent } from './pager-pin.component';


describe('PagerPinComponent', () => {
  let component: PagerPinComponent;
  let fixture: ComponentFixture<PagerPinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PagerPinComponent,

        MockComponent({selector: 'basic-pin', inputs: ['link', 'product', 'title']}),
        MockComponent({selector: 'shared-alert-level', inputs: ['alert']})
      ],
      imports: [
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagerPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
