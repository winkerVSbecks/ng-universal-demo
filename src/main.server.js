"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("zone.js/dist/zone-node");
var core_1 = require("@angular/core");
var app_server_ngfactory_1 = require("./ngfactory/src/app.server.ngfactory");
var express = require("express");
var express_engine_1 = require("./express-engine");
core_1.enableProdMode();
var app = express();
app.engine('html', express_engine_1.ngExpressEngine({
    baseUrl: 'http://localhost:4200',
    bootstrap: [app_server_ngfactory_1.AppServerModuleNgFactory]
}));
app.set('view engine', 'html');
app.set('views', 'src');
app.get('/', function (req, res) {
    res.render('index', { req: req });
});
app.get('/lazy', function (req, res) {
    res.render('index', { req: req });
});
app.listen(8080, function () {
    console.log('listening...');
});
