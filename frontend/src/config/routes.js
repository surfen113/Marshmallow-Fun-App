'use strict';


import LoginComponent from './../components/view-login/view-login.component';
import ActivityMapComponent from './../components/activity-map/activity-map.component';
import RegisterComponent from './../components/view-register/view-register.component';
import MapComponent from './../components/view-map/view-map.component';
import UserSettingsComponent from './../components/view-user-settings/view-user-settings.component';
import MoviesService from './../services/movies/movies.service';
import UserService from './../services/user/user.service';
import SmallHeaderComponent from './../components/app-small-header/app-small-header.component';
import ViewChatComponent from './../components/view-chat/view-chat.component';
import ViewMyFollowListComponent from './../components/view-my-follow-list/view-my-follow-list.component';
import ViewMyActivitiesComponent from './../components/view-my-activities/view-my-activities.component';
import ViewActivityCreateComponent from './../components/view-activity-create/view-activity-create.component';
import ActivitiesService from './../services/activities/activities.service';
import ViewActivityComponent from './../components/view-activity/view-activity.component';
import ViewActivityEditComponent from './../components/view-activity-edit/view-activity-edit.component';
import FollowsService from './../services/follows/follows.service';
import JoinsService from './../services/joins/joins.service';

import MoviesComponent from './../components/view-movies/view-movies.component';
import MovieComponent from './../components/view-movie/view-movie.component';

import ProfileComponent from './../components/view-profile/view-profile.component';

resolveMovie.$inject = ['$stateParams', MoviesService.name];
function resolveMovie($stateParams,moviesService){
    console.log($stateParams);
    return moviesService.get($stateParams.movieId);
}

resolveMovies.$inject = [MoviesService.name];
function resolveMovies(moviesService){
    return moviesService.list();
}

resolveActivities.$inject = [ActivitiesService.name];
function resolveActivities(activitiesService){
    return activitiesService.list();
}

resolveJoins.$inject = [JoinsService.name];
function resolveJoins(joinsService){
    return joinsService.list();
}

resolveFollows.$inject = [FollowsService.name];
function resolveFollows(followsService){
    return followsService.list();
}

resolveActivity.$inject = ['$stateParams', ActivitiesService.name];
function  resolveActivity($stateParams,activitiesService) {
    return activitiesService.get($stateParams.activityId);
}



resolveProfile.$inject = ['$stateParams', UserService.name];
function resolveProfile($stateParams,userService){
    return userService.getUserSettings($stateParams.userId);
}

config.$inject = ['$stateProvider', '$urlRouterProvider'];
export default function config ($stateProvider, $urlRouterProvider) {

    // For any unmatched url, redirect to /home
    $urlRouterProvider.otherwise("/map");

    $stateProvider


        .state('login', {
            views: {
                'headerArea': {
                    template: '<app-header></app-header>',
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
                    template: '<app-header></app-header>',
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
            resolve: {
                activities: resolveActivities
            }
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
            resolve: {
                activities: resolveActivities,
                joins: resolveJoins
            }
        })

        .state('activityCreate', {
            views: {
                'headerArea': {
                    template: '<app-header></app-header>',
                },
                'container': {
                    component: ViewActivityCreateComponent.name,
                },
            },
            url: '/viewActivityCreate',
        })

        .state('movie', {
            url: '/movies/:movieId',
            component: MovieComponent.name,
            resolve: {
                movie : resolveMovie
            }
        })

        .state('movies', {
            url: '/movies',
            component: MoviesComponent.name,
            resolve: {
                movies : resolveMovies
            }
        })

        .state('profile', {
            url: '/profile/:profileId',
            component: ProfileComponent.name,
            resolve: {
                profile : resolveProfile
            }
        })
        .state('activity', {
        views: {
            'headerArea': {
                template: '<app-header></app-header>',
            },
            'container': {
                component: ViewActivityComponent.name,
            },
        },
        url: '/activity/:activityId',
        resolve: {
            activity: resolveActivity,
            joins: resolveJoins
        }
        })
        .state('activityEdit', {
            views: {
                'headerArea': {
                    template: '<app-header></app-header>',
                },
                'container': {
                    component: ViewActivityEditComponent.name,
                },
            },
            url: '/activity/:activityId',
            resolve: {
                activity: resolveActivity
            }
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
            resolve: {
                follows: resolveFollows
            }
        })
        .state('userProfile', {
            views: {
                'headerArea': {
                    template: '<app-header></app-header>',
                },
                'container': {
                    component: ProfileComponent.name,
                },
            },
            url: '/userProfile/:userId',
            resolve: {
                user: resolveProfile
            }
        })
}

