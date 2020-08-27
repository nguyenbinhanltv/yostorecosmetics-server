const admin = require('firebase-admin');
const firebaseHelper = require('firebase-functions-helper/dist');

//Model

const db = admin.firestore();
const collectionName = 'purchase-orders';

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

module.exports.getOnePurchaseOrders = (req, res) => {
    const purchaseOrdersId = req.params.purchaseOrdersId;

    firebaseHelper
        .firestore
        .getDocument(db, collectionName, purchaseOrdersId)
        .then(doc => res.status(200).send(doc))
        .catch(err => res.status(400).send('Error'));
}

module.exports.createOnePurchaseOrders = (req, res) => {
    let data = req.body;

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