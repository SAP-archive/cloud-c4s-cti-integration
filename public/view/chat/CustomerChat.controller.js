sap.ui.define(['sap/m/MessageToast','sap/ui/core/mvc/Controller','sap/ui/model/json/JSONModel']
, function (MessageToast,Controller,JSONModel) {
    "use strict";
    return Controller.extend("sap.ui.c4c.widget.chat.CustomerChat", {
        onInit : function () {
            MessageToast.show( "initialized");
            jQuery.sap.registerResourcePath("c4c", "javascripts/c4c");
            jQuery.sap.require("c4c.socket.SocketHelper");
            this._socketConnectionId = this._getSocketConnectionId();
            var sTokenData = "/?token=" +  this._socketConnectionId;
            this.socket = c4c.socket.SocketHelper.getInstance(sTokenData);;
            this.socket.on(this._socketConnectionId,$.proxy(this.onNewSocketInformation,this));

            this.oChatData = { };
            this.oChatData.ChatHistory = [];

            this.UserContext = {};
            this.UserContext.ExternalReferenceID = Math.floor((Math.random() * 100000000) + 1);
            this.UserContext.Name = "Customer Name";
            this.UserContext.Email = "customer@example.com";
            this.UserContext.PersonImg = "res/images/customer.png";

            this.oModel = new JSONModel(this.oChatData);

            this.oVisibilityData = { "customerDetailsPresent" : false,
                                     "customerInputEnabled" :   true
                                    };

            this.oModelVisiblity = new JSONModel(this.oVisibilityData);
            this.oModelCustomer = new JSONModel(this.UserContext);

            this.oView.setModel(this.oModelVisiblity,"visibility");
            this.oView.setModel(this.oModelCustomer,"customer");
            this.oView.setModel(this.oModel);

        },

        mapIncomingDataToList:function(msg){

            return msg;
            //var data = {};
            //data.Name = "Santosh";
            //data.chatMessage = msg;
            //data.PersonImg = "res/images/woman-support-headset.jpg";
            //return data;

        },

        onNewSocketInformation : function(event){
            var data = this.mapIncomingDataToList(event);
            this.oChatData.ChatHistory.push(data);
            this.oModel.setData(this.oChatData);
            MessageToast.show( "new message received");
        },

        mapToSendData : function(msg){

            var data = {};
            data.Name = this.UserContext.Name;
            data.chatMessage = msg;
            data.PersonImg = this.UserContext.PersonImg;
            data.ExternalReferenceID = this.UserContext.ExternalReferenceID;
            data.Email = this.UserContext.Email;
            return data;

        },

        onSendChat:function() {

            var forwardMsg = this.mapToSendData(this.oChatData.chatMessage);
            this.socket.emit(this._socketConnectionId, forwardMsg);
            MessageToast.show("Message sent");
            this.oChatData.chatMessage = "";

        },

        onInitiateChat :function () {
            this.oVisibilityData.customerDetailsPresent = true;
            this.oVisibilityData.customerInputEnabled = false;
            this.UserContext = this.oModelCustomer.getData();
            this.oModelVisiblity.setData(this.oVisibilityData);
        },
        /**
         * get the socket connection from the page
         * @private
         */
        _getSocketConnectionId : function(){

            var socketConnectionId = this._getParameterByName("socketId");
            return socketConnectionId;
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
