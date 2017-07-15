'use strict';


export default class ActivitiesService {

    static get $inject(){
        return ['$http', '$window', 'API_URL'];
    }

    constructor($http, $window, API_URL) {
        this.$http = $http;
        this.$window = $window;
        this.API_URL = API_URL;//`${ API_URL }/activities/`;

    }

    static get name(){
        return 'activitiesService';
    }


    list() {
        let url = this.API_URL + '/activity/activityGetAll';
        return this.$http.get(url).then(responce => {

                return new Promise((resolve, reject) => {
                    resolve(responce.data);

    });

    });

    }




    get(id) {
        let url = this.API_URL + '/activity/' + id ;
        console.log("The ID is: " + id);
        return this.$http.get(url).then(responce => {
            return new Promise((resolve, reject) => {
                resolve(responce.data);
            });
        });
    }



    create(activity) {


        let url = this.API_URL + '/activity/activityAdd';
        return this.$http.post(url, activity).then(response => {
                return new Promise((resolve, reject) => {
                    resolve(response.data);
            });
        });




    }


    delete(id) {
        let url = this.API_URL + '/activity/' + id ;
        return this.$http.delete(url).then(responce => {

                return new Promise((resolve, reject) => {
                    resolve(responce.status);
                });

            });
    }


    update(activity) {
        let id = activity['_id'];
        let url =  this.API_URL + '/activity/' + id ;
        return this.$http.put(url,activity).then(responce => {

                return new Promise((resolve, reject) => {
                    resolve(responce.data);
    });

    });
    }


    join() {
        let id = activity['_id'];
        let url =  this.API_URL + '/activity/' + id ;
        return this.$http.put(url,activity).then(responce => {

                return new Promise((resolve, reject) => {
                    resolve(responce.data);
    });

    });
    }


}