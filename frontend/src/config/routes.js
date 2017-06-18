'use strict';


import LoginComponent from './../components/view-login/view-login.component';
import ActivityMapComponent from './../components/activity-map/activity-map.component';
import RegisterComponent from './../components/view-register/view-register.component';
import MapComponent from './../components/view-map/view-map.component';
import UserSettingsComponent from './../components/view-user-settings/view-user-settings.component';
import MoviesService from './../services/movies/movies.service';
import SmallHeaderComponent from './../components/app-small-header/app-small-header.component';
import ViewChatComponent from './../components/view-chat/view-chat.component';
import ViewMyFollowListComponent from './../components/view-my-follow-list/view-my-follow-list.component';
import ViewMyActivitiesComponent from './../components/view-my-activities/view-my-activities.component';

resolveMovie.$inject = ['$stateParams', MoviesService.name];
function resolveMovie($stateParams,moviesService){
    return moviesService.get($stateParams.movieId);
}

resolveMovies.$inject = [MoviesService.name];
function resolveMovies(moviesService){
    return moviesService.list();
}


config.$inject = ['$stateProvider', '$urlRouterProvider'];
export default function config ($stateProvider, $urlRouterProvider) {

    // For any unmatched url, redirect to /home
    $urlRouterProvider.otherwise("/map");

    $stateProvider


        .state('login', {
            views: {
                'headerArea': {
                    component: '<app-header></app-header>',
                },
                'container': {
                    component: LoginComponent.name,
                },
            },
            url: '/login',
            //component: LoginComponent.name
        })

        .state('activityMap', {
            views: {
                'headerArea': {
                    template: '<app-header></app-header>',
                },
                'container': {
                    component: ActivityMapComponent.name,
                },
                'activityMap': {
                    template: '<ng-map center="[48.26, 11.67]"></ng-map>',
                },
            },
            url: '/activityMap',
            //component: ViewMyFollowListComponent.name
        })

        .state('register', {
            views: {
                'headerArea': {
                    component: '<app-header></app-header>',
                },
                'container': {
                    component: RegisterComponent.name,
                },
            },
            url: '/register',
            //component: RegisterComponent.name
        })

        .state('map', {
            views: {
                'headerArea': {
                    template: '<app-header></app-header>',
                },
                'container': {
                    component: MapComponent.name,
                },
            },
            url: '/map',
            //component: MapComponent.name,
        })

        .state('userSettings', {
            views: {
                'headerArea': {
                    template: '<app-header></app-header>',
                },
                'container': {
                    component: UserSettingsComponent.name,
                },
            },
            url: '/userSettings',
            //component: UserSettingsComponent.name
        })

        .state('chat', {
            views: {
                'headerArea': {
                    template: '<app-header></app-header>',
                },
                'container': {
                    component: ViewChatComponent.name,
                },
            },
            url: '/chat',
        })

        .state('myFollowList', {
            views: {
                'headerArea': {
                    template: '<app-header></app-header>',
                },
                'container': {
                    component: ViewMyFollowListComponent.name,
                },
            },
            url: '/myFollowList',
        })

        .state('myActivities', {
            views: {
                'headerArea': {
                    template: '<app-header></app-header>',
                },
                'container': {
                    component: ViewMyActivitiesComponent.name,
                },
            },
            url: '/myActivities',
        })
}

