"use strict";
(self["webpackChunksyncwatch_frontend"] = self["webpackChunksyncwatch_frontend"] || []).push([["main"],{

/***/ 158:
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppRoutingModule": () => (/* binding */ AppRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ 4202);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ 2340);
/* harmony import */ var _pages_downloads_downloads_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pages/downloads/downloads.component */ 3241);
/* harmony import */ var _pages_home_home_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pages/home/home.component */ 5245);
/* harmony import */ var _pages_login_login_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pages/login/login.component */ 4902);
/* harmony import */ var _pages_profile_profile_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pages/profile/profile.component */ 8220);
/* harmony import */ var _shared_auth_auth_guard_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./shared/auth/auth-guard.service */ 5233);
/* harmony import */ var _shared_sync_online_guard_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./shared/sync/online-guard.service */ 2493);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 5000);










const routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'login', component: _pages_login_login_component__WEBPACK_IMPORTED_MODULE_3__.LoginComponent },
    { path: 'home', component: _pages_home_home_component__WEBPACK_IMPORTED_MODULE_2__.HomeComponent, canActivate: [_shared_auth_auth_guard_service__WEBPACK_IMPORTED_MODULE_5__.AuthGuardService] },
    { path: 'downloads', component: _pages_downloads_downloads_component__WEBPACK_IMPORTED_MODULE_1__.DownloadsComponent, canActivate: [_shared_auth_auth_guard_service__WEBPACK_IMPORTED_MODULE_5__.AuthGuardService] },
    { path: 'profile', component: _pages_profile_profile_component__WEBPACK_IMPORTED_MODULE_4__.ProfileComponent, canActivate: [_shared_auth_auth_guard_service__WEBPACK_IMPORTED_MODULE_5__.AuthGuardService, _shared_sync_online_guard_service__WEBPACK_IMPORTED_MODULE_6__.OnlineGuardService] },
    {
        path: 'movies',
        loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_modules_movies_movies_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./modules/movies/movies.module */ 5173)).then(m => m.MoviesModule),
        canActivate: [_shared_auth_auth_guard_service__WEBPACK_IMPORTED_MODULE_5__.AuthGuardService]
    },
    { path: '**', redirectTo: '/home' }
];
class AppRoutingModule {
}
AppRoutingModule.ɵfac = function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); };
AppRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_8__.RouterModule.forRoot(routes, { useHash: src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.router_use_hash })], _angular_router__WEBPACK_IMPORTED_MODULE_8__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_8__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_8__.RouterModule] }); })();


/***/ }),

/***/ 5041:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppComponent": () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 9300);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 4004);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 262);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 2843);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 5000);
/* harmony import */ var _shared_auth_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shared/auth/auth.service */ 866);
/* harmony import */ var _shared_sync_sync_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shared/sync/sync.service */ 5819);
/* harmony import */ var _shared_storage_storage_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shared/storage/storage.service */ 9459);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ 4202);
/* harmony import */ var _angular_service_worker__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/service-worker */ 9802);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 9808);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 3707);
/* harmony import */ var _components_logo_logo_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/logo/logo.component */ 8484);
/* harmony import */ var _components_modal_modal_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/modal/modal.component */ 385);











