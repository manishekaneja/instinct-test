const express = require('express');
const app = express();
app.set('port', (process.env.PORT || 5000));
app.enable('trust proxy');
app.use(express.static(__dirname + '/'));
app.get("/", function (req, res) {
    res.sendFile(path.resolve(__dirname + "/index.html"));
})
app.listen(app.get('port'), function () {
    console.log("Server Running at : " + app.get('port'));
})