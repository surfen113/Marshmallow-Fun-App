
'use strict';

import UserService from './../../services/user/user.service';


import template from './activity-map.template.html';
//import './view-login.style.css';

class ActivityMapComponent {
    constructor(){
        this.controller = ActivityMapComponentController;
        this.template = template;

    }

    static get name() {
        return 'activityMap';
    }


}

class ActivityMapComponentController{
    constructor($state,UserService){
        this.$state = $state;
        this.UserService = UserService;
    }

}


export default  ActivityMapComponent;