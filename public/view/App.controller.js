sap.ui.define(['sap/m/MessageToast','sap/ui/core/mvc/Controller']
, function (MessageToast,Controller) {
    "use strict";
    return Controller.extend("sap.ui.c4c.widget.App", {
        onInit : function () {
            this.Data = { phoneNumber : "13131313" };
            this.oModel = new sap.ui.model.json.JSONModel();
            this.oModel.setData(this.Data);
            this.oView.setModel(this.oModel);
            jQuery.sap.registerResourcePath("c4c", "javascripts/c4c");
            jQuery.sap.require("c4c.cti.integration");
            this._SAPIntegration = new c4c.cti.integration();
        },
        onAccept : function (evt) {
            var param = { };
            param.ANI = this.Data.phoneNumber;
            this._SAPIntegration.sendIncomingCalltoC4C(param);
            MessageToast.show( "Call Simulated");
        }


    });

});