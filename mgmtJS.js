//grabbling the packages
var mysql = require("mysql");
var inquirer = require ('inquiere');
var Table = require('cli-table');

//connection to database

var connection = mysql.createConnection ({
    host:'localhost',
    port:3306,
    user:'root',
    password:"password",
    database:"bamazon"
    
});

// exeute meun option list diplay when connected

connection.connect(function (err) {

    if (err) throw err;
    displayMenu();

});

//________________________________________________________________

// Menu option list

function displayMenu() {

    inquirer.prompt({
        name:'menuOptions',
        type: 'rawlist',
        message:"Choose an Option",
        choices: ['View Items for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
    })

    .then(function(answer){
        switch(answer.menuOptions) {
            case "View Products for Sale":
            viewProducts();
            break;

            case "View Low Inventory":
            lowInventory();
            break;

            case "Add New Product":
            newProdutc();
            break;
        }
    });
};