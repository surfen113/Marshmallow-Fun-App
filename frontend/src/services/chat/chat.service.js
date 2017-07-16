'use strict';


export default class ChatService {

    static get $inject(){
        return ['$http', 'API_URL'];
    }

    constructor($http,API_URL) {
        this.$http = $http;
        this.resourceUrl = `${ API_URL }/chat/`;

    }

    static get name(){
        return 'moviesService';
    }

    getConversations(user) {
        console.log("getConversations");
        let url = `${ this.resourceUrl }${ user['_id'] }`;

        console.log("url: " + url);

        return this.$http.get(url).then(response => {

            return new Promise((resolve, reject) => {
                resolve(response.data);
            });
        });
    }

    getConversation(conversation_id) {
        console.log("getConversation");
        let url = `${ this.resourceUrl+"/conversation/" }${ conversation_id }`;

        return this.$http.get(url).then(response => {

            return new Promise((resolve, reject) => {
                resolve(response.data);
            });
        });
    }

    sendReply(conversation_id, msg) {
        console.log("sendReply");
        let url = `${ this.resourceUrl+"conversation/" }${ conversation_id }`;

        return this.$http.post(url, {composedMessage : msg}).then(response => {

            return new Promise((resolve, reject) => {
                resolve(response.data);
            });
        });
    }

    newConversation(user, recipient) {
        let url = `${ this.resourceUrl+"/new/" }${ user['_id']}${ "/" + recipient['_id']}`;

        return this.$http.post(url, {composedMessage : "Start of Conversation" }).then(response => {

            return new Promise((resolve, reject) => {
                resolve(response.data);
            });
        });
    }


}