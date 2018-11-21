sap.ui.define(['sap/m/MessageToast','sap/ui/core/mvc/Controller','sap/ui/model/json/JSONModel']
, function (MessageToast,Controller,JSONModel) {
    "use strict";
    return Controller.extend("sap.ui.c4c.widget.chat.Agent", {
        onInit : function () {

            jQuery.sap.registerResourcePath("c4c", "javascripts/c4c");
            jQuery.sap.require("c4c.socket.SocketHelper");
            jQuery.sap.require("c4c.cti.integration");
            this._globalSocketConnection = this._getSocketConnectionId();
            this._socketConnectionId = "forChat" + this._globalSocketConnection;
            var sTokenData = "/?token=" +  this._socketConnectionId;
            this.socket = io(sTokenData);
            this._SAPIntegration = c4c.cti.integration.getInstance();

            this.socket.on(this._socketConnectionId,$.proxy(this.onNewSocketInformation,this));

            this.oChatData = { };
            this.oChatData.incomingChatInitiated = false;
            this.oChatData.incomingChatWaiting = true;
            this.oChatData.ChatHistory = [];


            this.oModel = new JSONModel(this.oChatData);
            this.oView.setModel(this.oModel);

            this.UserContext = {};
            this.UserContext.Name = "Agent";
            this.UserContext.PersonImg = "res/images/woman-support-headset.jpg";

            var uiStaticUrl = "CustomerChat.html?socketId=" + this._socketConnectionId;

            var uiSetting = { "ChatLink" : uiStaticUrl}
            var oStatickLink = new JSONModel(uiSetting);
            this.oView.setModel(oStatickLink,"staticLink");


        },

        mapIncomingDataToList:function(msg){

            this.oChatData.CustomerName = msg.Name;
            this.oChatData.Email = msg.Email;
            if( ! this.oChatData.incomingChatInitiated){
                this.oChatData.ExternalReferenceID = msg.ExternalReferenceID;
                this.oChatData.incomingChatInitiated = true;
                this.oChatData.incomingChatWaiting = false;
                var chatData = {
                    "Type"  : "CHAT",
                    "Email" : this.oChatData.Email ,
                    "ExternalReferenceID" : this.oChatData.ExternalReferenceID
                }
                this._SAPIntegration.sendIncomingChatToC4C(chatData);
            }

            return msg;

        },

        onNewSocketInformation : function(event){

            var data = this.mapIncomingDataToList(event);
            this.oChatData.ChatHistory.push(data);
            this.oModel.setData(this.oChatData);
            this.oView.setVisible(true);
            MessageToast.show( "new message received");
        },

        mapToSendData : function(msg){

            var data = {};
            data.Name = this.UserContext.Name;
            data.chatMessage = msg;
            data.PersonImg = this.UserContext.PersonImg;
            return data;

        },

        onSendChat:function(){

            var forwardMsg = this.mapToSendData(this.oChatData.chatMessage);
            this.socket.emit(this._socketConnectionId, forwardMsg);
            MessageToast.show( "Message sent");
            this.oChatData.chatMessage = "";

        },
        /**
         * End the chat and Clear are transcripts
         */
        onEndChat :function () {
            this.oChatData.incomingChatInitiated = false;
            this.oChatData.incomingChatWaiting = true;
            this.oChatData.chatMessage= "";
            var chatHistory  = "";
            this.oChatData.ChatHistory.forEach(function (chatMsg) {
                var chatMsgString ;
                chatMsgString = chatMsg.Name + " : " + chatMsg.chatMessage ;
                if(chatHistory != "") {
                    chatHistory = chatHistory + ' \n ' + chatMsgString;
                }else{
                    chatHistory = chatMsgString;
                }

            });

            var chatMsgToC4C = {};
            chatMsgToC4C.Transcript= chatHistory;
            chatMsgToC4C.Type = "CHAT";
            chatMsgToC4C.EventType = "UPDATEACTIVITY";
            chatMsgToC4C.ExternalReferenceID = this.oChatData.ExternalReferenceID;


            this._SAPIntegration.sendIncomingChatToC4C(chatMsgToC4C);
            this.oChatData.Transcript =
            this.oChatData.ChatHistory = [];
            this.oChatData.ExternalReferenceID = "";
            this.oModel.setData(this.oChatData);
        },

        /**
         * Open customer chat window
         */
        onOpenCustomerChat:function () {
            var customerUrl = "CustomerChat.html?socketId=" + this._socketConnectionId;
            window.open(customerUrl)

        },
        /**
         * get the socket connection from the page
         * @private
         */
        _getSocketConnectionId : function(){

            // var socketConnectionId = this._getParameterByName("socketId");
            // return socketConnectionId;

            var oGlobalModal = sap.ui.getCore().getModel("oGlobalModal").getData();
            return oGlobalModal.connection.socketId;

        },
        /**
         * Read parameters from URL
         * @param name
         * @param url
         * @returns {*}
         * @private
         */
        _getParameterByName:function(name, url){
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        }



    });

});
