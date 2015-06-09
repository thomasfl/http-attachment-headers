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
    var IE9orIE10 = isIE9orIE10(req);
    res.send('<html><head>' +
             '<title>PDF download</title></head><body>' +
             /* The download attribute make browsers download
              instead of displaying file. Not supported in IE.
              download="example.pdf" */
             '<p><a href="example.pdf">Download PDF</a></p>' +
             '<p>IE9 or IE10: ' + IE9orIE10 + '</p>' +
             '<p>User agent: ' + ua + '</p>' +
             '</body></html>');
});

/* isIE9orIE10() User agent check for:
 * IE9:
 *   Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.0; Trident/5.0)
 * IE10:
 *   Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0)
 */
function isIE9orIE10(request) {
    var ua = request.headers['user-agent'];
    return (/MSIE (9|10)\.0/.test(ua));
}

app.get('/example.pdf', function (req, res) {
    var ua = req.headers['user-agent'];
    var headers = {
        'Content-type': 'application/pdf'
    };
    if(isIE9orIE10(req)) {
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

console.log('Listening on port ' + port);
var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
});
