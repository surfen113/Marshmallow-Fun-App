import angular from 'angular';

import ViewActivityEditComponent from './view-activity-edit.component';


export default angular.module('ViewActivityEdit', [])
    .component(ViewActivityEditComponent.name, new ViewActivityEditComponent);
