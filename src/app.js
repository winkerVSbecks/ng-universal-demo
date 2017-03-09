"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var Rx_1 = require("rxjs/Rx");
var FooService = (function () {
    function FooService() {
        this.show$ = Rx_1.Observable.of('sdfd').delay(1000).map(function (x) { return !!x; });
    }
    return FooService;
}());
FooService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], FooService);
exports.FooService = FooService;
var ChildComponent = (function () {
    function ChildComponent() {
        this.isBlue = false;
        this.show = false;
        this.width = '1rem';
        this.height = '1rem';
        this.label = 'icon';
    }
    ChildComponent.prototype.hasLabel = function () {
        if (this.label) {
            return false;
        }
        else {
            return true;
        }
    };
    return ChildComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ChildComponent.prototype, "isBlue", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ChildComponent.prototype, "show", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ChildComponent.prototype, "text", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ChildComponent.prototype, "type", void 0);
ChildComponent = __decorate([
    core_1.Component({
        selector: 'child',
        template: "\n    <p [ngClass]=\"{ blue: isBlue }\">{{ text }}</p>\n    <p *ngIf=\"show\">{{ text }}</p>\n    <svg viewBox=\"0 0 20 20\"\n      [attr.aria-hidden]=\"hasLabel()\"\n      [attr.aria-label]=\"label\"\n      [attr.width]=\"width\"\n      [attr.height]=\"height\">\n      <use [attr.xlink:href]=\"'#' + type\"></use>\n    </svg>\n  ",
        styles: ['.blue { color: blue; }'],
    })
], ChildComponent);
exports.ChildComponent = ChildComponent;
var HomeView = (function () {
    function HomeView(fooService) {
        this.fooService = fooService;
        this.isBlue = false;
        this.childText = 'This is the child component';
        this.show$ = this.fooService.show$;
        this.isBlue$ = Rx_1.Observable.of(null).delay(1000).map(function (x) { return !!x; });
    }
    return HomeView;
}());
HomeView = __decorate([
    core_1.Component({
        selector: 'home-view',
        template: "\n    <h3>Home View</h3>\n    <child [isBlue]=\"isBlue$ | async\"\n      [show]=\"show$ | async\"\n      [text]=\"childText\"\n      type=\"clear\">\n    </child>\n  "
    }),
    __metadata("design:paramtypes", [FooService])
], HomeView);
exports.HomeView = HomeView;
var AppComponent = (function () {
    function AppComponent() {
    }
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'demo-app',
        template: "\n\t  <h1>Universal Demo</h1>\n\t  <a routerLink=\"/\">Home</a>\n\t  <a routerLink=\"/lazy\">Lazy</a>\n\t  <router-outlet></router-outlet>\n\t"
    })
], AppComponent);
exports.AppComponent = AppComponent;
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule.withServerTransition({
                appId: 'universal-demo-app'
            }),
            router_1.RouterModule.forRoot([
                { path: '', component: HomeView, pathMatch: 'full' },
                { path: 'lazy', loadChildren: './lazy.module#LazyModule' }
            ])
        ],
        providers: [FooService],
        declarations: [AppComponent, HomeView, ChildComponent],
        bootstrap: [AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
