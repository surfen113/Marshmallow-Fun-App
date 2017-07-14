
'use strict';

import ChatService from './../../services/chat/chat.service';
import UserService from './../../services/user/user.service';
import template from './view-chat.template.html';


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

    loadConversations(){
        console.log("loadConversations");
        let user = this.UserService.getCurrentUser();
        console.log("user: " + user + " , " + user._id);
        this.ChatService.getConversations(user).then( response => {
            console.log("getConversationsResponse: " + JSON.stringify(response));
            // response = {"conversation":[]}
            this.conversations = response;
            console.log(this.conversations.conversation);
            console.log(this.conversations);
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
        console.log(this.conversationId);
        this.ChatService.getConversation(this.conversationId).then( response => {
            console.log("getConversationResponse: " + JSON.stringify(response));
        });
    }




    static get $inject(){
        return ['$state', ChatService.name, UserService.name];
    }

}


export default  ViewChatComponent;