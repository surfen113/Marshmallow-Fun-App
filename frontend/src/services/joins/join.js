'use strict';

import angular from 'angular';

import JoinsService from './joins.service';


export default angular.module('JoinsServiceDefinition', [])
    .service(JoinsService.name, JoinsService)