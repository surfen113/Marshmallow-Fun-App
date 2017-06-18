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
            { "name": "Sydney", "latitude": 48.263, "longitude": 11.669  },
            { "name": "Another Activity", "latitude": 47.263, "longitude": 10.669  },
            { "name": "Rowing", "latitude": 48.2761, "longitude": 11.669  },
            { "name": "Swimming", "latitude": 48.263, "longitude": 11.639  },
            { "name": "Biking", "latitude": 48.263, "longitude": 11.645  },
            { "name": "Visiting Munich", "latitude": 48.161, "longitude": 11.669  },
            { "name": "Chilling", "latitude": 48.2761, "longitude": 11.699  },
            { "name": "Studying Maths", "latitude": 48.261, "longitude": 11.799  },
            { "name": "Baseball", "latitude": 45.263, "longitude": 15.669  },
            { "name": "Soccer", "latitude": 51.263, "longitude": 12.669  },
            { "name": "Start Wars", "latitude": 53.263, "longitude": -57.669  }
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

