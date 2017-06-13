
'use strict';

import UserService from './../../services/user/user.service';

import template from './view-register.template.html';
import './view-register.style.css';

class ViewRegisterComponent {
    constructor(){
        this.controller = ViewRegisterComponentController;
        this.template = template;

    }

    static get name() {
        return 'register';
    }


}

class ViewRegisterComponentController{
    constructor($state,UserService){
        this.$state = $state;
        this.UserService = UserService;
    }

    submit(){
        let firstname = this.register.firstname;
        let lastname = this.register.lastname;
        let email = this.register.email;
        let password = this.register.password;
        let birthday = this.register.birthday;
        let address = this.register.address;
        let aboutme = this.register.aboutme;
        let mobile = this.register.mobile;


        this.UserService.register(firstname, lastname, email, password, birthday, address, mobile, aboutme).then(()=> {
            this.$state.go('activityMap',{});
        });

//        this.UserService.login(user,password).then(()=> {
//            this.$state.go('activityMap',{});
//    });
    }
    cancel(){
        this.$state.go('login', {});
    }

    static get $inject(){
        return ['$state', UserService.name];
    }

}

/*angular.module('myApp.directives', [])
    .directive('pwCheck', [function () {
        return {
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                var firstpassword = '#' + attrs.pwCheck;
                elem.add(firstPassword).on('keyup', function () {
                    scope.$apply(function () {
                        var v = elem.val()===$(firstPassword).val();
                        ctrl.$setValidity('pwmatch', v);
                    });
                });
            }
        }
    }]);
*/

export default  ViewRegisterComponent;