class Product {
    constructor(options) {
        this.productName = options.productName; //string
        this.productId = options.productId; //string
        this.productBarCode = options.productBarCode; //string
        this.productRetailPrice = options.productRetailPrice; //number
        this.productWholesalePrice = options.productWholesalePrice; //number
        this.productStockPrice = options.productStockPrice; //number
        this.productType = options.productType; //string
        this.productMark = options.productMark; //string
        this.productWeight = options.productWeight; //string
        this.productUnit = options.productUnit; //string
        this.productOrigin = options.productOrigin; //<America, France>
    }
}

module.exports.Product = Product;