
'use strict';

import template from './view-profile.template.html';
import UserService from './../../services/user/user.service';
import FollowsService from './../../services/follows/follows.service';
import ChatService from './../../services/chat/chat.service';

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
    constructor($state,UserService, FollowsService, ChatService){
        this.model = {};
        this.$state = $state;
        this.UserService = UserService;
        this.FollowsService = FollowsService;
        this.ChatService = ChatService;
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

    newChat(user) {
        console.log("go new chat, recipient: " + user._id);
        this.$state.go('chat', { recipientId : user});
    }



    static get $inject(){
        return ['$state', UserService.name, FollowsService.name, ChatService.name];
    }

}


export default ViewProfileComponent;