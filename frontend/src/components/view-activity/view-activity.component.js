
'use strict';

import template from './view-activity.template.html';
import ActivitiesService from './../../services/activities/activities.service';
import UserService from './../../services/user/user.service';
import JoinsService from './../../services/joins/joins.service';

class ViewActivityComponent {
    constructor(){
        this.controller = ViewActivityComponentController;
        this.template = template;
        this.bindings = {
            activity: '<',
            joins: '<',
        }

    }

    static get name() {
        return 'activity';
    }


}

class ViewActivityComponentController{
    constructor($state,ActivitiesService,UserService, JoinsService){
        this.$state = $state;
        this.ActivitiesService = ActivitiesService;
        this.UserService = UserService;
        this.JoinsService = JoinsService;
    }


    edit () {

        if (this.UserService.isAuthenticated()) {
            let _id = this.activity['_id'];
            this.$state.go('activityEdit',{ activityId:_id});
        } else {
            this.$state.go('login',{});
        }

    };

    gotoUser(userID){
        if (this.UserService.isAuthenticated()) {

            this.$state.go('userProfile', {userId: userID });
        } else {
            this.$state.go('login',{});
        }
    }

    detailsID (activityID) {
        if (this.UserService.isAuthenticated()) {
            this.$state.go('activity',{ activityId:activityID});
        } else {
            this.$state.go('login',{});
        }
    };


    isJoinedActivity(userID){
        if(this.UserService.getCurrentUser()['_id'] == userID){
            return false;
        }else{
            return true;
        }
    };

    creatorIsCurrentUser(userID){
        if(this.UserService.getCurrentUser()['_id'] == userID){
            return true;
        }else{
            return false;
        }
    }

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

    static get $inject(){
        return ['$state', ActivitiesService.name, UserService.name, JoinsService.name];
    }

}


export default ViewActivityComponent;
