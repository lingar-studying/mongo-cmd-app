const mongooseTool = require("mongoose");
const {StockScheme} = require("../data/Stock");

const connectDB = () =>{
    mongooseTool.connect("mongodb://lingar:12345678@localhost:27017/izhar-mashkif-mongo-poc?authSource=admin")//mongodb://lingar:12345678@localhost:27017 - without password: mongodb://localhost:27017
        .then(()=> console.log("db connected by mongoose"))
        .catch((e)=> console.log("Error in mongoose connection", e));

    
}

module.exports.init = () =>{
    connectDB();

    //creating scheme = shape of the collection to create
    const stocksSchema = new mongooseTool.Schema(StockScheme);
    //creating the collection
    const StockModel = mongooseTool.model('stocks', stocksSchema);




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