const _c0 = ["modal"];
function AppComponent_nav_0_a_16_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "a", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "Profile");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} }
function AppComponent_nav_0_button_17_span_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "span", 18);
} }
function AppComponent_nav_0_button_17_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "button", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AppComponent_nav_0_button_17_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r7); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2); return ctx_r6.logout(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, AppComponent_nav_0_button_17_span_1_Template, 1, 0, "span", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, " Logout ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("disabled", ctx_r3.logoutLoading);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r3.logoutLoading);
} }
function AppComponent_nav_0_button_18_Template(rf, ctx) { if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "button", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AppComponent_nav_0_button_18_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r9); const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2); return ctx_r8.goOnline(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, " Go Online ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("disabled", !ctx_r4.syncService.isVoluntaryOffline());
} }
function AppComponent_nav_0_Template(rf, ctx) { if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "nav", 2)(1, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](2, "app-logo");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "button", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AppComponent_nav_0_Template_button_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r11); const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](); return ctx_r10.isCollapsed = !ctx_r10.isCollapsed; });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](4, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "div", 6)(6, "ul", 7)(7, "li", 8)(8, "a", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](9, "Home");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](10, "li", 8)(11, "a", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](12, "Movies");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](13, "ul", 11)(14, "a", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](15, "Downloads");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](16, AppComponent_nav_0_a_16_Template, 2, 0, "a", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](17, AppComponent_nav_0_button_17_Template, 3, 2, "button", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](18, AppComponent_nav_0_button_18_Template, 2, 1, "button", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵattribute"]("aria-expanded", !ctx_r0.isCollapsed);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngbCollapse", ctx_r0.isCollapsed);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r0.syncService.isOnline());
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r0.syncService.isOnline());
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !ctx_r0.syncService.isOnline());
} }
class AppComponent {
    constructor(authService, syncService, storageService, router, swUpdate) {
        this.authService = authService;
        this.syncService = syncService;
        this.storageService = storageService;
        this.router = router;
        this.swUpdate = swUpdate;
        this.title = 'syncwatch-frontend';
        this.isCollapsed = true;
        this.logoutLoading = false;
    }
    ngOnInit() {
    }
    ngAfterViewInit() {
        this.swUpdate.unrecoverable.subscribe(event => {
            this.modal.open(`An error occurred that we cannot recover from:</br>
                            ${event.reason}</br>Please reload the page.`, 'An error occured', [
                { class: 'btn btn-secondary', innerHtml: 'Reload', result: 'reload' }
            ]).then((result) => {
                if (result == 'reload')
                    window.location.reload();
            });
        });
        if (this.swUpdate.isEnabled) {
            this.swUpdate.versionUpdates.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.filter)((evt) => evt.type === 'VERSION_READY'), (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.map)((evt) => {
                console.info(`updating version=[${evt.currentVersion} to latestVersion=[${evt.latestVersion}]`);
                this.modal.open(`Please update from version=[${evt.currentVersion} to latestVersion=[${evt.latestVersion}]`, 'Update available', [
                    { class: 'btn btn-secondary', innerHtml: 'Reload', result: 'reload' }
                ]).then((result) => {
                    if (result == 'reload')
                        window.location.reload();
                });
            }));
        }
        this.storageService.tryPersistWithoutPromtingUser().then(persist => {
            if (persist == 'prompt') {
                this.modal.open(`We want to store persistant data ok!`, 'Store data', [
                    { class: 'btn btn-secondary', innerHtml: 'Grant', result: 'grant' }
                ]).then((result) => {
                    if (result == 'grant')
                        this.storageService.persist();
                });
            }
        });
    }
    unload() {
        this.authService.unload();
    }
    goOnline() {
        this.syncService.setVoluntaryOffline(false);
        this.router.navigate(['login']);
    }
    logout() {
        this.logoutLoading = true;
        this.authService.logout().pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.catchError)(err => {
            this.router.navigate(['login']);
            this.logoutLoading = false;
            return (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.throwError)(() => err);
        })).subscribe(() => {
            this.logoutLoading = false;
            this.router.navigate(['login']);
        });
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_shared_auth_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_shared_sync_sync_service__WEBPACK_IMPORTED_MODULE_1__.SyncService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_shared_storage_storage_service__WEBPACK_IMPORTED_MODULE_2__.StorageService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_10__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_service_worker__WEBPACK_IMPORTED_MODULE_11__.SwUpdate)); };
AppComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], viewQuery: function AppComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](_c0, 5);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.modal = _t.first);
    } }, hostBindings: function AppComponent_HostBindings(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("beforeunload", function AppComponent_beforeunload_HostBindingHandler($event) { return ctx.unload($event); }, false, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresolveWindow"]);
    } }, decls: 4, vars: 1, consts: [["ngbNav", "", "class", "navbar navbar-expand-lg px-3 py-2 navbar-dark bg-primary", 4, "ngIf"], ["modal", ""], ["ngbNav", "", 1, "navbar", "navbar-expand-lg", "px-3", "py-2", "navbar-dark", "bg-primary"], [1, "navbar", "w-100", "h-100", "m-safe-t", "m-safe-x"], ["type", "button", "data-toggle", "collapse", "data-target", "#navbarSupportedContent", "aria-controls", "navbarSupportedContent", "aria-expanded", "false", "aria-label", "Toggle navigation", 1, "navbar-toggler", "ms-auto", "btn", 3, "click"], [1, "navbar-toggler-icon"], ["id", "navbarSupportedContent", 1, "collapse", "navbar-collapse", "py-2", 3, "ngbCollapse"], [1, "navbar-nav", "me-auto", "align-items-center"], [1, "nav-item"], ["routerLinkActive", "active", "routerLink", "/home", 1, "nav-link"], ["routerLinkActive", "active", "routerLink", "/movies", 1, "nav-link"], [1, "navbar-nav", "align-items-center"], ["routerLinkActive", "active", "routerLink", "/downloads", 1, "nav-link"], ["class", "nav-link", "routerLinkActive", "active", "routerLink", "/profile", 4, "ngIf"], ["class", "btn btn-secondary", 3, "disabled", "click", 4, "ngIf"], ["routerLinkActive", "active", "routerLink", "/profile", 1, "nav-link"], [1, "btn", "btn-secondary", 3, "disabled", "click"], ["class", "spinner-border spinner-border-sm", "role", "status", 4, "ngIf"], ["role", "status", 1, "spinner-border", "spinner-border-sm"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](0, AppComponent_nav_0_Template, 19, 5, "nav", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](1, "app-modal", null, 1)(3, "router-outlet");
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.authService.isLoggedIn());
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_12__.NgIf, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_13__.NgbNavbar, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_13__.NgbNav, _components_logo_logo_component__WEBPACK_IMPORTED_MODULE_3__.LogoComponent, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_13__.NgbCollapse, _angular_router__WEBPACK_IMPORTED_MODULE_10__.RouterLinkWithHref, _angular_router__WEBPACK_IMPORTED_MODULE_10__.RouterLinkActive, _components_modal_modal_component__WEBPACK_IMPORTED_MODULE_4__.ModalComponent, _angular_router__WEBPACK_IMPORTED_MODULE_10__.RouterOutlet], styles: [""] });


/***/ }),

