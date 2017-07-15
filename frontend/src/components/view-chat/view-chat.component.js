
'use strict';

import ChatService from './../../services/chat/chat.service';
import UserService from './../../services/user/user.service';
import template from './view-chat.template.html';

import io from 'socket.io-client';
export const socket = io.connect('http://localhost:3000');

socket.on('refresh messages', (message) => {
    console.log("refresh message " + JSON.stringify(message));
});


class ViewChatComponent {
    constructor(){
        this.controller = ViewChatComponentController;
        this.template = template;

    }

    static get name() {
        return 'chat';
    }


}

class ViewChatComponentController {
    constructor($state,ChatService, UserService){
        this.$state = $state;
        this.ChatService = ChatService;
        this.UserService = UserService;
    }

    $onInit() {
        // console.log("Sending socket msg");
        // socket.emit("testmsg");
    }

    loadConversations(){
        console.log("loadConversations");
        let user = this.UserService.getCurrentUser();
        console.log("user: " + user + " , " + user._id);
        this.ChatService.getConversations(user).then( response => {
            console.log("getConversationsResponse: " + JSON.stringify(response));
        });
    }

    newConversation(){
        console.log("newConversation");
        let user = this.UserService.getCurrentUser();
        let recipient = { _id : "594852057977cd99c090321c"};
        console.log(JSON.stringify(user));
        console.log(JSON.stringify(recipient));
        this.ChatService.newConversation(user,recipient).then( response => {
            console.log("getConversationsResponse: " + JSON.stringify(response));
        });
    }

    loadConversation() {
        // conversationID : 596936503a124226d03f49df
        this.ChatService.getConversation(this.conversation._id).then( response => {
            console.log("getConversationResponse: " + JSON.stringify(response));
            this.conversation = response;
        });

        console.log("conversationId: " + this.conversation._id);

        socket.emit('enter conversation', this.conversation._id);
    }

    sendMsg() {
        console.log("sendMsg");
        console.log("ConversationID: " + this.conversation._id + " , msg: " + this.msg);

        var conversation = {};
        conversation._id = this.conversation._id;
        conversation.message = this.msg;

        this.ChatService.sendReply(this.conversation._id, this.msg).then( response => {
            console.log("getConversationResponse: " + JSON.stringify(response));
            socket.emit('new message', response );
        });
    }




    static get $inject(){
        return ['$state', ChatService.name, UserService.name];
    }

}


export default  ViewChatComponent;