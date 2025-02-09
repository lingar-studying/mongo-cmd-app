const mongooseTool = require("mongoose");
const {StockScheme} = require("../data/Stock");
//https://mongoosejs.com/
//https://www.nasdaq.com/market-activity/stocks
//https://github.com/lingar-studying/Nodejs2Mongo-studying/blob/master/back-end/controllers/ProductController.js
let stocksSchema = null;//new mongooseTool.Schema(StockScheme);
//creating the collection
let StockModel = null;

let stocksUpdatedData = [];
const connectDB = () => {
    mongooseTool.connect("mongodb://lingar:12345678@localhost:27017/izhar-mashkif-mongo-poc?authSource=admin")//mongodb://lingar:12345678@localhost:27017 - without password: mongodb://localhost:27017
        .then(() => console.log("db connected by mongoose"))
        .catch((e) => console.log("Error in mongoose connection", e));


}

module.exports.init = async () => {
    connectDB();

    //creating scheme = shape of the collection to create
    stocksSchema = new mongooseTool.Schema(StockScheme);
    //creating the collection
    StockModel = mongooseTool.model('stocks', stocksSchema);
    await createInitMocks();


}
module.exports.getStocks = async () =>{
    return await StockModel.find();//.lean();//lean return a clean object. which will be printed well at console.table
}

module.exports.createStockDb = (stock) =>{
    const addStockToDb = new StockModel(stock);
    return  addStockToDb.save();
}

const createInitMocks = async () => {

    let exist = await StockModel.exists({symbol: "KO"}) != null;
    if (!exist) {
        const coke = new StockModel({
            name: "Coca-Cola Consolidated",
            symbol: "ko".toUpperCase(),
            industry: "food",
            price: 61.59,
            isActive: false,
        });

        await coke.save();

    }


    exist = await StockModel.exists({symbol: "BAER"}) != null;

    if (!exist) {

        const baer = new StockModel({
            name: "Bridger Aerospace Group Holdings",
            symbol: "baer".toUpperCase(),
            industry: "Business Services",
            price: 2.79,
            isActive: true,
        });

        await baer.save();

    }

    exist = await StockModel.exists({symbol: "PSMT"}) != null;

    if (!exist) {

        const psmt = new StockModel({
            name: "PriceSmart",
            symbol: "psmt".toUpperCase(),
            industry: "Department/Specialty Retail Stores",
            price: 93.45,
            isActive: false,
        });

        await psmt.save();

    }

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
