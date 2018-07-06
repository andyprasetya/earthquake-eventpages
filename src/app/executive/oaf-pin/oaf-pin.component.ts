import { Component, Input } from '@angular/core';

@Component({
  selector: 'executive-oaf-pin',
  templateUrl: './oaf-pin.component.html',
  styleUrls: ['./oaf-pin.component.scss']
})
export class OafPinComponent {

  public link = '../oaf';
  public title = 'Aftershock Forecast';
  public type = 'oaf';

  @Input()
  product: any;

  constructor() { }
}
