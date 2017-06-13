/**
 * Created by samy on 11.06.17.
 */
'use strict';

import angular from 'angular';

import ViewMoviesComponent from './view-user-settings.component';


export default angular.module('ViewUserSettings', [])
    .component(ViewUserSettingsComponent.name, new ViewUserSettingsComponent);