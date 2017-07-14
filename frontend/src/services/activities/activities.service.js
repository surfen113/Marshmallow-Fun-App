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
        console.log("list");
        let url = this.API_URL + '/activity/activityGetAll';
        return this.$http.get(url).then(responce => {
                console.log(JSON.stringify(responce.data));
                return new Promise((resolve, reject) => {
                    resolve(responce.data);

    });

    });

    }



    /*
    get(id) {
        let url = `${ this.resourceUrl }${ id }`;
        return this.$http.get(url).then(responce => {

                return new Promise((resolve, reject) => {
                    resolve(responce.data);
    });

    })
    }

    */

    create(activity) {
        console.log("post Activity activity service");

        let url = this.API_URL + '/activity/activityAdd';
        return this.$http.post(url, activity).then(response => {
                return new Promise((resolve, reject) => {
                    resolve(responce.data);
            });
        });




    }

    /*
    delete(id) {
        let url = `${ this.resourceUrl }${ id }`;
        return this.$http.delete(url).then(responce => {

                return new Promise((resolve, reject) => {
                    resolve(responce.status);
    });

    })
    }
    */
    /*
    update(activity) {

        let url = `${ this.resourceUrl }${ activity['_id'] }`;
        return this.$http.put(url,movie).then(responce => {

                return new Promise((resolve, reject) => {
                    resolve(responce.data);
    });

    })
    }
    */

}