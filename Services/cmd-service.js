const readline = require('node:readline');

const {init, getStocks} = require('../Services/db-services');
let data = [];
module.exports.runMe = () =>{
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    init().then(()=>{
        getStocks().then(
            res=>{
                console.log(res);
                data = res;
                showData();
            }
        )
    });
}
const showData = () =>{
    console.log("Current stocks in the account:");
    // data.forEach((e,i)=>console.log(`${i+1}- ${e.name}, ${e.symbol} ,${e.price}`));
    const cleanData = data.map(e => e.toObject());

    console.table(cleanData);

    // data.forEach((e,i)=> {
    //
    //     console.log("Stock " + (i+1));
    //     let {name, symbol, industry, price, isActive} = e;
    //     let all = {name, symbol, industry, price, isActive}
    //     // all.index = i+1;
    //     console.table(all);
    // });


    console.log("to add here the menu... ")
}
