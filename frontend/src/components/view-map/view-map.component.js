/**
 * Created by jrit on 09.06.2017.
 */

//Noch in Arbeit!!!! Nur schonmal für die Struktur angelegt, funktioniell noch kein Mehrwert

import template from './view-map.template.html';
import UserService from './../../services/user/user.service';
import './view-map.style.css';
import NgMap from 'ngmap';

class ViewMapComponent {
    constructor() {

        this.template = template;
        this.controller= ViewMapController;

    }


    static get name() {
        return 'viewMap';
    }
}

class ViewMapController {
    constructor($state,NgMap,UserService){
        this.$state = $state;
        this.NgMap = NgMap;
        this.UserService = UserService;

        this.markerPoints = [
            { "name": "Canberra", "latitude": 48.261, "longitude": 11.669 },
            { "name": "Melbourne", "latitude": 48.262, "longitude": 11.669  },
            { "name": "Sydney", "latitude": 48.263, "longitude": 11.669  }
        ];

        NgMap.getMap().then(function(map) {
            //map.markers.set()

            //map.markers.add
            console.log(map.getCenter());
            console.log('markers', map.markers);
            console.log('shapes', map.shapes);
        });

    }

    isAuthenticated(){
        return this.UserService.isAuthenticated();
    }

    static get $inject() {
        return ['$state', 'NgMap', UserService.name]
    }
}

export default ViewMapComponent;

