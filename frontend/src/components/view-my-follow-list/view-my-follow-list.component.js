
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
                let index = this.follows.map(x => x['_id']).indexOf(_id);
            this.follows.splice(index, 1);
            //this.$scope.$apply();
        });

        } else {
            this.$state.go('login',{});
        }
    }


    isOwnFollow(userID) {
        console.log("log");
        let user = this.UserService.getCurrentUser();
        if(userID == user['_id']) {
            return true;
        }
        else {
            return false;
        }
    }

    getUsername(followed) {
        let user = this.UserService.getCurrentUser();
        console.log("user: " + user.username);
        console.log("followed: " + followed)

        this.UserService.getUserSettings(user._id).then(data => {


            //return data['username'];

        });

//       var zurueck =  username(followed);

       // console.log(user2);
        //console.log(user2.username);

      //  return zurueck;

    }

    username() {
       return "geil;"

    }


}


export default  ViewMyFollowListComponent;