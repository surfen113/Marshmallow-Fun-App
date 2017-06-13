
'use strict';

import UserService from './../../services/user/user.service';

import template from './view-user-settings.template.html';
import './view-user-settings.style.css';

class ViewUserSettingsComponent {
    constructor(){
        this.controller = ViewUserSettingsComponentController;
        this.template = template;

    }

    static get name() {
        return 'userSettings';
    }


}

class ViewUserSettingsComponentController{
    constructor($state,UserService){
        this.$state = $state;
        this.UserService = UserService;
    }

    submit(){
        let username = this.updateUserSettings.username;
        let firstname = this.updateUserSettings.firstname;
        let lastname = this.updateUserSettings.lastname;
        let email = this.updateUserSettings.email;
        let password = this.updateUserSettings.password;
        let birthday = this.updateUserSettings.birthday;
        let address = this.updateUserSettings.address;
        let aboutme = this.updateUserSettings.aboutme;
        let mobile = this.updateUserSettings.mobile;


        this.UserService.updateUserSettings(username, firstname, lastname, email, password, birthday, address, mobile, aboutme).then(()=> {
            this.$state.go('activityMap',{});
        });

//        this.UserService.login(user,password).then(()=> {
//            this.$state.go('activityMap',{});
//    });
    }
    cancel(){
        this.$state.go('activityMap', {});
    }

    static get $inject(){
        return ['$state', UserService.name];
    }

}


export default ViewUserSettingsComponent;