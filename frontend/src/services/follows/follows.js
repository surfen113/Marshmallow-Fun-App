'use strict';

import angular from 'angular';

import FollowsService from './follows.service';


export default angular.module('FollowsServiceDefinition', [])
    .service(FollowsService.name, FollowsService)
