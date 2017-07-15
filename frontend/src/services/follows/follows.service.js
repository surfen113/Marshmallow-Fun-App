'use strict';


export default class FollowsService {

    static get $inject(){
        return ['$http','$window', 'API_URL'];
    }

    constructor($http, $window, API_URL) {
        this.$http = $http;
        this.$window = $window;
        this.API_URL = API_URL;

    }

    static get name(){
        return 'followsService';
    }


    list() {

        let url = this.API_URL + '/follow/followGetAll';
        return this.$http.get(url).then(responce => {

            return new Promise((resolve, reject) => {
                resolve(responce.data);
            });
        });
    }



    create(followed, follower) {
        console.log("hier passiert was");
        console.log(followed);
        console.log(follower);
        let url = this.API_URL + '/follow/followAdd';

        console.log(url);
        return this.$http.post(url, {follower:follower, followed:followed}).then(response => {
            return new Promise((resolve, reject) => {
                resolve(response.data);
            });
        });
    }


    delete(id) {
        let url = this.API_URL + '/follow/' + id ;
        return this.$http.delete(url).then(responce => {
            return new Promise((resolve, reject) => {
                resolve(responce.status);
            });

        });
    }

}
