const admin = require('firebase-admin');
const firebaseHelper = require('firebase-functions-helper/dist');

//Model
const Product = require('../models/product/product.model').Product;
const ProductPrice = require('../models/product/productPrice.model').ProductPrice;
const ProductClassification = require('../models/product/productClassification.model').ProductClassification;
const ProductWareHouse = require('../models/product/productWareHouse.model').ProductWareHouse;

const db = admin.firestore();
const collectionName = 'products';

//Get 1 product
module.exports.getProduct = (req, res) => {
  const productId = req.params.productId;
  firebaseHelper
  .firestore
  .getDocument(db, collectionName, productId)
  .then(doc => res.status(200).send(doc))
  .catch(err => res.status(400).send(err));
};

//Get all product
module.exports.getProducts = async (req, res) => {
  let data = [];
  const productsRef = db.collection('products');
  await productsRef.get()
  .then(snapshot => snapshot.forEach(doc => {
    data.push(doc.data());
  }))
  .then(doc => res.status(200).send(data))
  .catch(err => res.status(400).send(err));
};

//Create 1 product
module.exports.createProduct = (req, res) => {
  let data = req.body;

  firebaseHelper
  .firestore
  .createNewDocument(db, collectionName, data)
  .then(doc => {
    data.productId = doc.id;
    firebaseHelper
    .firestore
    .updateDocument(db, collectionName, data.productId, data)
    .then(doc => res.status(201).send(`Create Product ${data.productId} Successfully !`))
    .catch(err => res.status(400).send(err));
  })
  .catch(err => res.status(400).send(err));
};

//Update 1 product
module.exports.updateProduct = (req, res) => {
  const productId = req.params.productId;
  let data = req.body;

  firebaseHelper
  .firestore
  .updateDocument(db, collectionName, productId, data)
  .then(doc => res.status(200).send(`Update product ${productId} successfully !!!`))
  .catch(err => res.status(400).send(err));
};

//Delete 1 product
module.exports.deleteProduct = (req, res) => {
  const productId = req.params.productId;
  firebaseHelper
  .firestore
  .deleteDocument(db, collectionName, productId)
  .then(doc => res.status(200).send(`Delete product ${productId} successfully !!!`))
  .catch(err => res.status(400).send(err));
};