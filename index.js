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
const productRouter = require('./routers/product.router');
const optionsRouter = require('./routers/options.router');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

//API
app.use('/products', productRouter);
app.use('/options', optionsRouter);


app.listen(port, () => {
    console.log('Your server running at ' + port);
});