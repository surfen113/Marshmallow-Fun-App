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

        let url = `${ this.API_URL+"/user/" }${ settings._id }`;
        return this.$http.put(url, settings).then(responce => {
            return new Promise((resolve, reject) => {
                resolve(responce.data);
            });

        })
    }

    getUserSettings(_id) {

        let url = `${ this.API_URL+"/user/" }${ _id }`;
        console.log("url: " + url);
        return this.$http.get(url, {
            username : "abc"
        }).then(responce => {
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
        console.log(!!this.$window.localStorage['jwtToken']);
        return !!this.$window.localStorage['jwtToken'];
        // return true;
    }

}