// TODO: Constructor function and methods...
function Product(name, dpto, price, exp) {
    this.name = name;           // String
    this.department = dpto;     // String
    this.price = price;         // Float
    this.expDate = exp;          // Date Object

    // Methods
    // Check if is expired - true if it is expired/ false if it is not
    this.isExpired = function () {
        // Assign the value of the current date
        var currentDay = new Date();

        // Difference of the current date and the expDate of the product (in ms)
        var differenceInMilliseconds = (currentDay.getTime() - this.expDate.getTime());

        // Converting the difference to days
        var differenceInDays = Math.round(differenceInMilliseconds / (24 * 3600000));

        // If the differenceInDays > 0 - product is expired - return true
        if (differenceInDays > 0) {
            return true;
        }
        else {
            return false;
        }
    }

    // Method to output
    this.outputString = function () {
        if (this.isExpired()) {
            return this.department + " | " + this.name + " | $" + this.price + " | " + "Expired";
        }
        else {
            return this.department + " | " + this.name + " | $" + this.price + " | " + "Not Expired";
        }
    }
}

// Global array
var products = [];

// Some products
products.push(new Product("Avacados", "Produce", 8.99, new Date("June 27, 2020")));
products.push(new Product("Baguette", "Bakery", 5.99, new Date("July 30, 2020")));
products.push(new Product("Beef", "Deli", 14.99, new Date("April 1, 2020")));
products.push(new Product("Pears", "Produce", 5.50, new Date("April 2, 2020")));
products.push(new Product("2L Chocolate Milk", "Dairy", 4.99, new Date("March 21, 2020")));
products.push(new Product("Pumpkin Pie", "Bakery", 10.50, new Date("March 13, 2020")));
products.push(new Product("Grapes", "Produce", 6.99, new Date("February 1, 2019")));
products.push(new Product("Loaf of Bread", "Bakery", 5.99, new Date("March 30, 2020")));
products.push(new Product("Cheddar Cheese", "Dairy", 10.99, new Date("March 14, 2020")));
products.push(new Product("Margarine", "Dairy", 8.99, new Date("June 14, 2018")));
products.push(new Product("Salami", "Deli", 5.99, new Date("March 13, 2020")));
products.push(new Product("Oranges", "Produce", 7.50, new Date("May 2, 2020")));
products.push(new Product("Chicken", "Deli", 21.99, new Date("March 22, 2020")));
products.push(new Product("Turkey", "Deli", 14.99, new Date("April 3, 2020")));
products.push(new Product("Peppers", "Produce", 3.99, new Date("March 27, 2020")));
products.push(new Product("Ham", "Deli", 9.99, new Date("May 5, 2020")));
products.push(new Product("Chocolate Cake", "Bakery", 19.99, new Date("October 10, 2007"))); // The Cake is a Lie!
products.push(new Product("10kg White Flour", "Bakery", 12.99, new Date("September 30, 2020")));

// Function to calculate the waste
function calculateWaste() {
    // Get the value on the dropdown
    var dptoFilter = document.getElementById("sbDepartmentFilter").value;

    // Get the output area and clean it
    var wasteOutput = document.getElementById("wasteOutput");
    wasteOutput.innerHTML = "";

    // Amount of experied price
    var totalExpiredAmount = 0;

    // Loop through the products array 
    products.forEach(function (product) {
        if ((dptoFilter == product.department || dptoFilter == "Entire Store") && product.isExpired()) {
            // if the product is in the department selected and is expired the price is added to the total expired amount
            totalExpiredAmount += product.price;
        }
    })

    // Output
    if (totalExpiredAmount == 0) {
        // if no product is expired in the selected department output this:
        wasteOutput.innerHTML = dptoFilter + " reports no expired product!";
    }
    else {
        wasteOutput.innerHTML = dptoFilter + " reports $" + totalExpiredAmount.toFixed(2) + " worth of expired product!";
    }
}

function displayProducts() {
    // Get the value on the dropdown
    var expiredFilter = document.getElementById("sbProductsFilter").value;

    // Get the output Area and clean it 
    var outputArea = document.getElementById("productOutput");
    outputArea.innerHTML = "";

    // Loop through the products array and check the expired filter and the product expired date to display
    products.forEach(function (product) {
        if ((expiredFilter == "Expired" && product.isExpired() == true) || (expiredFilter == "Not Expired" && product.isExpired() == false) || expiredFilter == "All") {

            outputArea.innerHTML += product.outputString() + "<br>";
        }
    })
}