/***/ 6747:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppModule": () => (/* binding */ AppModule)
/* harmony export */ });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/platform-browser */ 2313);
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app-routing.module */ 158);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/forms */ 3075);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.component */ 5041);
/* harmony import */ var _pages_login_login_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pages/login/login.component */ 4902);
/* harmony import */ var _pages_home_home_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pages/home/home.component */ 5245);
/* harmony import */ var _pages_profile_profile_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pages/profile/profile.component */ 8220);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 3707);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/common/http */ 520);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/environments/environment */ 2340);
/* harmony import */ var _shared_auth_auth_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./shared/auth/auth.service */ 866);
/* harmony import */ var _shared_auth_auth_mock_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./shared/auth/auth.mock.service */ 2537);
/* harmony import */ var _shared_user_user_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./shared/user/user.service */ 6331);
/* harmony import */ var _shared_user_user_mock_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./shared/user/user.mock.service */ 5383);
/* harmony import */ var _shared_auth_http_interceptor_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./shared/auth/http-interceptor.service */ 7976);
/* harmony import */ var _components_logo_logo_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/logo/logo.component */ 8484);
/* harmony import */ var _angular_service_worker__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/service-worker */ 9802);
/* harmony import */ var _components_modal_modal_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/modal/modal.component */ 385);
/* harmony import */ var _shared_auth_auth_guard_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./shared/auth/auth-guard.service */ 5233);
/* harmony import */ var _shared_auth_auth_guard_mock_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./shared/auth/auth-guard.mock.service */ 8846);
/* harmony import */ var _shared_display_display_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./shared/display/display.service */ 3515);
/* harmony import */ var _shared_sync_online_guard_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./shared/sync/online-guard.service */ 2493);
/* harmony import */ var _shared_sync_sync_service__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./shared/sync/sync.service */ 5819);
/* harmony import */ var _shared_storage_storage_service__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./shared/storage/storage.service */ 9459);
/* harmony import */ var _pages_downloads_downloads_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./pages/downloads/downloads.component */ 3241);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/core */ 5000);



























class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent] });
AppModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdefineInjector"]({ providers: [
        {
            provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_21__.HTTP_INTERCEPTORS,
            useClass: _shared_auth_http_interceptor_service__WEBPACK_IMPORTED_MODULE_10__.HttpInterceptorService,
            multi: true
        },
        _shared_display_display_service__WEBPACK_IMPORTED_MODULE_15__.DisplayService,
        _shared_sync_online_guard_service__WEBPACK_IMPORTED_MODULE_16__.OnlineGuardService,
        _shared_sync_sync_service__WEBPACK_IMPORTED_MODULE_17__.SyncService,
        _shared_storage_storage_service__WEBPACK_IMPORTED_MODULE_18__.StorageService,
        (src_environments_environment__WEBPACK_IMPORTED_MODULE_5__.environment.mock_http ? { provide: _shared_auth_auth_service__WEBPACK_IMPORTED_MODULE_6__.AuthService, useClass: _shared_auth_auth_mock_service__WEBPACK_IMPORTED_MODULE_7__.AuthService } : _shared_auth_auth_service__WEBPACK_IMPORTED_MODULE_6__.AuthService),
        (src_environments_environment__WEBPACK_IMPORTED_MODULE_5__.environment.mock_http ? { provide: _shared_user_user_service__WEBPACK_IMPORTED_MODULE_8__.UserService, useClass: _shared_user_user_mock_service__WEBPACK_IMPORTED_MODULE_9__.UserService } : _shared_user_user_service__WEBPACK_IMPORTED_MODULE_8__.UserService),
        (src_environments_environment__WEBPACK_IMPORTED_MODULE_5__.environment.deactivate_auth_guard ? { provide: _shared_auth_auth_guard_service__WEBPACK_IMPORTED_MODULE_13__.AuthGuardService, useClass: _shared_auth_auth_guard_mock_service__WEBPACK_IMPORTED_MODULE_14__.AuthGuardService } : _shared_auth_auth_guard_service__WEBPACK_IMPORTED_MODULE_13__.AuthGuardService),
    ], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_22__.BrowserModule,
            _app_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppRoutingModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_23__.FormsModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_23__.ReactiveFormsModule,
            _angular_common_http__WEBPACK_IMPORTED_MODULE_21__.HttpClientModule,
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_24__.NgbModule,
            _angular_service_worker__WEBPACK_IMPORTED_MODULE_25__.ServiceWorkerModule.register('ngsw-worker.js', {
                enabled: true,
                // Register the ServiceWorker as soon as the application is stable
                // or after 30 seconds (whichever comes first).
                registrationStrategy: 'registerWhenStable:30000'
            }),
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent,
        _pages_login_login_component__WEBPACK_IMPORTED_MODULE_2__.LoginComponent,
        _pages_home_home_component__WEBPACK_IMPORTED_MODULE_3__.HomeComponent,
        _pages_profile_profile_component__WEBPACK_IMPORTED_MODULE_4__.ProfileComponent,
        _components_logo_logo_component__WEBPACK_IMPORTED_MODULE_11__.LogoComponent,
        _components_modal_modal_component__WEBPACK_IMPORTED_MODULE_12__.ModalComponent,
        _pages_downloads_downloads_component__WEBPACK_IMPORTED_MODULE_19__.DownloadsComponent], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_22__.BrowserModule,
        _app_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppRoutingModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_23__.FormsModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_23__.ReactiveFormsModule,
        _angular_common_http__WEBPACK_IMPORTED_MODULE_21__.HttpClientModule,
        _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_24__.NgbModule, _angular_service_worker__WEBPACK_IMPORTED_MODULE_25__.ServiceWorkerModule] }); })();


/***/ }),

/***/ 8484:
/*!***************************************************!*\
  !*** ./src/app/components/logo/logo.component.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LogoComponent": () => (/* binding */ LogoComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 5000);

