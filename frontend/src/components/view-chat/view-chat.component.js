
'use strict';

import ChatService from './../../services/chat/chat.service';
import UserService from './../../services/user/user.service';
import template from './view-chat.template.html';
import './view-chat.style.css';

import io from 'socket.io-client';

export const socket = io.connect('http://localhost:3000');

// socket.on('refresh messages', (message) => {
//     console.log("refresh message " + JSON.stringify(message));
//     ViewChatComponentController.appendToChat(message);
// });


class ViewChatComponent {
    constructor(){
        this.controller = ViewChatComponentController;
        this.template = template;

    }

    static get name() {
        return 'chat';
    }


}

/*

this.conversation._id = conversationId of currently displayed chat messages



 */
class ViewChatComponentController {

    constructor($state, $scope,ChatService, UserService){
        this.$state = $state;
        this.ChatService = ChatService;
        this.UserService = UserService;
        this.$scope = $scope;
    }

    $onInit() {
        console.log("Params: " + JSON.stringify(this.$state.params));
        // check for null or undefined
        if(this.$state.params.recipientId == null) {
            console.log("no recipient");
        } else {
            console.log("Recipient : " + this.$state.params.recipientId);
            this.newConversation(this.$state.params.recipientId);
        }
        this.loadConversations();
        this.conversation = {};
        // this.conversation.messages = [];

        socket.on('refresh messages', (message) => {
        console.log("refresh message " + JSON.stringify(message));
        this.appendToChat(message);
        });

    }


    // load Conversations into this.conversations as list
    loadConversations(){
        console.log("loadConversations");
        let user = this.UserService.getCurrentUser();
        console.log("user: " + user + " , " + user._id);
        this.ChatService.getConversations(user).then( response => {
            // console.log("getConversationsResponse: " + JSON.stringify(response));
            console.log("loadConversations " + JSON.stringify(response.conversations[0]));
            console.log("loadConversations " + JSON.stringify(response.conversations[0][0]));
            this.conversations = response.conversations;
            console.log("loadConversations " + JSON.stringify(this.conversations[0][0].conversationId));

        });
    }

    newConversation(recipient){
        console.log("newConversation");
        let user = this.UserService.getCurrentUser();
        // let recipient = { _id : "594852057977cd99c090321c"};
        console.log(JSON.stringify(user));
        console.log(JSON.stringify(recipient));
        this.ChatService.newConversation(user,recipient).then( response => {
            console.log("newConversationResponse: " + JSON.stringify(response));
        });
    }

    loadConversation(conversationId) {
        if (this.conversation._id != null) {

        // leave socket conversation
        socket.emit('leave conversation', this.conversation._id);
        }

        var self = this;
        // conversationID : 596936503a124226d03f49df
        this.ChatService.getConversation(conversationId).then( response => {
            console.log("response = " + JSON.stringify(response));
            // reverse array of chat messages so you have right timeline in ui
            this.conversation.messages = response;
            self.messages = response.conversation.reverse();
        });

        this.conversation._id = conversationId;

        console.log("conversationId: " + JSON.stringify(this.conversation._id));



        socket.emit('enter conversation', this.conversation._id);


        console.log("messages: " + this.messages);
    }

    sendMsg() {
        console.log("sendMsg");
        console.log("ConversationID: " + this.conversation._id + " , msg: " + this.msg);

        var conversation = {};
        conversation._id = this.conversation._id;
        conversation.messages = this.msg;

        this.ChatService.sendReply(this.conversation._id, this.msg).then( response => {
            console.log("getConversationResponse: " + JSON.stringify(response));
            socket.emit('new message', response );
        });
    }

    appendToChat(message) {
        console.log("Message pre: " + this.messages);
        // if(this.messages)
        var messages = this.messages;
        messages.push(message);
        this.message = messages;
        console.log("Message after: " + this.messages);
        this.$scope.$apply();
    }




    static get $inject(){
        return ['$state', '$scope', ChatService.name, UserService.name];
    }

}


export default  ViewChatComponent;