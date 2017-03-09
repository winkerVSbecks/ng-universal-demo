import { NgModule, Component, Input, Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class FooService {
  show$: Observable<boolean>;

  constructor() {
    this.show$ = Observable.of('sdfd').delay(1000).map(x => !!x);
  }
}

@Component({
	selector: 'child',
	template: `
    <p [ngClass]="{ blue: isBlue }">{{ text }}</p>
    <p *ngIf="show">{{ text }}</p>
    <svg viewBox="0 0 20 20"
      [attr.aria-hidden]="hasLabel()"
      [attr.aria-label]="label"
      [attr.width]="width"
      [attr.height]="height">
      <use [attr.xlink:href]="'#' + type"></use>
    </svg>
  `,
  styles: ['.blue { color: blue; }'],
})
export class ChildComponent {
  @Input() isBlue: boolean = false;
  @Input() show: boolean = false;
  @Input() text: string;
  @Input() type: string;
  width = '1rem';
  height = '1rem';
  label = 'icon';

  hasLabel() {
    if (this.label) {
      return false;
    } else {
      return true;
    }
  }
}

@Component({
	selector: 'home-view',
	template: `
    <h3>Home View</h3>
    <child [isBlue]="isBlue$ | async"
      [show]="show$ | async"
      [text]="childText"
      type="clear">
    </child>
  `
})
export class HomeView {
  isBlue: boolean = false;
  isBlue$: Observable<boolean>;
  show$: Observable<boolean>;
  childText = 'This is the child component';

  constructor(private fooService: FooService) {
    this.show$ = this.fooService.show$;
    this.isBlue$ = Observable.of(null).delay(1000).map(x => !!x);
  }
}

@Component({
	selector: 'demo-app',
	template: `
	  <h1>Universal Demo</h1>
	  <a routerLink="/">Home</a>
	  <a routerLink="/lazy">Lazy</a>
	  <router-outlet></router-outlet>
	`
})
export class AppComponent {}

@NgModule({
	imports: [
    BrowserModule.withServerTransition({
      appId: 'universal-demo-app'
    }),
		RouterModule.forRoot([
			{ path: '', component: HomeView, pathMatch: 'full'},
			{ path: 'lazy', loadChildren: './lazy.module#LazyModule'}
		])
	],
  providers: [FooService],
	declarations: [ AppComponent, HomeView, ChildComponent ],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
