const admin = require('firebase-admin');
const firebaseHelper = require('firebase-functions-helper/dist');

//Model

const db = admin.firestore();
const collectionName = 'options';

//Get 1 option
module.exports.getOption = (req, res) => {
  const optionId = req.params.optionId;
  firebaseHelper
    .firestore
    .getDocument(db, collectionName, optionId)
    .then(doc => res.status(200).send(doc))
    .catch(err => res.status(400).send('Error'));
};

//Get all options
module.exports.getOptions = async (req, res) => {
  let data = [];
  const optionsRef = db.collection(collectionName);
  await optionsRef.get()
    .then(snapshot => snapshot.forEach(doc => {
      data.push(doc.data());
    }))
    .then(doc => res.status(200).send(data))
    .catch(err => res.status(400).send('Error'));
};

//Create 1 option
module.exports.createOption = (req, res) => {
  let data = req.body;
  
  firebaseHelper
    .firestore
    .createDocumentWithID(db, collectionName, data.optionId, data)
    .then(doc => res.status(201).send(`Create Option ${data.optionId} Successfully !`))
    .catch(err => res.status(400).send('Error'));
};

//Update 1 option
module.exports.updateOption = (req, res) => {
  const optionId = req.params.optionId;
  let data = req.body;

  firebaseHelper
    .firestore
    .updateDocument(db, collectionName, optionId, data)
    .then(doc => res.status(200).send(`Update option ${optionId} successfully !!!`))
    .catch(err => res.status(400).send('Error'));
};

//Delete 1 option
module.exports.deleteOption = (req, res) => {
  const optionId = req.params.optionId;
  firebaseHelper
    .firestore
    .deleteDocument(db, collectionName, optionId)
    .then(doc => res.status(200).send(`Delete option ${optionId} successfully !!!`))
    .catch(err => res.status(400).send('Error'));
};