'use strict';

import angular from 'angular';

import ChatService from './chat.service';


export default angular.module('ChatServiceDefinition', [])
    .service(ChatService.name, ChatService);