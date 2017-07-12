
'use strict';

import UserService from './../../services/user/user.service';
import ActivitiesService from './../../services/activities/activities.service';
import template from './view-my-activities.template.html';

//import './view-login.style.css';

class ViewMyActivitiesComponent {
    constructor(){
        this.controller = ViewMyActivitiesComponentController;
        this.template = template;
        this.bindings = {
            activities: '<',
        }

    }

    static get name() {
        return 'myActivities';
    }


}

class ViewMyActivitiesComponentController{
    constructor($state, $scope, ActivitiesService, UserService){
        this.$state = $state;
        this.$scope = $scope;
        this.ActivitiesService = ActivitiesService;
        this.UserService = UserService;
    }


/*
    details (activity) {
        let _id = activity['_id'];
        this.$state.go('activity',{ activityId:_id});
    };
*/
    /*
    edit (activity) {

        if (this.UserService.isAuthenticated()) {
            let _id = activity['_id'];
            this.$state.go('activityEdit',{ activityId:_id});
        } else {
            this.$state.go('login',{});
        }
    };
*/
    newActivity(){

        if (this.UserService.isAuthenticated()) {
            this.$state.go('activityCreate',{});
        } else {
            this.$state.go('login',{});
        }

    }

/*
    delete(activity) {
        if (this.UserService.isAuthenticated()) {
            let _id = activity['_id'];

            this.MoviesService.delete(_id).then(response => {
                let index = this.activities.map(x => x['_id']).indexOf(_id);
            this.activities.splice(index, 1);
            this.$scope.$apply();
        })

        } else {
            this.$state.go('login',{});
        }
    };

*/

    static get $inject(){
        return ['$state', 'scope', ActivitiesService.name, UserService.name];
    }

}


export default ViewMyActivitiesComponent;