class LogoComponent {
    constructor() { }
    ngOnInit() {
    }
}
LogoComponent.ɵfac = function LogoComponent_Factory(t) { return new (t || LogoComponent)(); };
LogoComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: LogoComponent, selectors: [["app-logo"]], decls: 4, vars: 0, consts: [[1, "logo-container", "d-flex", "align-items-center", "justify-content-center"], ["src", "assets/icons/icon-512x512.png", 1, "logo-image"], [1, "logo-text", "ms-1"]], template: function LogoComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "span", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, " Syncwatch ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    } }, styles: [".logo-image[_ngcontent-%COMP%] {\n  height: 3rem;\n}\n\n.logo-text[_ngcontent-%COMP%] {\n  font-weight: bold;\n  font-size: 2rem;\n}\n\n.logo-lg[_nghost-%COMP%]   .logo-image[_ngcontent-%COMP%] {\n  height: 4rem;\n}\n\n.logo-lg[_nghost-%COMP%]   .logo-text[_ngcontent-%COMP%] {\n  font-weight: bold;\n  font-size: 3rem;\n}"] });


/***/ }),

/***/ 385:
/*!*****************************************************!*\
  !*** ./src/app/components/modal/modal.component.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ModalComponent": () => (/* binding */ ModalComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 5000);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 3707);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 9808);




const _c0 = ["modalContent"];
function ModalComponent_ng_template_0_button_6_Template(rf, ctx) { if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ModalComponent_ng_template_0_button_6_Template_button_click_0_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6); const button_r4 = restoredCtx.$implicit; const modal_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit; return modal_r2.close(button_r4.result); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const button_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMap"](button_r4.class);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("innerHTML", button_r4.innerHtml, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeHtml"]);
} }
function ModalComponent_ng_template_0_Template(rf, ctx) { if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 1)(1, "h4", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "button", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ModalComponent_ng_template_0_Template_button_click_3_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r9); const modal_r2 = restoredCtx.$implicit; return modal_r2.dismiss("Cross click"); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, ModalComponent_ng_template_0_button_6_Template, 1, 3, "button", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r1._title);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("innerHTML", ctx_r1._bodyHtml, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeHtml"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r1._buttons);
} }
class ModalComponent {
    constructor(modalService) {
        this.modalService = modalService;
        this._bodyHtml = '';
        this._title = '';
        this._buttons = [];
        this.onClose = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    }
    ngOnInit() {
    }
    open(bodyHtml, title = 'Modal Title', buttons) {
        this._bodyHtml = bodyHtml;
        this._title = title;
        this._buttons = buttons;
        return this.modalService.open(this.modalContent, { ariaLabelledBy: 'modal-basic-title' }).result;
    }
}
ModalComponent.ɵfac = function ModalComponent_Factory(t) { return new (t || ModalComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__.NgbModal)); };
ModalComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ModalComponent, selectors: [["app-modal"]], viewQuery: function ModalComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 5);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.modalContent = _t.first);
    } }, decls: 2, vars: 0, consts: [["modalContent", ""], [1, "modal-header"], ["id", "modal-basic-title", 1, "modal-title"], ["type", "button", "aria-label", "Close", 1, "btn-close", 3, "click"], [1, "modal-body", 3, "innerHTML"], [1, "modal-footer"], ["type", "button", 3, "class", "innerHTML", "click", 4, "ngFor", "ngForOf"], ["type", "button", 3, "innerHTML", "click"]], template: function ModalComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, ModalComponent_ng_template_0_Template, 7, 3, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgForOf], styles: [""], changeDetection: 0 });


/***/ }),

/***/ 3241:
/*!********************************************************!*\
  !*** ./src/app/pages/downloads/downloads.component.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DownloadsComponent": () => (/* binding */ DownloadsComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 5000);
/* harmony import */ var src_app_shared_storage_storage_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/shared/storage/storage.service */ 9459);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 9808);



function DownloadsComponent_p_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Storage not supported");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function DownloadsComponent_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate2"]("Used ", ctx_r2.storageUsage, " of ", ctx_r2.storageQuota, "");
} }
class DownloadsComponent {
    constructor(storageService) {
        this.storageService = storageService;
        this.storageSupported = true;
        this.storageQuota = "";
        this.storageUsage = "";
    }
    ngOnInit() {
        this.storageService.getStorageEstimateReadable().then(est => {
            this.storageQuota = est.quota;
            this.storageUsage = est.usage;
        }).catch(err => {
            this.storageSupported = false;
        });
    }
}
DownloadsComponent.ɵfac = function DownloadsComponent_Factory(t) { return new (t || DownloadsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_shared_storage_storage_service__WEBPACK_IMPORTED_MODULE_0__.StorageService)); };
DownloadsComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: DownloadsComponent, selectors: [["app-downloads"]], decls: 3, vars: 2, consts: [[4, "ngIf", "ngIfElse"], ["container", ""]], template: function DownloadsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, DownloadsComponent_p_0_Template, 2, 0, "p", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, DownloadsComponent_ng_template_1_Template, 2, 2, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
    } if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.storageSupported)("ngIfElse", _r1);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf], styles: [""] });


/***/ }),

/***/ 5245:
/*!**********************************************!*\
  !*** ./src/app/pages/home/home.component.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HomeComponent": () => (/* binding */ HomeComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 5000);

class HomeComponent {
    constructor() { }
    ngOnInit() {
    }
}
HomeComponent.ɵfac = function HomeComponent_Factory(t) { return new (t || HomeComponent)(); };
HomeComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: HomeComponent, selectors: [["app-home"]], decls: 2, vars: 0, template: function HomeComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "home works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: [""] });


/***/ }),

/***/ 4902:
/*!************************************************!*\
  !*** ./src/app/pages/login/login.component.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoginComponent": () => (/* binding */ LoginComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 3075);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 262);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 2843);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 5000);
/* harmony import */ var src_app_shared_auth_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/shared/auth/auth.service */ 866);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 4202);
/* harmony import */ var src_app_shared_sync_sync_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/shared/sync/sync.service */ 5819);
/* harmony import */ var _components_logo_logo_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/logo/logo.component */ 8484);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 9808);









