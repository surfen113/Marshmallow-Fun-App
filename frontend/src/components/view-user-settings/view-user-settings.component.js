
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

        let user = this.UserService.getCurrentUser();



        //$ctrl.settings.firstname = UserService.getCurrentUserInformation();
        /*
         $ctrl.settings.firstname = this.UserService.getUserInformation().firstname;
         $ctrl.settings.lastname = this.UserService.getUserInformation().lastname;
         $ctrl.settings.email = this.UserService.getUserInformation().email;
         $ctrl.settings.password = this.UserService.getUserInformation().password;
         $ctrl.settings.password = this.UserService.getUserInformation().password;
         $ctrl.settings.birthday = this.UserService.getUserInformation().birthday;
         $ctrl.settings.address = this.UserService.getUserInformation().address;
         $ctrl.settings.mobile = this.UserService.getUserInformation().mobile;
         $ctrl.settings.aboutme = this.UserService.getUserInformation().aboutme;
         $ctrl.settings.sports = this.UserService.getUserInformation().sports;
         $ctrl.settings.social = this.UserService.getUserInformation().social;
         $ctrl.settings.musik = this.UserService.getUserInformation().musik;
         $ctrl.settings.culture = this.UserService.getUserInformation().culture;
         $ctrl.settings.party = this.UserService.getUserInformation().party;

*/
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