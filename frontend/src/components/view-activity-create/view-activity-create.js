'use strict';

import angular from 'angular';

import ViewActivityCreateComponent from './view-activity-create.component';


export default angular.module('ViewActivityCreate', [])
    .component(ViewActivityCreateComponent.name, new ViewActivityCreateComponent);