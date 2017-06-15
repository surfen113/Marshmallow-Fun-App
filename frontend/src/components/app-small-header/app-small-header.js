'use strict';

import angular from 'angular';

import AppSmallHeaderComponent from './app-small-header.component';


export default angular.module('AppSmallHeader', [])
    .component(AppSmallHeaderComponent.name, new AppSmallHeaderComponent);