function LoginComponent_span_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "span", 13);
} }
function LoginComponent_div_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx_r1.errorMessage);
} }
class LoginComponent {
    constructor(authService, router, syncService) {
        this.authService = authService;
        this.router = router;
        this.syncService = syncService;
        this.errorMessage = "";
        this.loading = false;
        this.loginForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormGroup({
            username: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required),
            password: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required),
            stay_signedin: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControl(false),
        });
    }
    get username() {
        return this.loginForm.get('username');
    }
    get password() {
        return this.loginForm.get('password');
    }
    ngOnInit() {
        if (this.authService.isLoggedIn() || !this.syncService.isOnline())
            this.router.navigate(['home']);
    }
    useOffline() {
        this.syncService.setVoluntaryOffline(true);
        this.router.navigate(['home']);
    }
    login() {
        this.loginForm.markAllAsTouched();
        const val = this.loginForm.value;
        if (this.loginForm.invalid) {
            return;
        }
        this.loading = true;
        this.authService.login(val.username, val.password, val.stay_signedin)
            .pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_5__.catchError)(err => {
            this.errorMessage = err.error.description;
            this.loading = false;
            return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.throwError)(() => err);
        })).subscribe(() => {
            this.router.navigate(['home']);
        });
    }
}
LoginComponent.ɵfac = function LoginComponent_Factory(t) { return new (t || LoginComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_shared_auth_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_7__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_shared_sync_sync_service__WEBPACK_IMPORTED_MODULE_1__.SyncService)); };
LoginComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: LoginComponent, selectors: [["app-login"]], decls: 18, vars: 9, consts: [[1, "jumbotron", "d-flex", "align-items-center", "m-safe", "min-vh-100"], [1, "container", "text-center", 2, "max-width", "400px", 3, "formGroup", "submit"], [1, "logo-lg"], [1, "form-group", "mt-3"], ["type", "text", "id", "username", "formControlName", "username", "placeholder", "Username", 1, "form-control"], ["type", "password", "id", "password", "formControlName", "password", "placeholder", "Password", 1, "form-control"], ["type", "submit", 1, "btn", "btn-primary", "mt-3", "w-100", 3, "disabled"], ["class", "spinner-border spinner-border-sm", "role", "status", 4, "ngIf"], [1, "form-group", "mt-2"], ["type", "checkbox", "name", "stay_signedin", "formControlName", "stay_signedin", "id", "stay_signedin", 1, "form-check-input"], ["for", "stay_signedin", 1, "form-check-label", "ms-2"], ["class", "alert alert-danger mt-2", "role", "alert", 4, "ngIf"], ["type", "button", 1, "btn", "btn-dark", "mt-3", 3, "disabled", "click"], ["role", "status", 1, "spinner-border", "spinner-border-sm"], ["role", "alert", 1, "alert", "alert-danger", "mt-2"]], template: function LoginComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0)(1, "form", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("submit", function LoginComponent_Template_form_submit_1_listener() { return ctx.login(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](2, "app-logo", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](4, "input", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](6, "input", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](8, LoginComponent_span_8_Template, 1, 0, "span", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9, " Login ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](11, "input", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "label", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](13, "Stay Signed In");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](14, LoginComponent_div_14_Template, 2, 1, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](15, "button", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function LoginComponent_Template_button_click_15_listener() { return ctx.useOffline(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](16, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](17, "Use Offline");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("formGroup", ctx.loginForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("is-invalid", ctx.username.invalid && (ctx.username.dirty || ctx.username.touched));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("is-invalid", ctx.password.invalid && (ctx.password.dirty || ctx.password.touched));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("disabled", ctx.loading);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.loading);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.errorMessage);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("disabled", ctx.loading);
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormGroupDirective, _components_logo_logo_component__WEBPACK_IMPORTED_MODULE_2__.LogoComponent, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControlName, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.CheckboxControlValueAccessor], styles: [""] });


/***/ }),

/***/ 8220:
/*!****************************************************!*\
  !*** ./src/app/pages/profile/profile.component.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProfileComponent": () => (/* binding */ ProfileComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 8505);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 3900);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 5000);
/* harmony import */ var src_app_shared_user_user_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/shared/user/user.service */ 6331);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 4202);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 9808);






function ProfileComponent_ul_6_li_1_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "(current) ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}

function ProfileComponent_ul_6_li_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "li", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, ProfileComponent_ul_6_li_1_span_1_Template, 2, 0, "span", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "button", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ProfileComponent_ul_6_li_1_Template_button_click_3_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r8);
      const session_r5 = restoredCtx.$implicit;
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return ctx_r7.deleteSessionById(session_r5.id, session_r5.is_current);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "Delete");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }

  if (rf & 2) {
    const session_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", session_r5.is_current);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", session_r5.device_info, " ");
  }
}

function ProfileComponent_ul_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ul", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, ProfileComponent_ul_6_li_1_Template, 5, 2, "li", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const sessions_r3 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", sessions_r3);
  }
}

function ProfileComponent_ng_template_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "div", 7);
  }
}

class ProfileComponent {
  constructor(userService, router) {
    this.userService = userService;
    this.router = router;
  }

  ngOnInit() {
    this.device_sessions$ = this.userService.sessions();
  }

  deleteSessions() {
    this.device_sessions$ = this.userService.deleteSessions().pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.router.navigate(['login'])));
  }

  deleteSessionById(id, is_current) {
    if (is_current) {
      this.device_sessions$ = this.userService.deleteSessionById(id, is_current).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.router.navigate(['login'])));
      return;
    }

    this.device_sessions$ = this.userService.deleteSessionById(id, is_current).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(() => this.userService.sessions()));
  }

}

