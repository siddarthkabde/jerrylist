var Product = require('../models/product');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.product_create = function (req, res) {
    // console.log(req.body);
    // var data = JSON.parse(req.body);
    console.log(req.body[1]);
    var data = req.body;

    var product = new Product(
        {
            name: "Product 1",
            price: 5000
        }
    )    

    console.log(product.collection);
    // product.collection.insertMany(data);

    product.save(function (err) {
        if (err) {
            // return next(err);
        }
        res.send('Product Created successfully');
    })
};

exports.product_details = function (req, res) {
    Product.findById(req.params.id, function (err, product) {
        if (err) return next(err);
        res.send(product);
    })
};

exports.product_update = function (req, res) {
    Product.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
        if (err) return next(err);
        res.send('Product udpated.');
    });
};

exports.product_delete = function (req, res) {
    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};