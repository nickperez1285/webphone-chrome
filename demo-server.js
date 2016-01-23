var express = require('express');
var app = express();

app.use('/', express.static('src/demo'));
app.use('/bower', express.static('src/bower'));
app.use('/lib', express.static('lib'));
app.use('/dist', express.static('dist'));

var server = app.listen(8000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Demo app listening at http://%s:%s', host, port)
});