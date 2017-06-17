'use strict';


import LoginComponent from './../components/view-login/view-login.component';
import ActivityMapComponent from './../components/activity-map/activity-map.component';
import RegisterComponent from './../components/view-register/view-register.component';
import MapComponent from './../components/view-map/view-map.component';
import UserSettingsComponent from './../components/view-user-settings/view-user-settings.component';
import MoviesService from './../services/movies/movies.service';
import SmallHeaderComponent from './../components/app-small-header/app-small-header.component';

resolveMovie.$inject = ['$stateParams', MoviesService.name];
function resolveMovie($stateParams,moviesService){
    return moviesService.get($stateParams.movieId);
}

resolveMovies.$inject = [MoviesService.name];
function resolveMovies(moviesService){
    return moviesService.list();
}


config.$inject = ['$stateProvider', '$urlRouterProvider'];
export default function config ($stateProvider, $urlRouterProvider){

    // For any unmatched url, redirect to /home
    $urlRouterProvider.otherwise("/map");

    $stateProvider


        .state('login', {
            views: {
                'headerArea': {
                    component: SmallHeaderComponent.name,
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
                    template: '<app-header ></app-header>',
                },
                'container': {
                    component: ActivityMapComponent.name,
                },
                'activityMap': {
                    template: '<ng-map center="[40.74, -74.18]"></ng-map>',
                },
            },
            url: '/activityMap',
            //component: ActivityMapComponent.name
        })

        .state('register', {
            views: {
                'headerArea': {
                    component: SmallHeaderComponent.name,
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
                    template: '<app-header ></app-header>',
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
                    template: '<app-header ></app-header>',
                },
                'container': {
                    component: UserSettingsComponent.name,
                },

            },
            url: '/userSettings',
            //component: UserSettingsComponent.name
        })



}

