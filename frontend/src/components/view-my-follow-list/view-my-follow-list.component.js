
'use strict';

import UserService from './../../services/user/user.service';
import template from './view-my-follow-list.template.html';

//import './view-login.style.css';

class ViewMyFollowListComponent {
    constructor(){
        this.controller = ViewMyFollowListComponentController;
        this.template = template;

    }

    static get name() {
        return 'myFollowList';
    }


}

class ViewMyFollowListComponentController{
    constructor($state,UserService){
        this.$state = $state;
        this.UserService = UserService;
    }

    static get $inject(){
        return ['$state', UserService.name];
    }

}


export default  ViewMyFollowListComponent;