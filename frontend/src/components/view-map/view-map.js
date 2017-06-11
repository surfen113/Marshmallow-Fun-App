/**
 * Created by jrit on 09.06.2017.
 */

'use strict';
import angular from 'angular';

import ViewMapComponent from './view-map.component';

export default angular.module('ViewMap', [])
    .component(ViewMapComponent.name, new ViewMapComponent);