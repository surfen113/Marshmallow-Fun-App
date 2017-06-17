'use strict';

import angular from 'angular';

import ViewChatComponent from './view-chat.component';


export default angular.module('ViewChat', [])
    .component(ViewChatComponent.name, new ViewChatComponent);