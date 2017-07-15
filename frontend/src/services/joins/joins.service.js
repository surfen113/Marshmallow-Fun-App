'use strict';


export default class JoinsService {

    static get $inject(){
        return ['$http','$window', 'API_URL'];
    }

    constructor($http, $window, API_URL) {
        this.$http = $http;
        this.$window = $window;
        this.API_URL = API_URL;

    }

    static get name(){
        return 'joinsService';
    }


    list() {

        let url = this.API_URL + '/join/joinGetAll';
        return this.$http.get(url).then(responce => {

                return new Promise((resolve, reject) => {
                    resolve(responce.data);
    });
    });
    }



    create(userID, activityID) {
        let url = this.API_URL + '/join/joinAdd';

        return this.$http.post(url, {userID:userID, activityID:activityID}).then(response => {
                return new Promise((resolve, reject) => {
                    resolve(response.data);
    });
    });
    }


    delete(id) {
        let url = this.API_URL + '/join/delete/' + id ;
        return this.$http.delete(url).then(responce => {
                return new Promise((resolve, reject) => {
                    resolve(responce.status);
    });

    });
    }

}
