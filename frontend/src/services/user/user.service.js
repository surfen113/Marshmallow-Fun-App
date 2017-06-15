'use strict';


export default class UserService {

    static get $inject(){
        return ['$http', '$window','API_URL'];
    }

    constructor($http,$window,API_URL) {
        this.$http = $http;
        this.$window = $window;
        this.API_URL = API_URL;

    }

    static get name(){
        return 'UserService';
    }

    register(firstname, lastname, email, password, birthday, address, mobile, aboutme, sports,social, music, culture, party) {
        return this.$http.post(`${ this.API_URL }/user/signup`, {
            username: email,
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            birthday: birthday,
            address: address,
            mobile: mobile,
            aboutme: aboutme,
            sports: sports,
            social: social,
            music: music,
            cutlure: culture,
            party: party
            //image: image
        });
    }

    //made by fuad
    updateUserSettings(settings) {
        return this.$http.put(`${ this.API_URL }/user/test`, settings);
    }

    getUserSettings() {
        // mock data
        // console.log("getUserSettings!!!");
        // let user = {
        //     username : "xxFranzxx",
        //     password : "password",
        //     firstname : "Franz",
        //     lastname : "Josef",
        //     email : "franz.josef@gmx.de",
        //     birthday : "24.2.1992",
        //     address : "Franz-Josef Straße 34",
        //     mobile : "01234 987654",
        //     aboutme : "I bin da Franz",
        //     sports : true,
        //     social : true,
        //     music : false,
        //     culture : false,
        //     party : false
        // };
        //
        // return user;

        return this.$http.get(`${ this.API_URL }/user/test`, {
            username : "abc"
        }).then(responce => {
            console.log("data: " + responce.data);
            return new Promise((resolve, reject) => {
                resolve(responce.data);
            });

        })
    }


    login(user, pass) {
        return this.$http.post(`${ this.API_URL }/user/login`, {
            username: user,
            password: pass
        });
    }

    logout(){
        this.$window.localStorage.removeItem('jwtToken');
    }

    getCurrentUser() {
        let token = this.$window.localStorage['jwtToken'];
        if (!token) return {};

        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace('-', '+').replace('_', '/');

        return JSON.parse(this.$window.atob(base64)).user;
    }

    getCurrentUserInformation(){
        let token = this.$window.localStorage['jwtToken'];
        if (!token) return {};

        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace('-', '+').replace('_', '/');


        return JSON.parse(this.$window.atob(base64)).firstname;
    }

    isAuthenticated() {
        return !!this.$window.localStorage['jwtToken'];
        // return true;
    }

}