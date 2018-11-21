/**
 * Controller class for socket based example listner
 */
sap.ui.define(['sap/m/MessageToast','sap/ui/core/mvc/Controller']
, function (MessageToast,Controller) {
    "use strict";
    return Controller.extend("sap.ui.c4c.widget.OutboundCallView", {
        onInit : function () {

            this.Data = {  };
            this.Data.showOutboundCall = false;
            this.oView.setVisible(false);
            this._socketConnectionId = "11313";
            this.oModel = new sap.ui.model.json.JSONModel();
            this.oModel.setData(this.Data);
            this.oView.setModel(this.oModel);

            jQuery.sap.registerResourcePath("c4c", "javascripts/c4c");
            jQuery.sap.require("c4c.cti.integration");
            this._SAPIntegration = new c4c.cti.integration();

            this._SAPIntegration.registerOutboundCallback($.proxy(this.callBackListner, this));

        },

        /**
         * Generate a unique socket link to server
         * @private
         */
        callBackListner : function(event){
            //alert("callback listner triggered") ;
            event.data.showOutboundCall = true;
            this.oModel.setData(event.data);
            this.oView.setVisible(true);
        },

    });

});