/**
 * Created by jrit on 09.06.2017.
 */


import template from './view-map.template.html';
import UserService from './../../services/user/user.service';
import ActivitiesService from './../../services/activities/activities.service';
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
    constructor($state, NgMap, ActivitiesService, UserService) {
        var vm = this;
        this.activity = {};
        this.$state = $state;
        this.NgMap = NgMap;
        this.UserService = UserService;
        this.ActivitiesService = ActivitiesService;
        var newLatitude = null;
        var newLongitude = null;
        var test = "cool";

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
        vm.marker = this.markerPoints[0];

        NgMap.getMap().then(function (map) {
            vm.map = map;

            map.addListener('click', function(e) {
                //@TODO: Window öffnen mit Details und im Backend speichern
                newLatitude = e.latLng.lat();
                newLongitude = e.latLng.lng();
                if(UserService.isAuthenticated()) {
                    console.log("new Latitude onClick: " + newLatitude);
                    var marker = new google.maps.Marker({
                        position: e.latLng,
                        map: map,
                        icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
                    })
                    vm.map.showInfoWindow('newActivity', marker);
                }
            });

        });



        this.showStore = function (e, marker2) {
            vm.marker = marker2;
            if(UserService.isAuthenticated()) {
                vm.map.showInfoWindow('normalActivity', vm.marker.id);
            }
        }

        this.goToDetails = function () {
            alert("go to Details");
        };


    }

    static get $inject() {
        return ['$state', 'NgMap', ActivitiesService.name, UserService.name];
    }

    setVariables() {
        console.log("setVariables()");
    }

    save() {
        //@TODO: ins Backend schreiben
        let activityName = this.map.activityName;
        let datetime = this.map.datetime;
        let latitude = this.map.latitude;
        let longitude = this.map.longitude;
        let details = this.map.details;
        let username = this.map.username;
        let sports = this.map.sports;
        let social = this.map.social;
        let music = this.map.music;
        let culture = this.map.culture;
        let party = this.map.party;
        console.log("Latitude: " + latitude + " Longitude: " + "" + " Name: " + activityName + " Details: " + details + " User: " + " " + " Sports: " + sports);

        //@TODO: Hier Service aufrufen @Armin
        let user = this.UserService.getCurrentUser();
        this.activity['user'] = user['_id'];
        this.ActivitiesService.create(this.activity).then(data => {
            let _id = data[_id];
        this.$state.go('myActivities',{activityId:_id});
    });

        //this.$state.go('myActivities',{});
    }

    cancel(){
        this.$state.reload();
    }

    isAuthenticated(){
        return this.UserService.isAuthenticated();
    }

    isOwnActicity() {
        console.log("UserID: " + user['_id']);
    }

}

export default ViewMapComponent;

