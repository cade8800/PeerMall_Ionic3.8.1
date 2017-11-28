import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VisitorEditPage } from './visitor-edit';

@NgModule({
  declarations: [
    VisitorEditPage,
  ],
  imports: [
    IonicPageModule.forChild(VisitorEditPage),
  ],
})
export class VisitorEditPageModule { }
