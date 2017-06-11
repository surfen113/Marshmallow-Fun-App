'use strict';

import angular from 'angular';

import ActivityMapComponent from './activity-map.component';


export default angular.module('ActivityMap', [])
    .component(ActivityMapComponent.name, new ActivityMapComponent);