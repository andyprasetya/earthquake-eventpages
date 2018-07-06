import { Component, Input } from '@angular/core';

@Component({
  selector: 'executive-finite-fault-pin',
  templateUrl: './finite-fault-pin.component.html',
  styleUrls: ['./finite-fault-pin.component.scss']
})
export class FiniteFaultPinComponent {

  @Input() product: any;

  public link = '../finite-fault';
  public title = 'Finite Fault';

  constructor() { }

}
