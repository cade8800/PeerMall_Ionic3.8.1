import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CounterInputComponent } from './counter-input/counter-input';
import { SocialShareComponent } from './social-share/social-share';
import { CountDownComponent } from './count-down/count-down';
@NgModule({
	declarations: [CounterInputComponent, SocialShareComponent,
		CountDownComponent],
	imports: [IonicModule],
	exports: [CounterInputComponent, SocialShareComponent,
		CountDownComponent]
})
export class ComponentsModule { }
