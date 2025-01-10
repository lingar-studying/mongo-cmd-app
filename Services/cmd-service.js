const readline = require('node:readline');

const {init} = require('../Services/db-services');

module.exports.runMe = () =>{
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    init();




}
