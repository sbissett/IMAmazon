//Bring in my sql + inquirer packages
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

//Create a connection to mysql database
var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: "password", 
	database: "bamazon"
});

//Execute connection that displays all items for sale
connection.connect(function(err){
    if (err) throw err;
    displayAll();
});

//create function to display all items for sale

function displayAll() {
    connection.query("SELECT id, product_name, price FROM products", function(err, res){
        if (err) throw err;
        console.log("");
        console.log('            WELCOME TO BAMAZON           ');
        var table = new Table({
            head: ['id', 'product_name', 'price'],
            colWidths: [5, 50, 7],
            colAligns: ['center', 'left', 'right'],
             style: {
              head: ['cyan'],
              compact: true
            }
        });
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].id, res[i].product_name, res[i].price]);
        }
        console.log(table.toString());
        productId();
    }); //end connection to products
};

//Function to prompt customer to enter id of product to purchase

function productID() {
    inquirer.prompt ([{
        name: 'produtID',
        type: "input",
        message: "Please enter the Id of the product you wish you buy"
        }
    ]).then(function(answer){
        var selection = answer.productID;
        connection.query("SELECT * FROM products WHERE id=?", selection,function(err,res){
            if (err) throw err;

        //If results = 0 then prompt user to pick again and run productId function once more
            if (res.length===0) {
                console.log('That product is either out of stock or doesnt exit');
                productID();
            }    
            else 
                inquirer.prompt([
                    {
                        name:'productQuantity',
                        type: "input",
                        message: "How many items would you like to order today?"
                    }    

                ])
        })

    })



}0;