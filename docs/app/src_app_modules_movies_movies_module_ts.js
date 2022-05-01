"use strict";
(self["webpackChunksyncwatch_frontend"] = self["webpackChunksyncwatch_frontend"] || []).push([["src_app_modules_movies_movies_module_ts"],{

/***/ 7184:
/*!*********************************************************!*\
  !*** ./src/app/modules/movies/movies-routing.module.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MoviesRoutingModule": () => (/* binding */ MoviesRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 4202);
/* harmony import */ var _pages_overview_overview_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pages/overview/overview.component */ 1972);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 5000);




const routes = [
    { path: '', component: _pages_overview_overview_component__WEBPACK_IMPORTED_MODULE_0__.OverviewComponent }
];
class MoviesRoutingModule {
}
MoviesRoutingModule.ɵfac = function MoviesRoutingModule_Factory(t) { return new (t || MoviesRoutingModule)(); };
MoviesRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: MoviesRoutingModule });
MoviesRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](MoviesRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule] }); })();


/***/ }),

/***/ 5173:
/*!*************************************************!*\
  !*** ./src/app/modules/movies/movies.module.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MoviesModule": () => (/* binding */ MoviesModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 9808);
/* harmony import */ var _movies_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./movies-routing.module */ 7184);
/* harmony import */ var _pages_overview_overview_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pages/overview/overview.component */ 1972);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 5000);




class MoviesModule {
}
MoviesModule.ɵfac = function MoviesModule_Factory(t) { return new (t || MoviesModule)(); };
MoviesModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: MoviesModule });
MoviesModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule,
            _movies_routing_module__WEBPACK_IMPORTED_MODULE_0__.MoviesRoutingModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](MoviesModule, { declarations: [_pages_overview_overview_component__WEBPACK_IMPORTED_MODULE_1__.OverviewComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule,
        _movies_routing_module__WEBPACK_IMPORTED_MODULE_0__.MoviesRoutingModule] }); })();


/***/ }),

/***/ 1972:
/*!*********************************************************************!*\
  !*** ./src/app/modules/movies/pages/overview/overview.component.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OverviewComponent": () => (/* binding */ OverviewComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 5000);
/* harmony import */ var src_app_shared_display_display_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/shared/display/display.service */ 3515);


class OverviewComponent {
    constructor(displayService) {
        this.displayService = displayService;
    }
    ngOnInit() {
        this.displayService.requestFullscreenMobile();
    }
    ngOnDestroy() {
        this.displayService.exitFullscreen();
    }
}
OverviewComponent.ɵfac = function OverviewComponent_Factory(t) { return new (t || OverviewComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_shared_display_display_service__WEBPACK_IMPORTED_MODULE_0__.DisplayService)); };
OverviewComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: OverviewComponent, selectors: [["app-overview"]], decls: 2, vars: 0, consts: [[1, "m-safe-x"], [1, "bg-light", 2, "height", "100px"]], template: function OverviewComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } }, styles: [""] });


/***/ })

}]);