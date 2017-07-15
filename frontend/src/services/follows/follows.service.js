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



    create(follower, followerUsername, followed, followedUsername) {
        let url = this.API_URL + '/follow/followAdd';


        return this.$http.post(url, {follower:follower, followerUsername:followerUsername,
                followed:followed, followedUsername:followedUsername}).then(response => {
            return new Promise((resolve, reject) => {
                resolve(response.data);
            });
        });
    }


    delete(id) {
        console.log("follows.service");
        let url = this.API_URL + '/follow/delete/' + id ;
        return this.$http.delete(url).then(responce => {
            return new Promise((resolve, reject) => {
                resolve(responce.status);
            });

        });
    }

}
