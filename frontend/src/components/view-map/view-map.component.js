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
        this.bindings = {
            activities: '<',
        }
        console.log(this.bindings.activities);

    }

    static get name() {
        return 'viewMap';
    }
}

class ViewMapController {
    constructor($state, $scope, NgMap, ActivitiesService, UserService/*, FollowsService*/) {
        var vm = this;
        this.activity = {};
        this.$state = $state;
        this.$scope = $scope;
        this.NgMap = NgMap;
        this.UserService = UserService;
        this.ActivitiesService = ActivitiesService;
        this.activities =        this.ActivitiesService.list();
        //this.FollowsService = FollowsService;


        console.log(this.activities.data);

        this.activity.longitude  = 7;
        let newLatitude = 35;
        var newLongitude = null;
        this.test = "cool";

        this.ActivitiesService.list().then(data => {
            console.log(data);
        console.log(JSON.stringify(data));
        this.settings = data;
    });



        /*
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
         */
        //vm.marker = this.markerPoints[0];
        //vm.marker = this.activities[0];
        // console.log(vm.marker);



        NgMap.getMap().then(function (map) {
            vm.map = map;

            map.addListener('click', function(e) {
                //@TODO: Window öffnen mit Details und im Backend speichern
                newLatitude = e.latLng.lat();
                testMethode(newLatitude);
                console.log(newLatitude);
                this.test = "geil";
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

        function testMethode(latitude) {
            console.log($scope.blub);
            console.log("hiiiiier: " + latitude);
            console.log("2." + newLatitude);
            //console.log(this.this.test);
            // test = "geilo";
        }

        this.getLatitude = function() {
            console.log("getLatitude");
            return newLatitude;
        }

        this.getLongitude = function() {
            return newLongitude;
        }



        this.showStore = function (e, marker2) {
            vm.marker = marker2;
            if(UserService.isAuthenticated()) {
                vm.map.showInfoWindow('normalActivity', vm.marker._id);
            }
        }




    }

    testMethode2(latitude) {
        console.log("hiiiiier: " + latitude);
        console.log("2." + newLatitude);
        //console.log(this.this.test);
        // test = "geilo";
    }

    $onInit() {
        //Clone the Movie Data
        this.model = JSON.parse(JSON.stringify(this.activities));
        console.log("onInit: " + this.model);
    }


    static get $inject() {
        return ['$state','$scope', 'NgMap', ActivitiesService.name /*,FollowsService.name*/, UserService.name];
    }


    save() {
        //console.log("test: " + this.newLatitude);
        //console.log(newLatitude);
        var latitude = this.getLatitude();
        var longitude = this.getLongitude();

        console.log(latitude);
        let user = this.UserService.getCurrentUser();
        console.log(this.activity);
        this.activity['user'] = user['_id'];
        this.activity['latitude'] = latitude;
        this.activity['longitude'] = longitude;
        this.ActivitiesService.create(this.activity).then(data => {
            console.log("this.Acticity: " + data );
        console.log(data);
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

    isOwnActivity(userID) {
        console.log("test: " + userID);
        let user = this.UserService.getCurrentUser();
        console.log(this.UserService.getCurrentUser());
        if(userID == user['_id']) {
            console.log("gleich");
            return true;
        }
        else {
            console.log("nicht gleich");
            return false;
        }
        //<!-- ng-if="!ctrl.isOwnActivity()"
    }

    follow() {
        console.log("hier passiert was");

        //let followed = this.activity.user;
        console.log(this.activity.user);
        //let follower = this.UserService.getCurrentUser();


        //this.FollowsService.create(followed, follower);
    }

}

export default ViewMapComponent;

