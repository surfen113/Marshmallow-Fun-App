'use strict';

import angular from 'angular';

import ViewMyActivitiesComponent from './view-my-activities.component';


export default angular.module('MyActivities', [])
    .component(ViewMyActivitiesComponent.name, new ViewMyActivitiesComponent);