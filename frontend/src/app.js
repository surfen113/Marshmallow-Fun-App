
'use strict';

import angular from 'angular';
import uiRouter from '@uirouter/angularjs';

import angularMaterial from 'angular-material';
import 'angular-material/angular-material.css';

import ngMdIcons from 'angular-material-icons';

import MoviesService from './services/movies/movies';
import UserService from './services/user/user';
import ActivitiesService from './services/activities/activities';
import FollowsService from './services/follows/follows';
import JoinsService from './services/joins/join';

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
import ViewChat from './components/view-chat/view-chat';
import ViewMyFollowList from './components/view-my-follow-list/view-my-follow-list';
import ViewMyActivities from './components/view-my-activities/view-my-activities';
import ViewActivityCreate from './components/view-activity-create/view-activity-create';
import ViewActivity from './components/view-activity/view-activity';
import ViewActivityEdit from './components/view-activity-edit/view-activity-edit';
import ViewProfile from './components/view-profile/view-profile';

import ViewMovies from './components/view-movies/view-movies';
import ViewMovie from './components/view-movie/view-movie';



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
    ngMap,
    ViewChat.name,
    ViewMyFollowList.name,
    ViewMyActivities.name,
    ActivitiesService.name,
    ViewActivityCreate.name,
    ViewActivity.name,
    ViewActivityEdit.name,
    FollowsService.name,
    ViewProfile.name,
    JoinsService.name,

    ViewMovies.name,
    ViewMovie.name,
    MoviesService.name,

    ViewProfile.name

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