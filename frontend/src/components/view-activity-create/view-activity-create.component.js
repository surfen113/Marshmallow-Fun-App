
'use strict';

import template from './view-activity-create.template.html';

import ActivitiesService from './../../services/activities/activities.service';
import UserService from './../../services/user/user.service';

class ViewActivityCreateComponent {
    constructor(){
        this.controller = ViewActivityCreateComponentController;
        this.template = template;
    }

    static get name() {
        return 'viewActivityCreate';
    }
}

class ViewActivityCreateComponentController{
    constructor($state, ActivitiesService,UserService){
        this.activity = {};
        this.$state = $state;
        this.ActivitiesService = ActivitiesService;
        this.UserService = UserService;
    }

    cancel() {
        this.$state.go('myActivities',{});
    };

    save() {
        //let title = this.activity.title;
        let user = this.UserService.getCurrentUser();

        this.activity['user'] = user['_id'];
        this.ActivitiesService.create(this.activity).then(data => {
            let _id = data[_id];
            this.$state.go('myActivities',{activityId:_id});
    });


        /*
        let user = this.UserService.getCurrentUser();

        this.activity['user'] = user['_id'];
        this.ActivitiesService.create(this.activity).then(data => {
            this.$state.go('myActivities',{});

            //this.$state.go('movie',{ movieId:_id});
    });
    */
    };


    static get $inject(){
        return ['$state', ActivitiesService.name, UserService.name];
    }

}


export default ViewActivityCreateComponent;