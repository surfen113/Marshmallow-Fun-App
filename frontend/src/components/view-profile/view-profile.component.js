
'use strict';

import template from './view-profile.template.html';
import UserService from './../../services/user/user.service';
import FollowsService from './../../services/follows/follows.service';

class ViewProfileComponent {
    constructor(){
        this.controller = ViewProfileComponentController;
        this.template = template;
        this.bindings = {
            user: '<',
        }

    }

    static get name() {
        return 'viewProfile';
    }


}

class ViewProfileComponentController{
    constructor($state,UserService, FollowsService){
        this.model = {};
        this.$state = $state;
        this.UserService = UserService;
        this.FollowsService = FollowsService;
    }

    $onInit() {
        this.model = JSON.parse(JSON.stringify(this.user));
    }


    // delete() {
    //     if (this.UserService.isAuthenticated()) {
    //         let _id = this.profile['_id'];
    //
    //         this.MoviesService.delete(_id).then(response => {
    //             this.$state.go('movies',{});
    //         });
    //     } else {
    //         this.$state.go('login',{});
    //     }
    // };
    delete(user){
        if (this.UserService.isAuthenticated()) {
            //let _id = user['_id'];

            //this.FollowsService.delete(_id).then(response => {

            //});

        } else {
            this.$state.go('login',{});
        }
    }



    static get $inject(){
        return ['$state', UserService.name, FollowsService.name];
    }

}


export default ViewProfileComponent;