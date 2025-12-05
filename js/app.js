const ar = ["Lakshan", "123"]
localStorage.setItem("loginDetails", JSON.stringify(ar));

function login() {
    let userName = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();

    const adminDetails = JSON.parse(localStorage.getItem("loginDetails"));

    if (!adminDetails) {
        Swal.fire("No login details found in localStorage!", "warning");
        return;
    }

    if (adminDetails[0] === userName && adminDetails[1] === password) {

        window.location.replace("adminPanel.html");
    } else {
        Swal.fire("Invalid username or password", "warning");
    }
}



function placeOrder() {
    let orderId = document.getElementById("orderId").value;
    let itemName = document.getElementById("orderBurgerName").value.trim();
    let qty = document.getElementById("orderQty").value.trim();
    let customerName = document.getElementById("customerName").value.trim();
    let customerPhoneNumber = document.getElementById("customerPhone").value.trim();
    let price = document.getElementById("orderBurgerPrice").value.trim();
    if (itemName === "" || qty === "" || customerName === "" || customerPhoneNumber === "" || price === "") {
        Swal.fire("Missing Fields", "Please fill all the fields", "warning");
        return;
    } else {
        let total = qty * price;

        Swal.fire({
            title: "Invoice",
            html: `
            <div style="text-align: left; font-size: 16px;">
                <p><strong>Customer Name:</strong> ${customerName}</p>
                <p><strong>Customer Phone:</strong> ${customerPhoneNumber}</p>
                <p><strong>Item Name:</strong> ${itemName}</p>
                <p><strong>Quantity:</strong> ${qty}</p>
                <p><strong>Price (each):</strong> Rs. ${price}</p>
                <hr>
                <p><strong>Total:</strong> <span style="font-size: 20px; color: #28a745;">Rs. ${total}</span></p>
            </div>
        `,
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "#28a745",
            width: "350px"
        });

        let tempCusArray = JSON.parse(localStorage.getItem("customers")) || [];

        for (let i = 0; i < tempCusArray.length; i++) {
            if (tempCusArray[i].phone === customerPhoneNumber) {

                tempCusArray[i].orders.push({
                    orderId: orderId,
                    name: itemName,
                    itemQty: qty,
                    unitPrice: price
                });

                localStorage.setItem("customers", JSON.stringify(tempCusArray));
                document.getElementById("orderId").value = generateOrderId();
                document.getElementById("orderBurgerName").value = "";
                document.getElementById("orderQty").value = "1";
                document.getElementById("customerName").value = "";
                document.getElementById("customerPhone").value = "";
                document.getElementById("orderBurgerPrice").value = "";
                return;
            }
        }

        tempCusArray.push({
            name: customerName,
            phone: customerPhoneNumber,
            orders: [{
                orderId: orderId,
                name: itemName,
                itemQty: qty,
                unitPrice: price
            }]
        });

        localStorage.setItem("customers", JSON.stringify(tempCusArray));
        document.getElementById("orderId").value = generateOrderId();
        document.getElementById("orderBurgerName").value = "";
        document.getElementById("orderQty").value = "1";
        document.getElementById("customerName").value = "";
        document.getElementById("customerPhone").value = "";
        document.getElementById("orderBurgerPrice").value = "";
    }
}

function searchCustomer() {

    let customerPhone = document.getElementById("customerPhone").value.trim();

    let tempArray = JSON.parse(localStorage.getItem("customers")) || [];

    for (let i = 0; i < tempArray.length; i++) {
        if (tempArray[i].phone === customerPhone) {
            document.getElementById("customerName").value = tempArray[i].name;
            return;
        }
    }
    document.getElementById("customerName").value = "";
}


function generateOrderId() {
   
    var customers = JSON.parse(localStorage.getItem("customers")) || [];
    var maxNum = 0;
    for (var i = 0; i < customers.length; i++) {
        var orders = customers[i].orders || [];
        for (var j = 0; j < orders.length; j++) {
            var id = orders[j].orderId || '';
            var num = parseInt(id.replace("OR", '')) || 0;
            if (num > maxNum) maxNum = num;
        }
    }
    var next = maxNum + 1;
    return 'OR' + String(next).padStart(4, '0');
}

document.addEventListener('DOMContentLoaded', function () {
    var input = document.getElementById('orderId');
    if (input) input.value = generateOrderId();
});

function addProduct() { 
    let productName = document.getElementById("productName").value;
    let productCategory = document.getElementById("productCategory").value;
    let productPrice = document.getElementById("productPrice").value;
    let productDesc = document.getElementById("productDesc").value;

    if (productName === "" || productCategory === "" || productPrice === "" || productDesc === "") {
        Swal.fire("Missing Fields", "Please fill all the fields", "warning");
        return;
    } else {
        let tempProductArray = JSON.parse(localStorage.getItem("products")) || [];

        for (let i = 0; i < tempProductArray.length; i++) {
            if (tempProductArray[i].productName === productName) {
                Swal.fire("Update Product", "Product Updated Successfully", "success");

                tempProductArray[i].push({
                    productPrice: productPrice,
                    productDesc: productDesc
                });

                localStorage.setItem("products", JSON.stringify(tempProductArray));
                document.getElementById("productName").value = "";
                document.getElementById("productCategory").value = "";
                document.getElementById("productPrice").value = "";
                document.getElementById("productDesc").value = "";
                return;
            }
        }
        Swal.fire("Add Product", "Product Added Successfully", "success");

        tempProductArray.push({
            productName: productName,
            productCategory: productCategory,
            productPrice: productPrice,
            productDesc: productDesc
        });

        localStorage.setItem("products", JSON.stringify(tempProductArray));
        document.getElementById("productName").value = "";
        document.getElementById("productCategory").value = "";
        document.getElementById("productPrice").value = "";
        document.getElementById("productDesc").value = "";
    }
}