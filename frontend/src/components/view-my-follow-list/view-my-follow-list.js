'use strict';

import angular from 'angular';

import ViewMyFollowListComponent from './view-my-follow-list.component';


export default angular.module('MyFollowList', [])
    .component(ViewMyFollowListComponent.name, new ViewMyFollowListComponent);