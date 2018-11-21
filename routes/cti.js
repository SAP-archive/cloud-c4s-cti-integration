var express = require('express');
var router = express.Router();

/* Standard route to listen to path cti for any mesages */
router.get('/*', function(req, res, next) {
    if(req.query.connectionId){
        var connectionId = req.query.connectionId;
    }else{
        connectionId = "_ctiConnection";
    }
    console.log("incoming get request for connection " + connectionId );
    io.emit(connectionId ,  req.query );
    res.json({message : "All ok"});
});

router.post('/:connectionId/', function(req, res, next) {
    var connectionId = req.params.connectionId;
    console.log("post with  connection id" + connectionId);
    io.emit(connectionId ,  req.body );
    res.json({message : "All OK"});
});

router.post('/', function(req, res, next) {
    console.log("post with no connection id"  );
    io.emit('_ctiConnection' ,  req.body );
    res.json({message : "All OK"});
});


module.exports = router;
