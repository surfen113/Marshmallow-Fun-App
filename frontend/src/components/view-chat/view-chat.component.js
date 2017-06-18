
'use strict';

import UserService from './../../services/user/user.service';
import template from './view-chat.template.html';

//import './view-login.style.css';

class ViewChatComponent {
    constructor(){
        this.controller = ViewChatComponentController;
        this.template = template;

    }

    static get name() {
        return 'chat';
    }


}

class ViewChatComponentController {
    constructor($state,UserService){
        this.$state = $state;
        this.UserService = UserService;
    }

    static get $inject(){
        return ['$state', UserService.name];
    }

}


export default  ViewChatComponent;