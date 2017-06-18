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
        var vm = this;
        this.$state = $state;
        this.NgMap = NgMap;
        this.UserService = UserService;

        this.markerPoints = [
            {id:"1", "name": "Canberra", "latitude": 48.261, "longitude": 11.669 },
            {id:"2", "name": "Melbourne", "latitude": 48.262, "longitude": 11.669  },
            {id:"3", "name": "Sydney", "latitude": 48.263, "longitude": 11.669  },
            {id:"4", "name": "Another Activity", "latitude": 47.263, "longitude": 10.669  },
            {id:"5", "name": "Rowing", "latitude": 48.2761, "longitude": 11.669  },
            {id:"6", "name": "Swimming", "latitude": 48.263, "longitude": 11.639  },
            {id:"7", "name": "Biking", "latitude": 48.263, "longitude": 11.645  },
            {id:"8", "name": "Visiting Munich", "latitude": 48.161, "longitude": 11.669  },
            {id:"9", "name": "Chilling", "latitude": 48.2761, "longitude": 11.699  },
            {id:"10", "name": "Studying Maths", "latitude": 48.261, "longitude": 11.799  },
            {id:"11", "name": "Baseball", "latitude": 45.263, "longitude": 15.669  },
            {id:"12", "name": "Soccer", "latitude": 51.263, "longitude": 12.669  },
            {id:"13", "name": "Start Wars", "latitude": 53.263, "longitude": -57.669  }
        ];
        vm.marker = this.markerPoints[3];

        NgMap.getMap().then(function(map) {
            //map.markers.set()
            vm.map = map;

            //map.markers.add
            console.log(map.getCenter());
            console.log('markers', map.markers);
            console.log('shapes', map.shapes);
        });

        this.showStore = function(e, marker2) {
console.log(marker2);
            console.log(marker2.id);

vm.marker = marker2;
console.log(vm.marker);
           // vm.store = this.markerPoints[1];
            console.log("id: " + vm.marker.id);
            vm.map.showInfoWindow('bar', vm.marker.id);
        };



    }

    isAuthenticated(){
        return this.UserService.isAuthenticated();
    }

    static get $inject() {
        return ['$state', 'NgMap', UserService.name]
    }
}

export default ViewMapComponent;

