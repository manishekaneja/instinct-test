const express = require('express');
const app = express();
app.set('port', (process.env.PORT || 5000));
    app.use(function (req, res, next) {
        var schema = (req.headers['x-forwarded-proto'] || '').toLowerCase();
        if (schema === 'https') {
            next();
        } else {
            res.redirect('https://' + req.headers.host + req.url);
        }
    });
app.use(express.static(__dirname + '/'));
app.get("/", function (req, res) {
    res.sendFile(path.resolve(__dirname + "/index.html"));
})
app.listen(app.get('port'), function () {
    console.log("Server Running at : " + app.get('port'));
})