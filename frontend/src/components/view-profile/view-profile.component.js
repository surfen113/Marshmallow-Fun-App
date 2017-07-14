
'use strict';

import template from './view-profile.template.html';
import MoviesService from './../../services/movies/movies.service';
import UserService from './../../services/user/user.service';

class ViewProfileComponent {
    constructor(){
        this.controller = ViewProfileComponentController;
        this.template = template;
        this.bindings = {
            profile: '<',
        }

    }

    static get name() {
        return 'viewProfile';
    }


}

class ViewProfileComponentController{
    constructor($state,MoviesService,UserService){
        this.$state = $state;
        this.MoviesService = MoviesService;
        this.UserService = UserService;

    }

    // edit () {
    //
    //     console.log(JSON.stringify(this.profile));
    //
    //     if (this.UserService.isAuthenticated()) {
    //         let _id = this.profile['_id'];
    //         this.$state.go('movieEdit',{ movieId:_id});
    //     } else {
    //         this.$state.go('login',{});
    //     }
    //
    // };
    //
    //
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


    // getPosterURL(){
    //     let posterURL = 'http://placehold.it/32x32';
    //     if (this.profile.hasOwnProperty('posters')) {
    //         if (this.profile.posters.hasOwnProperty('thumbnail')) {
    //             posterURL = this.profile.posters.thumbnail;
    //         } else if (this.profile.posters.hasOwnProperty('profile')) {
    //             posterURL = this.profile.posters.profile;
    //         } else if (this.profile.posters.hasOwnProperty('detailed')) {
    //             posterURL = this.profile.posters.detailed;
    //         } else {
    //             posterURL = this.profile.posters.original;
    //         }
    //     }
    //     return posterURL;
    // }

    static get $inject(){
        return ['$state', MoviesService.name, UserService.name];
    }

}


export default ViewProfileComponent;