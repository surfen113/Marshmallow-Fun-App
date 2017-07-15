
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

    details(followed){
        if (this.UserService.isAuthenticated()) {

            this.$state.go('userProfile', {userId: followed });
        } else {
            this.$state.go('login',{});
        }
    }

    delete(follow){
        if (this.UserService.isAuthenticated()) {
            let _id = follow['_id'];

            this.FollowsService.delete(_id).then(response => {
                let index = this.activities.map(x => x['_id']).indexOf(_id);
            this.follows.splice(index, 1);
            this.$scope.$apply();
        });

        } else {
            this.$state.go('login',{});
        }
    }

}


export default  ViewMyFollowListComponent;