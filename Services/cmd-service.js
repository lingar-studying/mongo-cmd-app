const readline = require('node:readline');
const {createStockDb} = require("./db-services");

const {init, getStocks} = require('../Services/db-services');
let data = [];
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
module.exports.runMe = () => {

    init().then(() => {
        getStocks().then(
            res => {
               // console.log(res);
                data = res;
                showData();
            }
        )
    });
    //we can use question as well:
    // rl.question('What is your name? ', (answer) => {
    //     console.log(`Hello, ${answer}!`);
    //     rl.close(); // Close the input stream after receiving the input
    // });
}
const showData = async () => {


    data = await getStocks();
    console.log("Current stocks in the account:");
    // data.forEach((e,i)=>console.log(`${i+1}- ${e.name}, ${e.symbol} ,${e.price}`));
    const cleanData = data.map(e => e.toObject())

    //removing the id.
    cleanData.forEach(e=>{
        delete e._id;
    })

    console.table(cleanData);
    await menu();

    // data.forEach((e,i)=> {
    //
    //     console.log("Stock " + (i+1));
    //     let {name, symbol, industry, price, isActive} = e;
    //     let all = {name, symbol, industry, price, isActive}
    //     // all.index = i+1;
    //     console.table(all);
    // });



}

const menu = async () => {
    console.log("Choose some action:\:" +
        "1- Add new stock | 2- Update exist stock | 3- Delete stock | 4- Change stocks price randomly")

    async function addStock() {
        let stock = {
            name: "",
            symbol: "",
            industry: "",
            price: -1,
            isActive: false
        };

        console.log("Insert the stock values");


        // await new Promise(res=>{
        //     rl.question('name? ', (answer) => {
        //
        //
        //         // return new Promise(resolve => {
        //         //     rl.question(question, (answer) => {
        //         //         resolve(answer);
        //         //     });
        //         stock.name = answer;
        //         res();
        //         //rl.close(); // Close the input stream after receiving the input
        //     })
        // });
        console.log("Insert the stock values");
        //if you don't wait it will run till the end
        stock.name = await prompt("name?");
        stock.symbol = await prompt("symbol?")
        stock.symbol = stock.symbol.toUpperCase();
        let val = await prompt("industry");
        stock.symbol.industry = val;
        val = await prompt("active (y or n)");
        stock.isActive = (val === "y");
        val = await prompt("price? (only numbers)");
        stock.price = +val;
        await createStockDb(stock).then(res => {
            console.log("stock have added successfully-->", res);
        })
            .catch(e => {
                console.error("we have some error on creating- ", e)
            })
            .then(() => showData());


        //those won't work
        // rl.question('name? ', (answer) => {
        //     stock.name = answer;
        //     //rl.close(); // Close the input stream after receiving the input
        // });
        // rl.question('symbol? ', (answer) => {
        //     stock.symbol = answer;
        //     //rl.close(); // Close the input stream after receiving the input
        // });
        // rl.question('industry? ', (answer) => {
        //     stock.industry = answer;
        //     //rl.close(); // Close the input stream after receiving the input
        // });
        // rl.question('price? (only numbers ', (answer) => {
        //     if(isNaN(answer)){
        //         console.log("invalid answer, enter number, try again");
        //         addStock();
        //         return;
        //     }
        //     stock.price = answer;
        //     //rl.close(); // Close the input stream after receiving the input
        // });
        // rl.question('isActive? - 0 or 1', (answer) => {
        //
        //     stock.isActive = answer ==1 ;
        //     //rl.close(); // Close the input stream after receiving the input
        // });

    }

    async function updateStock() {
        console.log("we here xx")
        const choice = await prompt("Choose some index of the stock you want to update between 0 to " + (data.length-1));
        // + data.length-1);

        if(isNaN(choice) || +choice <0 || choice >= data.length){
            console.log("Please choose a valid number");
            showData();
            return;
        }
        //I'll try to update the document directly
        //this is other option - https://mongoosejs.com/docs/tutorials/findoneandupdate.html
        let documentToUpdate = data [(choice-1)];//the data should contains the direct db object that mongoose knows


        console.log("you want to update this document:");
        console.table(documentToUpdate);
        const propToUpdate = await prompt("Choose what prop to update - for example name, or symbol or price (don't touch the id!) ");
        documentToUpdate[propToUpdate] = await prompt("Insert new value");


        try {
            documentToUpdate.save();
            console.log("The data have successfully updated: ");
            //console.table(documentToUpdate);

        }catch (e){
            console.error(e);
        }finally {
            showData();
        }



    }

    rl.on('line', (input) => {
        if (isNaN(input)) {
            console.log("please choose a valid number");
            return;
        }
        switch (+input) {
            case 1:
                addStock();
                ///return;
                break;
            case 2:
                updateStock();
                break;
        }
    })

}
const prompt = (question) => {
    return new Promise(resolve => {
        rl.question(question, answer => {
            resolve(answer);
        })
    })
}
