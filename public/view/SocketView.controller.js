/**
 * Controller class for socket based example listner
 */
sap.ui.define(['sap/m/MessageToast','sap/ui/core/mvc/Controller']
, function (MessageToast,Controller) {
    "use strict";
    return Controller.extend("sap.ui.c4c.widget.SocketView", {
        onInit : function () {

            this.Data = {  };
            this.oModel = new sap.ui.model.json.JSONModel(this.Data);
            this.oView.setModel(this.oModel);

            jQuery.sap.registerResourcePath("c4c", "javascripts/c4c");
            jQuery.sap.require("c4c.cti.integration");

            this._SAPIntegration = new c4c.cti.integration();

            this._generateSocketID();

            var sTokenData = "/?token=" +    this._socketConnectionId;

            this.socket = io(sTokenData);
            this.socket.on(this._socketConnectionId,$.proxy(this.onNewSocketInformation,this));

            var oGlobalData = { connection : { socketId : this._socketConnectionId } };
            var oGlobaModal = new sap.ui.model.json.JSONModel(oGlobalData);
            sap.ui.getCore().setModel(oGlobaModal,"oGlobalModal");
        },

        /**
         * Generate a unique socket link to server
         * @private
         */
        _generateSocketID : function(){
            var randonNumber = Math.floor((Math.random() * 100000000) + 1);
            this._socketConnectionId = randonNumber

            this.Data.SimulateLink = "Simulate.html?socketId=" + this._socketConnectionId;
            this.oModel.setData(this.Data);
        },
        /**
         * receive messages from socket connection
         * @param msg
         */
        onNewSocketInformation : function(msg){
            MessageToast.show( "new incoming information" );
            this.Data.messageText = JSON.stringify(msg);
            this.oModel.setData(this.Data);
            this._SAPIntegration.sendIncomingCalltoC4C(msg);
        }

    });

});