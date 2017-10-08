import { NgModule } from '@angular/core';
import { ParallaxHeaderDirective } from './parallax-header/parallax-header';
import { ParallaxContentDirective } from './parallax-content/parallax-content';
@NgModule({
	declarations: [ParallaxHeaderDirective,
    ParallaxContentDirective],
	imports: [],
	exports: [ParallaxHeaderDirective,
    ParallaxContentDirective]
})
export class DirectivesModule {}
