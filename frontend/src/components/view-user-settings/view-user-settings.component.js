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
        // populate form with user's data
        this.UserService.getUserSettings(user._id).then(data => {
            console.log(data);
            console.log(JSON.stringify(data));
            data.birthday = new Date(data.birthday);
            this.settings = data;
        });

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

        let user = this.UserService.getCurrentUser();
        this.settings._id = user._id;

        this.UserService.updateUserSettings(this.settings).then((data)=> {
            this.$state.go('userSettings',{});
        });
    }

    cancel(){
        this.$state.go('activityMap', {});
    }

    static get $inject(){
        return ['$state', UserService.name];
    }

}


export default ViewUserSettingsComponent;