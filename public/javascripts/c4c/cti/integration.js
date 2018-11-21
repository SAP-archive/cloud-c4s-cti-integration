/**
 * Created by SAP
 * Sample implementation of communication API to SAP Service Cloue / Cloud for customer
 */
jQuery.sap.declare("c4c.cti.integration");

/**
 * initialize the object
 */
c4c.cti.integration =  function() {
    this.init();
};

c4c.cti.integration._privateInstance = null;

/**
 * Return the instance
 * @returns {null|c4c.cti.integration}
 */
c4c.cti.integration.getInstance = function (){
    if(! c4c.cti.integration._privateInstance){
        c4c.cti.integration._privateInstance = new c4c.cti.integration();
    }

    return c4c.cti.integration._privateInstance ;

}

/**
 * Send information to C4C
 * @param parameters
 */
c4c.cti.integration.prototype.sendIncomingCalltoC4C = function (parameters) {
    // var payload = this._formXMLPayload(parameters);
    var payload = this._formJSONPayload(parameters);
    this._doCall(payload);
};
/**
 *
 * @param parameters : incoming chat information
 */
c4c.cti.integration.prototype.sendIncomingChatToC4C = function (parameters) {
    var payload = this._formJSONPayload(parameters);
    this._doCall(payload);
};

/**
 * post to parent window
 * @param sPayload
 * @private
 */
c4c.cti.integration.prototype._doCall = function (sPayload) {

    if(window.parent !== window){
        //todo: Replace the * with the corresponding Service Cloud tenant.
        window.parent.postMessage(sPayload, "*");
    }

};

/**
 * construct the payload in json Format - ongoing dev
 * @param sDestination
 * @param sOriginator
 * @returns payload in xml format
 * @private
 */

c4c.cti.integration.prototype._formJSONPayload = function(parameters){


    var payload = {"payload":parameters};
    return payload;
};
/**
 * construct the payload in XML format
 * @param sDestination
 * @param sOriginator
 * @returns payload in xml format
 * @private
 */
c4c.cti.integration.prototype._formXMLPayload = function(parameters){


    var sPayload = "<?xml version='1.0' encoding='utf-8' ?> <payload> " ;

    for(var key in parameters){
        var tag = "<" + key + ">" + parameters[key] +  "</" + key +">";
        sPayload = sPayload + tag;
    }
    sPayload = sPayload +  "</payload>";

    return sPayload;
};

/**
 * Initialize the window listner from C4C
 */
c4c.cti.integration.prototype.init = function(){
    this._callbackFunction = null;
    this._addOnMessageEvent();
};


/**
 * validate the message
 * @param message
 * @param origin
 * @returns {boolean}
 * @private
 */
c4c.cti.integration.prototype._validateMessage = function(message, origin) {
    //if (origin !== /** Check for the origin of message */ ) {
    //    _log(ERROR, "Wrong origin data");
    //    return false;
    //}
    return true;
};

/**
 *
 * @param evt
 * @private
 */
c4c.cti.integration.prototype._onMessage = function(event){

    if (this._validateMessage(event.data, event.origin) === true) {
        //this.fireEvent("messageFromProvider", event);

        if(this._callbackFunction){
            this._callbackFunction(event);
        }
    }

};
/**
 * add onMessage listner
 * @private
 */
c4c.cti.integration.prototype._addOnMessageEvent = function() {

    if (window.addEventListener) {

        window.addEventListener("message", $.proxy(this._onMessage, this), false);

    } else {
        window.attachEvent("onmessage", $.proxy(this._onMessage, this));
    }
};

/**
 * Register the call back event.
 * @param callbackFunction
 */
c4c.cti.integration.prototype.registerOutboundCallback = function(callbackFunction){
    this._callbackFunction = callbackFunction;
};


/**
 * demonstration of send request to SAP Cloud for Customer CTI Local Adapter
 */
c4c.cti.integration.prototype.onSendCallRequestToCTIAdapter = function(cadData){
    var query = "CID=BCM1234" ;
    for(var key in cadData){
        query =  query + "&" + key + "=" + cadData[key];
    }
    $.get("http://localhost:36729",query);
};
