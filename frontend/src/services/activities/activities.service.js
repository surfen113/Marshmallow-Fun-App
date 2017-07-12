'use strict';


export default class ActivitiesService {

    static get $inject(){
        return ['$http', 'API_URL'];
    }

    constructor($http,API_URL) {
        this.$http = $http;
        this.resourceUrl = `${ API_URL }/activities/`;

    }

    static get name(){
        return 'activitiesService';
    }

    list() {

        let url = this.resourceUrl;
        return this.$http.get(url).then(responce => {

                return new Promise((resolve, reject) => {
                    resolve(responce.data);

    });

    });

    }

    get(id) {
        let url = `${ this.resourceUrl }${ id }`;
        return this.$http.get(url).then(responce => {

                return new Promise((resolve, reject) => {
                    resolve(responce.data);
    });

    })
    }


    create(activity) {
        let url = this.resourceUrl;
        return this.$http.post(url,activity).then(responce => {

                return new Promise((resolve, reject) => {
                    resolve(responce.data);
    });

    })
    }

    delete(id) {
        let url = `${ this.resourceUrl }${ id }`;
        return this.$http.delete(url).then(responce => {

                return new Promise((resolve, reject) => {
                    resolve(responce.status);
    });

    })
    }

    update(activity) {

        let url = `${ this.resourceUrl }${ activity['_id'] }`;
        return this.$http.put(url,movie).then(responce => {

                return new Promise((resolve, reject) => {
                    resolve(responce.data);
    });

    })
    }


}