ProfileComponent.ɵfac = function ProfileComponent_Factory(t) {
  return new (t || ProfileComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_shared_user_user_service__WEBPACK_IMPORTED_MODULE_0__.UserService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router));
};

ProfileComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: ProfileComponent,
  selectors: [["app-profile"]],
  decls: 10,
  vars: 4,
  consts: [["type", "button", 1, "btn", "btn-danger", 3, "click"], ["class", "list-group", 4, "ngIf", "ngIfElse"], ["loading", ""], [1, "list-group"], ["class", "list-group-item", 4, "ngFor", "ngForOf"], [1, "list-group-item"], [4, "ngIf"], ["role", "status", 1, "spinner-border"]],
  template: function ProfileComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div")(1, "h4");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Sessions");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div")(4, "button", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ProfileComponent_Template_button_click_4_listener() {
        return ctx.deleteSessions();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "Delete All Sessions");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, ProfileComponent_ul_6_Template, 2, 1, "ul", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](7, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](8, ProfileComponent_ng_template_8_Template, 1, 0, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    }

    if (rf & 2) {
      const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](9);

      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](7, 2, ctx.device_sessions$))("ngIfElse", _r1);
    }
  },
  directives: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgForOf],
  pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.AsyncPipe],
  styles: [""]
});

/***/ }),

/***/ 8846:
/*!********************************************************!*\
  !*** ./src/app/shared/auth/auth-guard.mock.service.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthGuardService": () => (/* binding */ AuthGuardService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 4004);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 5000);
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth.service */ 866);



class AuthGuardService {
    constructor(authService) {
        this.authService = authService;
    }
    canActivate() {
        if (!this.authService.isLoggedIn()) {
            return this.authService.login("test", "test", false).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.map)(() => true));
        }
        return true;
    }
}
AuthGuardService.ɵfac = function AuthGuardService_Factory(t) { return new (t || AuthGuardService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService)); };
AuthGuardService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: AuthGuardService, factory: AuthGuardService.ɵfac });


/***/ }),

/***/ 5233:
/*!***************************************************!*\
  !*** ./src/app/shared/auth/auth-guard.service.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthGuardService": () => (/* binding */ AuthGuardService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 5000);
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth.service */ 866);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 4202);



class AuthGuardService {
    constructor(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    canActivate() {
        return this.authService.isLoggedIn() || this.router.createUrlTree(['login']);
    }
}
AuthGuardService.ɵfac = function AuthGuardService_Factory(t) { return new (t || AuthGuardService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router)); };
AuthGuardService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: AuthGuardService, factory: AuthGuardService.ɵfac });


/***/ }),

/***/ 2537:
/*!**************************************************!*\
  !*** ./src/app/shared/auth/auth.mock.service.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthService": () => (/* binding */ AuthService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 9646);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 4326);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 8505);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 5000);


class AuthService {
    constructor() {
        this._loggedIn = false;
    }
    login(username, password, stay_signedin) {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_0__.of)({
            msg: 'success',
            expires: 0,
            session_token: '123',
        }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.delay)(500), (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.tap)(() => { this._loggedIn = true; }));
    }
    logout() {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_0__.of)({
            msg: 'success'
        }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.delay)(500), (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.tap)(() => { this._loggedIn = false; }));
    }
    isLoggedIn() {
        return this._loggedIn;
    }
    getSessionToken() {
        return "123";
    }
    unload() {
    }
}
AuthService.ɵfac = function AuthService_Factory(t) { return new (t || AuthService)(); };
AuthService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({ token: AuthService, factory: AuthService.ɵfac });


/***/ }),

/***/ 866:
/*!*********************************************!*\
  !*** ./src/app/shared/auth/auth.service.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthService": () => (/* binding */ AuthService)
/* harmony export */ });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 8505);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 262);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ 2340);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 2843);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 5000);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ 520);
/* harmony import */ var _sync_sync_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sync/sync.service */ 5819);






class AuthService {
    constructor(http, syncService) {
        this.http = http;
        this.syncService = syncService;
    }
    getStorage() {
        return localStorage;
    }
    login(username, password, stay_signedin) {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.api_base_url + '/login', { username, password }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)((res) => this.setSession(res, stay_signedin)));
    }
    logout() {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.api_base_url + '/logout', {}, {
            headers: {
                'Authorization': this.getSessionToken()
            }
        }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.catchError)(err => {
            this.clearStorage();
            return (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.throwError)(() => err);
        }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this.clearStorage()));
    }
    isLoggedIn() {
        if (!this.syncService.isOnline())
            return true;
        const exp = this.getExpiration();
        if (exp === undefined)
            return false;
        return exp === -1 || Math.floor(new Date().getTime() / 1000) < exp;
    }
    setSession(authResult, stay_signedin) {
        localStorage.setItem('stay_signedin', (stay_signedin ? '1' : '0'));
        this.getStorage().setItem('session_token', authResult.session_token);
        this.getStorage().setItem('session_expires', JSON.stringify(authResult.expires));
    }
    getExpiration() {
        const expiration = this.getStorage().getItem("session_expires");
        if (expiration === null)
            return;
        return JSON.parse(expiration);
    }
    getStaySignedin() {
        const stay_signedin = localStorage.getItem("stay_signedin");
        return stay_signedin === '1';
    }
    getSessionToken() {
        const session_token = this.getStorage().getItem("session_token");
        if (session_token === null)
            return '';
        return session_token;
    }
    unload() {
        if (this.getStaySignedin())
            return;
        this.logout().subscribe();
        this.clearStorage();
    }
    clearStorage() {
        this.getStorage().removeItem('session_token');
        this.getStorage().removeItem('session_expires');
        localStorage.removeItem("stay_signedin");
    }
}
AuthService.ɵfac = function AuthService_Factory(t) { return new (t || AuthService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_6__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_sync_sync_service__WEBPACK_IMPORTED_MODULE_1__.SyncService)); };
AuthService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({ token: AuthService, factory: AuthService.ɵfac });


