const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

let serviceAccount = require('./serviceAccounts.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://yostorecosmetic-api.firebaseio.com"
});

//Router

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

//API



app.listen(port, () => {
    console.log('Your server running at ' + port);
});