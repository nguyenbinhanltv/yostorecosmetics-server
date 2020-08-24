class Product {
    constructor(options) {
        this.productName = options.productName; //string
        this.productId = options.productId; //string
        this.productBarCode = options.productBarCode; //string
        this.productPrice = options.productPrice; //ProductPrice Model
        this.productClassification = options.productClassification; //ProductClassification Model
        this.productWareHouse = options.productWareHouse; //ProductWareHouse Model
    }
}

module.exports.Product = Product;