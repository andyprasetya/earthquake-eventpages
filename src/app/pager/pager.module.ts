import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCheckboxModule, MatTableModule } from '@angular/material';
import { ProductPageModule } from '../product-page/product-page.module';
import { PagerComponent } from './pager/pager.component';
import { PagerRoutingModule } from './pager-routing.module';
import { PagerXmlService } from './pagerxml.service';
import { PagerPopulationComponent } from './pager-population/pager-population.component';
import { SharedModule } from '../shared/shared.module';
import { PagerCitiesComponent } from './pager-cities/pager-cities.component';


@NgModule({
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatTableModule,
    ProductPageModule,
    SharedModule,

    PagerRoutingModule
  ],
  declarations: [
    PagerComponent,
    PagerPopulationComponent,
    PagerCitiesComponent
  ],
  providers: [
    PagerXmlService
  ]
})
export class PagerModule { }
