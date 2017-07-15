
'use strict';

import template from './view-activity-edit.template.html';

import MoviesService from './../../services/movies/movies.service';
import ActivitiesService from './../../services/activities/activities.service';

class ViewActivityEditComponent {
    constructor(){
        this.controller = ViewActivityEditComponentController;
        this.template = template;
        this.bindings = {
            activity: '<',
        }
    }

    static get name() {
        return 'viewActivityEdit';
    }
}

class ViewActivityEditComponentController{
    constructor($state, ActivitiesService){
        this.model = {};
        this.$state = $state;
        this.ActivitiesService = ActivitiesService;
    }

    $onInit() {
        this.model = JSON.parse(JSON.stringify(this.activity))
    }

    cancel() {
        this.model = JSON.parse(JSON.stringify(this.activity));
        this.$state.go('activities',{});
    };

    save() {
        let _id = this.activity['_id'];
        this.ActivitiesService.update(this.activity).then(data => {
            this.activity = JSON.parse(JSON.stringify(data));

        this.$state.go('activity',{ activityId:_id});
    });

    };

    delete() {
        let _id = this.activity['_id'];

        this.ActivitiesService.delete(_id).then(response => {
            this.$state.go('activities',{});
    });
    };

    static get $inject(){
        return ['$state', ActivitiesService.name];
    }

}


export default ViewActivityEditComponent;