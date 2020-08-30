const admin = require('firebase-admin');
const firebaseHelper = require('firebase-functions-helper/dist');

//Model

const db = admin.firestore();
const collectionName = 'purchase-orders';

//Get all purchase-orders
module.exports.getPurchaseOrders = async (req, res) => {
    let data = [];
    const optionsRef = db.collection(collectionName);
    await optionsRef.get()
        .then(snapshot => snapshot.forEach(doc => {
            data.push(doc.data());
        }))
        .then(doc => res.status(200).send(data))
        .catch(err => res.status(400).send('Error'));
}

//Get 1 purchase-orders
module.exports.getOnePurchaseOrders = (req, res) => {
    const purchaseOrdersId = req.params.purchaseOrdersId;

    firebaseHelper
        .firestore
        .getDocument(db, collectionName, purchaseOrdersId)
        .then(doc => res.status(200).send(doc))
        .catch(err => res.status(400).send('Error'));
}

//Create 1 purchase-orders
module.exports.createOnePurchaseOrders = (req, res) => {
    let data = req.body;

    data['purchaseOrdersTimeCreated'] = new Date().toLocaleDateString("en-US");
    data['purchaseOrdersStatus'] = data['purchaseOrdersStatus'][0].name;
    data['purchaseOrdersPaymentStatus'] = data['purchaseOrdersPaymentStatus'][0].name;

    firebaseHelper
        .firestore
        .createNewDocument(db, collectionName, data)
        .then(doc => {
            data.purchaseOrdersId = doc.id;
            firebaseHelper
                .firestore
                .updateDocument(db, collectionName, data.purchaseOrdersId, data)
                .then(doc => res.status(200).send(`Create PurchaseOrders ${data.purchaseOrdersId} Successfully !`))
                .catch(err => res.status(400).send('Error'));
        })
        .catch(err => res.status(400).send('Error'));

}

//Update 1 purchase-orders
module.exports.updateOnePurchaseOrders = (req, res) => {
    const purchaseOrdersId = req.params.purchaseOrdersId;
    const data = req.body;
    data['purchaseOrdersStatus'] = data['purchaseOrdersStatus'][0].name;
    data['purchaseOrdersPaymentStatus'] = data['purchaseOrdersPaymentStatus'][0].name;

    firebaseHelper
        .firestore
        .updateDocument(db, collectionName, purchaseOrdersId, data)
        .then(doc => res.status(200).send(`Update PurchaseOrders ${data.purchaseOrdersId} Successfully !`))
        .catch(err => res.status(400).send('Error'));
}

//Delete 1 pruchase-orders
module.exports.deleteOnePurchaseOrders = (req, res) => {
    const purchaseOrdersId = req.params.purchaseOrdersId;

    firebaseHelper
        .firestore
        .deleteDocument(db, collectionName, purchaseOrdersId)
        .then(doc => res.status(200).send(`Delete PurchaseOrders ${data.purchaseOrdersId} Successfully !`))
        .catch(err => res.status(400).send('Error'));
}