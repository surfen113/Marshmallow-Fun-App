
'use strict';

import UserService from './../../services/user/user.service';
import template from './view-my-activities.template.html';

//import './view-login.style.css';

class ViewMyActivitiesComponent {
    constructor(){
        this.controller = ViewMyActivitiesComponentController;
        this.template = template;

    }

    static get name() {
        return 'myActivities';
    }


}

class ViewMyActivitiesComponentController{
    constructor($state,UserService){
        this.$state = $state;
        this.UserService = UserService;
    }


    static get $inject(){
        return ['$state', UserService.name];
    }

}


export default ViewMyActivitiesComponent;