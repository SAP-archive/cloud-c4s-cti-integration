/**
 * Socket connection helper.
 */
jQuery.sap.declare("c4c.socket.SocketHelper");
c4c.socket.SocketHelper =  function() {
    this.socket = null;
};


c4c.socket.SocketHelper._privateInstance = null;

c4c.socket.SocketHelper.getInstance = function(tokenId){
    if(!c4c.socket.SocketHelper._privateInstance){
        c4c.socket.SocketHelper._privateInstance = new c4c.socket.SocketHelper();
        c4c.socket.SocketHelper._privateInstance.socket = io(tokenId);
    }

    return c4c.socket.SocketHelper._privateInstance.socket;

}
