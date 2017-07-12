
'use strict';

import template from './view-movie.template.html';
import ActivitiesService from './../../services/activities/activities.service';
import UserService from './../../services/user/user.service';

class ViewActivityComponent {
    constructor(){
        this.controller = ViewActivityComponentController;
        this.template = template;
        this.bindings = {
            activity: '<',
        }

    }

    static get name() {
        return 'viewActivity';
    }


}

class ViewActivityComponentController{
    constructor($state,ActivitiesService,UserService){
        this.$state = $state;
        this.ActivitiesService = ActivitiesService;
        this.UserService = UserService;

    }

    edit () {

        if (this.UserService.isAuthenticated()) {
            let _id = this.activity['_id'];
            this.$state.go('activityEdit',{ activityId:_id});
        } else {
            this.$state.go('login',{});
        }

    };


    delete() {
        if (this.UserService.isAuthenticated()) {
            let _id = this.activity['_id'];

            this.ActivitiesService.delete(_id).then(response => {
                this.$state.go('myActivities',{});
        });
        } else {
            this.$state.go('login',{});
        }
    };

    /*
    getPosterURL(){
        let posterURL = 'http://placehold.it/32x32';
        if (this.movie.hasOwnProperty('posters')) {
            if (this.movie.posters.hasOwnProperty('thumbnail')) {
                posterURL = this.movie.posters.thumbnail;
            } else if (this.movie.posters.hasOwnProperty('profile')) {
                posterURL = this.movie.posters.profile;
            } else if (this.movie.posters.hasOwnProperty('detailed')) {
                posterURL = this.movie.posters.detailed;
            } else {
                posterURL = this.movie.posters.original;
            }
        }
        return posterURL;
    }

*/
    static get $inject(){
        return ['$state', ActivitiesService.name, UserService.name];
    }

}


export default ViewActivityComponent;
