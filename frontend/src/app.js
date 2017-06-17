
'use strict';

import angular from 'angular';
import uiRouter from '@uirouter/angularjs';

import angularMaterial from 'angular-material';
import 'angular-material/angular-material.css';

import ngMdIcons from 'angular-material-icons';

import MoviesService from './services/movies/movies';
import UserService from './services/user/user';

import Routes from './config/routes';
import Middlewares from './config/middlewares';

import AppContent from './components/app-content/app-content';
import ViewLogin from './components/view-login/view-login';
import ActivityMap from './components/activity-map/activity-map';
import ViewRegister from './components/view-register/view-register';
import ViewMap from './components/view-map/view-map';
import ViewUserSettings from './components/view-user-settings/view-user-settings';
import AppSmallHeader from './components/app-small-header/app-small-header';
import ngMap from 'ngmap';

let app = angular.module('app', [
    uiRouter,
    angularMaterial,
    ngMdIcons,
    UserService.name,
    AppContent.name,
    ViewLogin.name,
    ActivityMap.name,
    ViewRegister.name,
    ViewMap.name,
    ViewUserSettings.name,
    AppSmallHeader.name,
    ngMap
]);

// app.constant('API_URL', 'http://5aee6f28.ngrok.io/api');
app.constant('API_URL', 'http://localhost:3000/api');
app.config(Routes);
app.config(Middlewares);


angular.element(document).ready(function() {
    return angular.bootstrap(document.body, [app.name], {
        strictDi: true
    });
});


export default app;