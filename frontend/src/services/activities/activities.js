'use strict';

import angular from 'angular';

import ActivitiesService from './activities.service';
// import MoviesService from './movies.local.service';


export default angular.module('ActivitiesServiceDefinition', [])
    .service(ActivitiesService.name, ActivitiesService)