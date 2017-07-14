
'use strict';

import UserService from './../../services/user/user.service';
import template from './view-my-follow-list.template.html';
import FollowsService from './../../services/follows/follows.service';

//import './view-login.style.css';

class ViewMyFollowListComponent {
    constructor(){
        this.controller = ViewMyFollowListComponentController;
        this.template = template;
        this.bindings = {
            follows: '<',
        }
    }

    static get name() {
        return 'myFollowList';
    }


}

class ViewMyFollowListComponentController{
    constructor($state,UserService,FollowsService){
        this.$state = $state;
        this.UserService = UserService;
        this.FollowsService = FollowsService;
    }

    static get $inject(){
        return ['$state', UserService.name, FollowsService.name];
    }

}


export default  ViewMyFollowListComponent;