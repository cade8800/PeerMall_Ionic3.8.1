import { NgModule } from '@angular/core';
import { ToLocaleWeekPipe } from './to-locale-week/to-locale-week';
import { CurrencySymbolPipe } from './currency-symbol/currency-symbol';
import { TrafficToolsPipe } from './traffic-tools/traffic-tools';
@NgModule({
	declarations: [ToLocaleWeekPipe,
    CurrencySymbolPipe,
    TrafficToolsPipe],
	imports: [],
	exports: [ToLocaleWeekPipe,
    CurrencySymbolPipe,
    TrafficToolsPipe]
})
export class PipesModule {}
