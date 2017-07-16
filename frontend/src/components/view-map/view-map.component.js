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
        this.activities = this.ActivitiesService.list();
        this.FollowsService = FollowsService;
        this.follows = this.FollowsService.list();
        this.JoinsService = JoinsService;


        let newLatitude = 35;
        var newLongitude = null;

        this.FollowsService.list().then(data => {
            this.followList = data;
    });


        this.ActivitiesService.list().then(data => {

            //    console.log(data);
            //console.log(JSON.stringify(data));
            this.settings = data;
        });

        this.JoinsService.list().then(data => {
            this.joinsList = data;
    });

        var filters = {social: false, sports: false, party: false, music: false, culture: false}
        var map_filter = function (id) {
            if (filters[id]) {
                filters[id] = false;
            }
            else {
                filters[id] = true;
            }
           return filters["social"] || filters["music"] || filters["culture"] || filters["party"] || filters["sports"];
        }


        $(document).ready(function () {
            $('input[name=filter]').change(function (e) {
                var a = map_filter(this.id);
                if (a && !(filters["social"] && filters["music"] && filters["culture"] && filters["party"] && filters["sports"])) {
                    vm.activities = filter_markers(vm.activities);
                }else {
                    console.log("ana da5alt hena!!");
                    for (var i = 0; i < vm.activities.length; i++){
                        console.log("activity nr." + i + " : " + vm.activities[i].length);
                    }
                } vm.map.setZoom(10);
            });
            $('input[id=searchbar]').change(function (e) {
                var query = document.getElementById('searchbar').value;
                if(query) {
                    vm.activities = search_filter(query, vm.activities);

                }
                else {
                    vm.activities = filter_markers(vm.activities);


                }
                vm.map.setZoom(10);
            });
        });

        var search_filter = function (query, activities) {
            var tmp_markers = filter_markers(activities);
            for (var i=0; i < tmp_markers.length; i++) {
                //console.log(tmp_markers[i].title  + " beyban null ezaher; e7na fel i rakam " + i);
                if (tmp_markers[i] !== null && tmp_markers[i] !== null && tmp_markers[i].title.test(query) ){
                    tmp_markers.push(i);
                }
                if (tmp_markers[i].title !== null && !tmp_markers[i].title.test(query) ){
                   tmp_markers.splice(i,1);
                }
            }

            return tmp_markers;
        }


        var filter_markers = function (activities) {
            var markers = [];
            for (var i = 0; i < vm.activities.length; i++) {
                var acceptable = false;
                for (var opt in filters) {
                    console.log(opt + " -> " + filters[opt]);
                    switch (opt) {
                        case "sports":
                            if (filters[opt] && vm.activities[i].sports) {
                                acceptable = vm.activities[i].sports;
                                markers.push(vm.activities[i])
                            }
                            break;
                        case "culture":
                            if (filters[opt] && vm.activities[i].culture) {
                                acceptable = vm.activities[i].culture;
                                markers.push(vm.activities[i]);
                            }
                            break;
                        case "party":
                            if (filters[opt] && vm.activities[i].party) {
                                acceptable = vm.activities[i].party;
                                markers.push(vm.activities[i]);
                            }
                            break;
                        case "music":
                            if (filters[opt] && vm.activities[i].music) {
                                acceptable = vm.activities[i].music;
                                console.log("da5alna music");
                                markers.push(vm.activities[i]);
                            }
                            break;
                        case "social":
                            if (filters[opt] && vm.activities[i].social) {
                                acceptable = vm.activities[i].social;
                                markers.push(vm.activities[i]);
                            }
                            break;
                        default:

                    }
                    if (acceptable) {
                        break;
                    }
                }
            }
            for (var i = 0; i < markers.length; i++) {
                console.log(markers[i].title + " mawjuuud");
            }
            return markers;
        }

        NgMap.getMap().then(function (map) {
            vm.map = map;

            map.addListener('click', function (e) {
                newLatitude = e.latLng.lat();
                newLongitude = e.latLng.lng();
                if (UserService.isAuthenticated()) {
                    var marker = new google.maps.Marker({
                        position: e.latLng,
                        map: map,
                        icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
                    })
                    vm.map.showInfoWindow('newActivity', marker);
                }
            });

        });


        this.getLatitude = function () {
            return newLatitude;
        }

        this.getLongitude = function () {
            return newLongitude;
        }

        this.showStore = function (e, marker2) {
            vm.marker = marker2;
            if (UserService.isAuthenticated()) {
                vm.map.showInfoWindow('normalActivity', vm.marker._id);
            }
        }
    }


    $onInit() {
        this.model = JSON.parse(JSON.stringify(this.activities));
    }


    static get $inject() {
        return ['$state', '$scope', 'NgMap', ActivitiesService.name, UserService.name, FollowsService.name, JoinsService.name];
    }


    save() {

        var latitude = this.getLatitude();
        var longitude = this.getLongitude();
        let user = this.UserService.getCurrentUser();
        this.activity['user'] = user['_id'];
        this.activity['latitude'] = latitude;
        this.activity['longitude'] = longitude;
        var date = this.activity['datetime'];

        if (date == null) {
            this.activity['date'] = "";
        } else {
            date = date.toLocaleString();
            date = date.substring(0, 10);
            this.activity['date'] = date;
        }


        this.ActivitiesService.create(this.activity).then(data => {
            let _id = data[_id];
            this.$state.go('myActivities', {activityId: _id});
        });

    }


    cancel() {
        this.$state.reload();
    }

    isAuthenticated() {
        return this.UserService.isAuthenticated();
    }

    isOwnActivity(userID) {
        let user = this.UserService.getCurrentUser();
        if (userID == user['_id']) {
            return true;
        }
        else {
            return false;
        }
    }

    isOwnActivityOrAlreadyFollows(userID) {
        let currentUser = this.UserService.getCurrentUser();
        var currentUserId = currentUser['_id'];

        if(userID == currentUserId) {
            return true;
        }

        for(var i = 0; i<this.followList.length; i++) {
            var followEntry = this.followList[i];
            var id = followEntry['followed'];
            if(id==userID) {
                if(currentUserId == followEntry['follower']) {
                    return true;
                }
            }
        }
        return false;
    }

    isOwnActivityOrAlreadyJoined(userID, activityID) {
        let currentUser = this.UserService.getCurrentUser();
        var currentUserId = currentUser['_id'];

        if(userID == currentUserId) {
            return true;
        }

        for(var i = 0; i<this.joinsList.length; i++) {
            var entry = this.joinsList[i];
            var id = entry['activityID'];
            if(id==activityID) {
                if(currentUserId == entry['userID']) {
                    return true;
                }
            }
        }
        return false;
    }



    follow() {
        if (this.UserService.isAuthenticated()) {



            this.UserService.getUserSettings(this.marker.user).then(data => {
                let followerID = this.UserService.getCurrentUser()['_id'];
            let followerUsername = this.UserService.getCurrentUser()['username'];
            let followedID = this.marker.user;
            let followedUsername = data['username'];

            this.FollowsService.create(followerID, followerUsername, followedID, followedUsername).then(data =>{
                this.$state.go('userProfile', { userId:this.marker.user });
        });
        });




        } else {
            this.$state.go('login',{});
        }
    }

    join(id, activityTile) {
        let user = this.UserService.getCurrentUser();

        if (this.UserService.isAuthenticated()) {
            this.JoinsService.create( user['_id'], user['username'], id, activityTile);
            this.$state.go('myActivities', {reload: true });
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

