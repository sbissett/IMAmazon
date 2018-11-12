//grabbling the packages
var mysql = require("mysql");
var inquirer = require ('inquirer');
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

// Product View ________________________________________________________________________________

connection.query("SELECT id, product_name, price,stock_quantity FROM products", function(err,res){

    if (err) throw err;
    console.log("");
    console.log("Complete Inventory List")

    var table = new Table ({
                        head:['Id', 'Product Description', 'Price', 'Quantity' ],
                        colWidths: [5,50,8,10],
                        colAligns: ['center','left','right','center'],
                        style: {
                            head:[ 'cyan' ],
                            compact: true
                        }
                    });//end table
                    
                    for (var i = 0; i < res.length; i++) {
                        table.push([res[i].id, res[i].product_name,res[i].stock_quantity]);    
                    }
                       
                    ;
                    console.log(table.toString());
                    console.log("");
                displayMenu();    
    });

// Low Inventory View _________________________________________________________________________________
