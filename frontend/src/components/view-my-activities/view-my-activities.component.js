
'use strict';

import UserService from './../../services/user/user.service';
import ActivitiesService from './../../services/activities/activities.service';
import template from './view-my-activities.template.html';
import JoinsService from './../../services/joins/joins.service';

//import './view-login.style.css';

class ViewMyActivitiesComponent {
    constructor(){
        this.controller = ViewMyActivitiesComponentController;
        this.template = template;
        this.bindings = {
            activities: '<',
            joins: '<',
        }

    }

    static get name() {
        return 'myActivities';
    }


}

class ViewMyActivitiesComponentController{
    constructor($state, ActivitiesService, UserService, JoinsService){
        this.$state = $state;
        this.ActivitiesService = ActivitiesService;
        this.UserService = UserService;
        this.JoinsService = JoinsService;

        //this.activities = this.ActivitiesService.getActivities();
    }



    details (activity) {
        if (this.UserService.isAuthenticated()) {
            let _id = activity['_id'];
            this.$state.go('activity',{ activityId:_id});
        } else {
            this.$state.go('login',{});
        }
    };

    detailsID (activityID) {
        if (this.UserService.isAuthenticated()) {
            this.$state.go('activity',{ activityId:activityID});
        } else {
            this.$state.go('login',{});
        }
    };


    edit (activity) {

        if (this.UserService.isAuthenticated()) {
            let _id = activity['_id'];
            this.$state.go('activityEdit',{ activityId:_id});
        } else {
            this.$state.go('login',{});
        }
    };

    newActivity(){
        if (this.UserService.isAuthenticated()) {
            this.$state.go('activityCreate',{});
        } else {
            this.$state.go('login',{});
        }
    }


    isOwnActivity(userID) {
        let user = this.UserService.getCurrentUser();
        if(userID == user['_id']) {
            return true;
        }
        else {
            return false;
        }
    }

    isJoinedActivity(userID) {
        let user = this.UserService.getCurrentUser();
        if(userID == user['_id']) {
            return true;
        }
        else {
            return false;
        }
    }

    unJoin(id){
        if (this.UserService.isAuthenticated()) {

            this.JoinsService.delete(id).then(response => {
                let index = this.joins.map(x => x['_id']).indexOf(id);
                this.joins.splice(index, 1);
        });

        } else {
            this.$state.go('login',{});
        }
    }

    joinedActivity(userID){
        let user = this.UserService.getCurrentUser();
        this.JoinsService.list()
    }


    delete(activity) {
        if (this.UserService.isAuthenticated()) {
            let _id = activity['_id'];

            this.ActivitiesService.delete(_id).then(response => {
                let index = this.activities.map(x => x['_id']).indexOf(_id);
                this.activities.splice(index, 1);
                //this.$scope.$apply();
        });

        } else {
            this.$state.go('login',{});
        }
    };



    static get $inject(){
        return ['$state', ActivitiesService.name, UserService.name, JoinsService.name];
    }

}


export default ViewMyActivitiesComponent;