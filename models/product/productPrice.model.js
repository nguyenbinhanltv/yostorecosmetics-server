class ProductPrice {
    constructor(options) {
        this.productRetailPrice = options.productRetailPrice; //Giá bán lẻ
        this.productWholesalePrice = options.productWholesalePrice; //Giá bán buôn
        this.productStockPrice = options.productStockPrice; //Giá nhập
    }
}

module.exports.ProductPrice = ProductPrice;