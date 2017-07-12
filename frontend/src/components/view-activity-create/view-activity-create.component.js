
'use strict';

import template from './view-activity-create.template.html';

import ActivitiesService from './../../services/activities/activities.service';
import UserService from './../../services/user/user.service';

class ViewActivityCreateComponent {
    constructor(){
        this.controller = ViewActivityCreateComponentController;
        this.template = template;
    }

    static get name() {
        return 'viewActivityCreate';
    }
}

class ViewActivityCreateComponentController{
    constructor($state, MoviesService,UserService){
        this.movie = {};
        this.$state = $state;
        this.MoviesService = MoviesService;
        this.UserService = UserService;
    }

    cancel() {
        this.$state.go('movies',{});
    };

    save() {
        let user = this.UserService.getCurrentUser();

        this.movie['user'] = user['_id'];
        this.MoviesService.create(this.movie).then(data => {
            let _id = data['_id'];
        this.$state.go('movie',{ movieId:_id});
    });

    };


    static get $inject(){
        return ['$state', MoviesService.name, UserService.name];
    }

}


export default ViewActivityCreateComponent;