import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
} from '@angular/material';

@NgModule({
  exports: [
    MatButtonModule,    
    MatProgressSpinnerModule,
    MatToolbarModule,
  ]
})
export class CustomMaterialModule {}
