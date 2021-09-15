import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PickAdressPage } from './pick-adress';

@NgModule({
  declarations: [
    PickAdressPage,
  ],
  imports: [
    IonicPageModule.forChild(PickAdressPage),
  ],
})
export class PickAdressPageModule {}
