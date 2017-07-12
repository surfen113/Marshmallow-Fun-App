/**
 * Created by jrit on 09.06.2017.
 */


import template from './view-map.template.html';
import UserService from './../../services/user/user.service';
import './view-map.style.css';
import NgMap from 'ngmap';

class ViewMapComponent {
    constructor() {

        this.template = template;
        this.controller = ViewMapController;
    }


    static get name() {
        return 'viewMap';
    }
}

class ViewMapController {
    constructor($state, NgMap, UserService) {
        var vm = this;
        vm.positions = [{lat:37.7699298,lng:-122.4469157}];
        this.$state = $state;
        this.NgMap = NgMap;
        this.UserService = UserService;

        this.markerPoints = [
            {id: "4", "name": "Another Activity", "latitude": 47.263, "longitude": 10.669},
            {id: "5", "name": "Rowing", "latitude": 48.2761, "longitude": 11.669},
            {id: "6", "name": "Swimming", "latitude": 48.263, "longitude": 11.639},
            {id: "7", "name": "Biking", "latitude": 48.263, "longitude": 11.645},
            {id: "8", "name": "Visiting Munich", "latitude": 48.161, "longitude": 11.669},
            {id: "9", "name": "Chilling", "latitude": 48.2761, "longitude": 11.699},
            {id: "10", "name": "Studying Maths", "latitude": 48.261, "longitude": 11.799},
            {id: "11", "name": "Baseball", "latitude": 45.263, "longitude": 15.669},
            {id: "12", "name": "Soccer", "latitude": 51.263, "longitude": 12.669},
            {id: "13", "name": "Start Wars", "latitude": 53.263, "longitude": -57.669}
        ];
        vm.marker = this.markerPoints[3];

        NgMap.getMap().then(function (map) {
            vm.map = map;
            console.log(map);


            map.addListener('click', function(e) {
                alert("yay");
                //map.positions.push({lat:48.2762, lng: 11.669});
                //@TODO: Window öffnen mit Details und im Backend speichern
                vm.map.showInfoWindow('bar', "");
                var marker = new google.maps.Marker({
                    position: e.latLng,
                    map: map,
                    icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
                })
            });

            //console.log(map.getCenter());
            //console.log('markers', map.markers);
            //console.log('shapes', map.shapes);
        });



        this.showStore = function (e, marker2) {
            vm.marker = marker2;
            vm.map.showInfoWindow('bar', vm.marker.id);
        }

        this.goToDetails = function () {
            alert("go to Details");
        }

        this.addNewActivity = function () {
            console.log(this.markerPoints.length);
            alert ("addNewActivity");
            this.markerPoints.push({ id: "14", "name": "Rowing 2", "latitude": 48.2762, "longitude": 11.669});
            console.log(this.markerPoints.length);

            let marker = new vm.maps.Marker({
                map: this.map,
                animation: google.maps.Animation.DROP,
                position: this.map.getCenter(),
                draggable: true,
                icon:iconImage,
                title: "Drag me"
            });

        }


    }

    isAuthenticated() {
        return this.UserService.isAuthenticated();
    }

    static get $inject() {
        return ['$state', 'NgMap', UserService.name]
    }
}

export default ViewMapComponent;