/***/ }),

/***/ 7976:
/*!*********************************************************!*\
  !*** ./src/app/shared/auth/http-interceptor.service.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HttpInterceptorService": () => (/* binding */ HttpInterceptorService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 262);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 2843);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 5000);
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth.service */ 866);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 4202);




class HttpInterceptorService {
    constructor(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    intercept(req, next) {
        return next.handle(req).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.catchError)(err => {
            if (err.status == 401) {
                this.authService.clearStorage();
                this.router.navigate(['login']);
            }
            return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.throwError)(() => err);
        }));
    }
}
HttpInterceptorService.ɵfac = function HttpInterceptorService_Factory(t) { return new (t || HttpInterceptorService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router)); };
HttpInterceptorService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({ token: HttpInterceptorService, factory: HttpInterceptorService.ɵfac });


/***/ }),

/***/ 3515:
/*!***************************************************!*\
  !*** ./src/app/shared/display/display.service.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DisplayService": () => (/* binding */ DisplayService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 5000);
/* harmony import */ var ngx_device_detector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-device-detector */ 870);


class DisplayService {
    constructor(deviceService) {
        this.deviceService = deviceService;
    }
    requestFullscreenMobile() {
        if (this.deviceService.isMobile())
            this.requestFullscreen();
    }
    requestFullscreen() {
        const b = document.body;
        if (b.requestFullscreen) {
            b.requestFullscreen();
        }
        else if (b.mozRequestFullScreen) { /* Firefox */
            b.mozRequestFullScreen();
        }
        else if (b.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            b.webkitRequestFullscreen();
        }
        else if (b.msRequestFullscreen) { /* IE/Edge */
            b.msRequestFullscreen();
        }
    }
    exitFullscreen() {
        if (!this.isFullscreen())
            return;
        const d = document;
        if (d.exitFullscreen) {
            d.exitFullscreen();
        }
        else if (d.mozCancelFullScreen) { /* Firefox */
            d.mozCancelFullScreen();
        }
        else if (d.webkitExitFullscreen) { /* Chrome, Safari and Opera */
            d.webkitExitFullscreen();
        }
        else if (d.msExitFullscreen) { /* IE/Edge */
            d.msExitFullscreen();
        }
    }
    isFullscreen() {
        const d = document;
        return d.fullscreenElement ||
            d.webkitFullscreenElement ||
            d.mozFullScreenElement;
    }
}
DisplayService.ɵfac = function DisplayService_Factory(t) { return new (t || DisplayService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](ngx_device_detector__WEBPACK_IMPORTED_MODULE_1__.DeviceDetectorService)); };
DisplayService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: DisplayService, factory: DisplayService.ɵfac });


/***/ }),

/***/ 9459:
/*!***************************************************!*\
  !*** ./src/app/shared/storage/storage.service.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StorageService": () => (/* binding */ StorageService)
/* harmony export */ });
/* harmony import */ var _home_runner_work_Syncwatchv2_Syncwatchv2_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 5861);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 3905);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 9646);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 4004);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 5000);



class StorageService {
  constructor() {
    this.byteSizes = [{
      v: 1000000000,
      s: 'GB'
    }, {
      v: 1000000,
      s: 'MB'
    }, {
      v: 1000,
      s: 'KB'
    }, {
      v: 0,
      s: 'B'
    }];
  }

  bytesToReadable(b) {
    if (b === undefined) return "Unknown";

    for (let byteSize of this.byteSizes) {
      if (b >= byteSize.v) return `${(b / byteSize.v).toFixed()} ${byteSize.s}`;
    }

    return b.toFixed();
  }

  isStoragePersisted() {
    return (0,_home_runner_work_Syncwatchv2_Syncwatchv2_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return (yield navigator.storage) && navigator.storage.persisted ? navigator.storage.persisted() : Promise.reject('storage not available');
    })();
  }

  persist() {
    return (0,_home_runner_work_Syncwatchv2_Syncwatchv2_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return (yield navigator.storage) && navigator.storage.persist ? navigator.storage.persist() : Promise.reject('storage not available');
    })();
  }

  getStorageEstimate() {
    return (0,_home_runner_work_Syncwatchv2_Syncwatchv2_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return (yield navigator.storage) && navigator.storage.estimate ? navigator.storage.estimate() : Promise.reject('storage not available');
    })();
  }

  getStorageEstimateReadable() {
    var _this = this;

    return (0,_home_runner_work_Syncwatchv2_Syncwatchv2_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return yield (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.firstValueFrom)((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.of)(yield _this.getStorageEstimate()).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.map)(est => {
        return {
          quota: _this.bytesToReadable(est.quota),
          usage: _this.bytesToReadable(est.usage)
        };
      })));
    })();
  }

  tryPersistWithoutPromtingUser() {
    return (0,_home_runner_work_Syncwatchv2_Syncwatchv2_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!navigator.storage || !navigator.storage.persisted) {
        return "never";
      }

      let persisted = yield navigator.storage.persisted();

      if (persisted) {
        return "persisted";
      }

      if (!navigator.permissions || !navigator.permissions.query) {
        return "prompt"; // It MAY be successful to prompt. Don't know.
      }

      const permission = yield navigator.permissions.query({
        name: "persistent-storage"
      });

      if (permission.state === "granted") {
        persisted = yield navigator.storage.persist();

        if (persisted) {
          return "persisted";
        } else {
          throw new Error("Failed to persist");
        }
      }

      if (permission.state === "prompt") {
        return "prompt";
      }

      return "never";
    })();
  }

}

