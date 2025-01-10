const mongooseTool = require("mongoose");


module.exports.connectDB = () =>{
    mongooseTool.connect("mongodb://localhost:27017/izhar-mashkif-mongo-poc")
        .then(()=> console.log("db connected by mongoose"))
        .catch(()=> console.log("Error in mongoose connection"));

    
}

module.exports.playGamesMongoose = async (req, res) => {

    console.log("hello Mongoose");




    // const userSchema = new mongoose.Schema({
    //   name: String,
    //   email: String
    // });

    const productSchema = new mongooseTool.Schema({
        name: String,
        price: Number,
        inStock: Boolean
    });

    const product1 = {name: "mouse2", price: 60.50, inStock: true};
    const product2 = {name: "marker2", price: 5, inStock: false};

    //const User = mongoose.model('User', userSchema);
    const ProductModel = mongooseTool.model('myProducts', productSchema);
    // const ProductModel = mongooseTool.model('product', productSchema);

    // //const newUser = new User({
    //   name: 'John Doe',
    //   email: 'john.doe@example.com'
    // });

    // await newUser.save();
    // console.log('User Created:', newUser);


    let addProductToDb = new ProductModel([product1, product2]);

    // ProductModel.insertMany([product1, product2]);
    await addProductToDb.save();

    addProductToDb = new ProductModel(product2);
    await addProductToDb.save();


};