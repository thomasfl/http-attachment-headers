/* File download example with express.
 *
 * To run: node index.js
 */
var express = require('express');
var app = express();
var https = require('https');
var fs = require('fs');

app.get('/', function (req, res) {
    var ua = req.headers['user-agent'];
    var internetExplorer = isInternetExplorer(req);
    res.send('<html><head>' +
             '<title>PDF download</title></head><body>' +
             /* The download attribute make browsers download
              instead of displaying file. Not supported in IE.
              download="example.pdf" */
             '<p><a href="example.pdf">Download PDF</a></p>' +
             '<p>Internet Explorer: ' + internetExplorer + '</p>' +
             '<p>User agent: ' + ua + '</p>' +
             '</body></html>');
});

function isInternetExplorer(request) {
    var ua = request.headers['user-agent'];
    return (/MSIE/.test(ua) || /Trident/.test(ua));
};

app.get('/example.pdf', function (req, res) {
    var ua = req.headers['user-agent'];
    var headers = {
        'Content-type': 'application/pdf'
    };
    if(isInternetExplorer(req)) {
        headers = {
            /* Make browsers download instead of displaying file:
             http://en.wikipedia.org/wiki/MIME#Content-Disposition */
            'Content-Disposition': 'attachment;filename="INV12345678.pdf"'
            /* Some browsers support this too : */
            /* 'Content-type': 'application-download' */
        };
    }

    var options = {
        root: __dirname + '/',
        dotfiles: 'deny',
        headers: headers
    };
    res.sendFile('example.pdf', options, function (err) {
        if (err) {
            console.log(err);
            res.status(err.status).end();
        }
    });
});

var port = 8080;

console.log("Listening on port 8080");
var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
});