StorageService.ɵfac = function StorageService_Factory(t) {
  return new (t || StorageService)();
};

StorageService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
  token: StorageService,
  factory: StorageService.ɵfac
});

/***/ }),

/***/ 2493:
/*!*****************************************************!*\
  !*** ./src/app/shared/sync/online-guard.service.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OnlineGuardService": () => (/* binding */ OnlineGuardService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 5000);
/* harmony import */ var _sync_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sync.service */ 5819);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 4202);



class OnlineGuardService {
    constructor(syncService, router) {
        this.syncService = syncService;
        this.router = router;
    }
    canActivate() {
        return this.syncService.isOnline() || this.router.createUrlTree(['home']);
    }
}
OnlineGuardService.ɵfac = function OnlineGuardService_Factory(t) { return new (t || OnlineGuardService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_sync_service__WEBPACK_IMPORTED_MODULE_0__.SyncService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router)); };
OnlineGuardService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: OnlineGuardService, factory: OnlineGuardService.ɵfac });


/***/ }),

/***/ 5819:
/*!*********************************************!*\
  !*** ./src/app/shared/sync/sync.service.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SyncService": () => (/* binding */ SyncService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 6758);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 4968);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 5000);


class SyncService {
    constructor() {
        this.voluntaryOffline = false;
        this.networkOffline = false;
        this.changes = new rxjs__WEBPACK_IMPORTED_MODULE_0__.Subject();
        this.networkOffline = !navigator.onLine;
        (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.fromEvent)(window, 'online').subscribe(() => {
            this.networkOffline = false;
            this.changes.next();
        });
        (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.fromEvent)(window, 'offline').subscribe(() => {
            this.networkOffline = true;
            this.changes.next();
        });
    }
    setVoluntaryOffline(offline) {
        this.voluntaryOffline = offline;
        this.changes.next();
    }
    isVoluntaryOffline() {
        return !this.networkOffline && this.voluntaryOffline;
    }
    isOffline() {
        return this.voluntaryOffline || this.networkOffline;
    }
    isOnline() {
        return !this.isOffline();
    }
}
SyncService.ɵfac = function SyncService_Factory(t) { return new (t || SyncService)(); };
SyncService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: SyncService, factory: SyncService.ɵfac });


/***/ }),

/***/ 5383:
/*!**************************************************!*\
  !*** ./src/app/shared/user/user.mock.service.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserService": () => (/* binding */ UserService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 9646);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 4326);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 8505);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 5000);


class UserService {
    constructor() {
        this._sessions = [
            {
                id: 1,
                device_info: 'My Device',
                is_current: true,
            },
            {
                id: 2,
                device_info: 'Your Device',
                is_current: false,
            }
        ];
    }
    sessions() {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_0__.of)(this._sessions).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.delay)(500));
    }
    deleteSessions() {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_0__.of)({
            msg: 'success'
        }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.delay)(500), (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this._sessions = []));
    }
    deleteSessionById(id, delete_after) {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_0__.of)({
            msg: 'success'
        }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.delay)(500), (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.tap)(() => this._sessions = this._sessions.filter((value) => value.id != id)));
    }
}
UserService.ɵfac = function UserService_Factory(t) { return new (t || UserService)(); };
UserService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({ token: UserService, factory: UserService.ɵfac });


/***/ }),

/***/ 6331:
/*!*********************************************!*\
  !*** ./src/app/shared/user/user.service.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserService": () => (/* binding */ UserService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 4004);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 8505);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ 2340);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 5000);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ 520);
/* harmony import */ var _auth_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../auth/auth.service */ 866);





class UserService {
    constructor(http, authService) {
        this.http = http;
        this.authService = authService;
    }
    sessions() {
        return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.api_base_url + '/sessions', {
            headers: {
                'Authorization': this.authService.getSessionToken()
            }
        }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(data => data.sessions));
    }
    deleteSessions() {
        return this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.api_base_url + '/delete-sessions', {}, {
            headers: {
                'Authorization': this.authService.getSessionToken()
            }
        }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.tap)(() => this.authService.clearStorage()));
    }
    deleteSessionById(id, delete_after) {
        let obs = this.http.post(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.api_base_url + '/delete-sessions', {
            session_id: id
        }, {
            headers: {
                'Authorization': this.authService.getSessionToken()
            }
        });
        if (delete_after)
            obs = obs.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.tap)(() => this.authService.clearStorage()));
        return obs;
    }
}
UserService.ɵfac = function UserService_Factory(t) { return new (t || UserService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_auth_auth_service__WEBPACK_IMPORTED_MODULE_1__.AuthService)); };
UserService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({ token: UserService, factory: UserService.ɵfac });


/***/ }),

/***/ 2340:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "environment": () => (/* binding */ environment)
/* harmony export */ });
const environment = {
    production: false,
    api_base_url: 'about:now',
    mock_http: true,
    deactivate_auth_guard: true,
    router_use_hash: true,
};


/***/ }),

/***/ 4431:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ 2313);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 5000);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.module */ 6747);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ 2340);




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.production) {
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.enableProdMode)();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.platformBrowser().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule)
    .catch(err => console.error(err));


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(4431)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);