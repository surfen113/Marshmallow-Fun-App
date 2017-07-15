/**
 * Created by jrit on 09.06.2017.
 */


import template from './view-map.template.html';
import UserService from './../../services/user/user.service';
import ActivitiesService from './../../services/activities/activities.service';
import FollowsService from './../../services/follows/follows.service';
import JoinsService from './../../services/joins/joins.service';
import './view-map.style.css';
import NgMap from 'ngmap';

class ViewMapComponent {
    constructor() {
        this.template = template;
        this.controller = ViewMapController;
        this.bindings = {
            activities: '<',
        }


    }

    static get name() {
        return 'viewMap';
    }
}

class ViewMapController {
    constructor($state, $scope, NgMap, ActivitiesService, UserService, FollowsService, JoinsService) {
        var vm = this;
        this.activity = {};
        this.$state = $state;
        this.$scope = $scope;
        this.NgMap = NgMap;
        this.UserService = UserService;
        this.ActivitiesService = ActivitiesService;
        this.activities =        this.ActivitiesService.list();
        this.FollowsService = FollowsService;
        this.JoinsService = JoinsService;

        let newLatitude = 35;
        var newLongitude = null;

        this.ActivitiesService.list().then(data => {
        //    console.log(data);
        //console.log(JSON.stringify(data));
        this.settings = data;
    });



        NgMap.getMap().then(function (map) {
            vm.map = map;

            map.addListener('click', function(e) {
                newLatitude = e.latLng.lat();
                newLongitude = e.latLng.lng();
                if(UserService.isAuthenticated()) {
                    var marker = new google.maps.Marker({
                        position: e.latLng,
                        map: map,
                        icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
                    })
                    vm.map.showInfoWindow('newActivity', marker);
                }
            });

        });


        this.getLatitude = function() {
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


    $onInit() {
        this.model = JSON.parse(JSON.stringify(this.activities));
    }


    static get $inject() {
        return ['$state','$scope', 'NgMap', ActivitiesService.name, UserService.name, FollowsService.name, JoinsService.name];
    }


    save() {

        var latitude = this.getLatitude();
        var longitude = this.getLongitude();
        let user = this.UserService.getCurrentUser();
        this.activity['user'] = user['_id'];
        this.activity['latitude'] = latitude;
        this.activity['longitude'] = longitude;
        var date = this.activity['datetime'];

        if(date == null){
            this.activity['date'] = "";
        }else{
            date = date.toLocaleString();
            date = date.substring(0,10);
            this.activity['date'] = date;
        }

        //this.activity['date'] = new Date(date);
        console.log(this.activity['date']);

//        data.birthday = new Date(data.birthday);
        this.ActivitiesService.create(this.activity).then(data => {
            let _id = data[_id];
        this.$state.go('myActivities',{activityId:_id});
    });

    }


    cancel(){
        this.$state.reload();
    }

    isAuthenticated(){
        return this.UserService.isAuthenticated();
    }

    isOwnActivity(userID) {
        let user = this.UserService.getCurrentUser();
        if(userID == user['_id']) {
            return true;
        }
        else {
            return false;
        }
    }

    follow() {
        if (this.UserService.isAuthenticated()) {
        //let follower = this.UserService.getCurrentUser();

           this.FollowsService.create(this.marker.user, this.UserService.getCurrentUser()['_id']).then(data =>{
                this.$state.go('userProfile', { userId:this.marker.user });
            });
        } else {
            this.$state.go('login',{});
        }
    }

    join(id) {
        let user = this.UserService.getCurrentUser();



        if (this.UserService.isAuthenticated()) {
            //let follower = this.UserService.getCurrentUser();
            this.JoinsService.create( this.UserService.getCurrentUser()['_id'], id);
        } else {
            this.$state.go('login',{});
        }

    }

    unjoin(id){

    }

    details(activity) {
        let _id = activity['_id'];
        this.$state.go('activity', {activityId:_id});
    }

}

export default ViewMapComponent;

