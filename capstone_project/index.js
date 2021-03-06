
let addCart = document.querySelectorAll('.add-to-cart-button');
var items = [
    {
   id: 1,
   name: "Brown Brim",
   image: "https://i.ibb.co/ZYW3VTp/brown-brim.png",		
   price: 25,
   inCart:0
},
{
   id: 2,
   name: "Blue Beanie",
   image: "https://i.ibb.co/ypkgK0X/blue-beanie.png",			
   price: 18,
   inCart:0
},
{
   id: 3,
   name: "Brown Cowboy",
   image: "https://i.ibb.co/QdJwgmp/brown-cowboy.png",				
   price: 35,
   inCart:0
},
{
   id: 4,
   name: "Grey Brim",
   image:"https://i.ibb.co/RjBLWxB/grey-brim.png",	
   price: 25,
   inCart:0
},
{
   id: 5,
   name: "Adidas NMD",
   image: "https://i.ibb.co/0s3pdnc/adidas-nmd.png",		
   price: 220,
   inCart:0
},
{
   id: 6,
   name: "Adidas Yeezy",
   image:"https://i.ibb.co/dJbG1cT/yeezy.png",
   price: 280,
   inCart:0
},
{
   id: 7,
   name: "Black Converse",
   image:"https://i.ibb.co/bPmVXyP/black-converse.png",
   price: 110,
   inCart:0
},
{
   id: 8,
   name: "Nike White AirForce",
   image:"https://i.ibb.co/1RcFPk0/white-nike-high-tops.png",
   price: 160,
   inCart:0
},
{
   id: 9,
   name: "Black Jean Shearling",
   image:"https://i.ibb.co/XzcwL5s/black-shearling.png",
   price: 125,
   inCart:0
},
{
   id: 10,
   name: "Blue Jean Jacket",
   image:"https://i.ibb.co/mJS6vz0/blue-jean-jacket.png",
   price: 90,
   inCart:0
},
{
   id: 11,
   name: "Grey Jean Jacket",
   image:"https://i.ibb.co/N71k1ML/grey-jean-jacket.png",
   price: 90,
   inCart:0
},
{
   id: 12,
   name: "Brown Shearling",
   image:"https://i.ibb.co/s96FpdP/brown-shearling.png",
   price: 165,
   inCart:0
},
{
   id: 13,
   name: "Blue Tanktop",
   image:"https://i.ibb.co/7CQVJNm/blue-tank.png",	
   price: 25,
   inCart:0
},
{
   id: 14,
   name: "Floral Blouse",
   image:"https://i.ibb.co/4W2DGKm/floral-blouse.png",
   price: 20,
   inCart:0
},
{
   id: 15,
   name: "Floral Dress",
   image:"https://i.ibb.co/KV18Ysr/floral-skirt.png",				
   price: 80,
   inCart:0
},
{
   id: 16,
   name: "Red Dots Dress",
   image:"https://i.ibb.co/N3BN1bh/red-polka-dot-dress.png",
   price: 80,
   inCart:0
},
{
   id: 17,
   name: "Camo Down Vest",
   image:"https://i.ibb.co/xJS0T3Y/camo-vest.png",	
   price: 325,
   inCart:0
},
{
   id: 18,
   name: "Floral T-shirt",
   image:"https://i.ibb.co/qMQ75QZ/floral-shirt.png",				
   price: 20,
   inCart:0
},
{
   id: 19,
   name: "Black & White Longsleeve",
   image:"https://i.ibb.co/55z32tw/long-sleeve.png",			
   price: 25,
   inCart:0
},
{
   id: 20,
   name: "Pink T-shirt",
   image:"https://i.ibb.co/RvwnBL8/pink-shirt.png",		
   price: 25,
   inCart:0
}
];

for (let i = 0; i < addCart.length; i++){
    addCart[i].addEventListener("click", ()=>{
       cartNumbers(items[i]);
       totalCost(items[i])
  });
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers) {
        document.querySelector('.item-count').textContent = productNumbers;
    }
}

function cartNumbers(item, action) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    
    let cartItems = localStorage.getItem('itemsInCart');
    cartItems = JSON.parse(cartItems);
    
    if( action ) {
        localStorage.setItem('cartNumbers', productNumbers - 1);
        document.querySelector('.item-count').textContent = productNumbers - 1; 
    } else if ( productNumbers ){
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.item-count').textContent = productNumbers + 1; 
    } else {
        localStorage.setItem("cartNumbers", 1);
        document.querySelector('.item-count').textContent = 1;
    }

    setItems(item); 
}

function setItems(item) {
    let cartItems = localStorage.getItem('itemsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {

        if(cartItems[item.name] == undefined) {
            cartItems = {
                ...cartItems,
                [item.name]: item
            }
        }

        cartItems[item.name].inCart += 1;
    } else {
        item.inCart = 1;
        cartItems = {
            [item.name]: item
        }
    }

    localStorage.setItem("itemsInCart", JSON.stringify(cartItems));
}

function totalCost( itemCost, action) {
    
    let cartCost = localStorage.getItem('totalCost');

    if( action ) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost - itemCost.price)
    } else if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + itemCost.price); 
    } else {
        localStorage.setItem("totalCost", itemCost.price)
    }
}

function displayCart() {
    let cartItems = localStorage.getItem('itemsInCart');
    cartItems = JSON.parse(cartItems);

    let cartCost = localStorage.getItem('totalCost');
    cartCost = parseInt(cartCost);

    let output = document.querySelector('.output');

    if(cartItems && output) {
        output.innerHTML = '';
        Object.values(cartItems).map( (item, index) => {
            output.innerHTML += `
            <div class="checkout-item">
                 <div class="checkout-item-image">
                     <img width="100px" height="100px" src = "${item.image}" />
                 </div>
                 <div><span class="checkout-item-name">${item.name}</span></div>
                 <div><span class="quantity"><span class="decrease"><</span> <span class="value">${item.inCart}</span> <span class="increase">></span></span></div>
                 <div><span class="price">${item.price}</span></div>  
                 <span class="remove-button">✕</span>
            </div> </br>
            `
        
        });
        let y = localStorage.getItem("totalCost");
        document.getElementById('amount').innerText = y;
        deleteButtons();
        manageQuantity();
    }
};

function manageQuantity() {
    let decreaseButtons = document.querySelectorAll('.decrease');
    let increaseButtons = document.querySelectorAll('.increase');
    let currentQuantity = 0;
    let currentProduct = '';
    let cartItems = localStorage.getItem('itemsInCart');
    cartItems = JSON.parse(cartItems);

    for(let i=0; i < decreaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', () => {
            currentQuantity = decreaseButtons[i].parentElement.querySelector('.value').textContent;
            currentQuantity = parseInt(currentQuantity)
            currentProduct = decreaseButtons[i].parentElement.previousElementSibling.textContent;

            if( cartItems[currentProduct].inCart > 1 ) {
                cartItems[currentProduct].inCart -= 1;
                    if(cartItems[currentProduct].inCart == 0) {
                        delete decreaseButtons[i].parentElement.parentElement;
                    } else {
                        cartNumbers(cartItems[currentProduct], "decrease");
                    totalCost(cartItems[currentProduct], "decrease");
                    localStorage.setItem('itemsInCart', JSON.stringify(cartItems));
                    displayCart();
                    }

                
            }
            

        });

        increaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = increaseButtons[i].parentElement.querySelector('.value').textContent;
            currentQuantity = parseInt(currentQuantity)
            currentProduct = increaseButtons[i].parentElement.previousElementSibling.textContent;

            cartItems[currentProduct].inCart += 1;
            cartNumbers(cartItems[currentProduct]);
            totalCost(cartItems[currentProduct]);
            localStorage.setItem('itemsInCart', JSON.stringify(cartItems));
            displayCart();
        });
    }
}


function deleteButtons() {
    let deleteButtons = document.querySelectorAll('.remove-button');
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartCost = localStorage.getItem("totalCost");
    let cartItems = localStorage.getItem('itemsInCart');
    cartItems = JSON.parse(cartItems);
    let productName;

    for(let i=0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            productName = deleteButtons[i].parentElement.children[1].textContent;
            localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);
            localStorage.setItem('totalCost', cartCost - ( cartItems[productName].price * cartItems[productName].inCart));

            delete cartItems[productName];
            localStorage.setItem('itemsInCart', JSON.stringify(cartItems));

            displayCart();
            onLoadCartNumbers();
        })
    }
}


onLoadCartNumbers();
displayCart();





























// // let carts = document.querySelectorAll('.tocart');
// // 
// // let products = [
//     // {
//         // name : 'Zainny Palace',
//         // tag : 'zainny',
//         // price: 59,
//         // quantity : 0,
//     // },
//     // {
//         // name : 'Zainny Palace',
//         // tag : 'zainny',
//         // price: 59,
//         // quantity : 0,
//     // },
//     // {
//         // name : 'Zainny Palace',
//         // tag : 'zainny',
//         // price: 59,
//         // quantity : 0,
//     // },
// // ]
// // 
// // for(let i = 0; i < carts.length; i++){
//     // carts[i].addEventListener('click', ()=>{
//         // cartNumbers();
//         // console.log(cartNumbers)
//     // })
// // }
// // function onloadCartNumbers(){
//     // let productNumbers = localstorge.getItem('cartNumbers');
// // 
//     // if (productNumbers){
//         // document.querySelector('.cart span').textcontent = ProductNumbers;
//     // }
// // }
// // function cartNumbers(){
//     // let productNumbers = localStorage.getItem('cartNumbers');
//     // productNumbers = parseInt(productNumbers);
// // 
//     // if(productNumbers){
//         // localStorage.setItem('cartNumbers', productNumbers +1);
//         // document.querySelector('.cart span').textContent =productNumbers + 1;
//     // }else{
//         // localStorage.setItem('cartNumbers', 1);
//         // document.querySelector('.cart span').textContent +1;
//     // }
// // }
// // 
// // onloadCartNumbers();
// // 
// // 










// if (document.readyState == 'loading') {
//     document.addEventListener('DOMContentLoaded', ready)
// } else {
//     ready()
// }

// function ready() {
//     var removeCartItemButtons = document.getElementsByClassName('btn-danger')
//     for (var i = 0; i < removeCartItemButtons.length; i++) {
//         var button = removeCartItemButtons[i]
//         button.addEventListener('click', removeCartItem)
//     }

//     var quantityInputs = document.getElementsByClassName('cart-quantity-input')
//     for (var i = 0; i < quantityInputs.length; i++) {
//         var input = quantityInputs[i]
//         input.addEventListener('change', quantityChanged)
//     }

//     var addToCartButtons = document.getElementsByClassName('shop-item-button')
//     for (var i = 0; i < addToCartButtons.length; i++) {
//         var button = addToCartButtons[i]
//         button.addEventListener('click', addToCartClicked)
//     }

//     document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
// }

// function purchaseClicked() {
//     alert('Thank you for your purchase')
//     var cartItems = document.getElementsByClassName('cart-items')[0]
//     while (cartItems.hasChildNodes()) {
//         cartItems.removeChild(cartItems.firstChild)
//     }
//     updateCartTotal()
// }

// function removeCartItem(event) {
//     var buttonClicked = event.target
//     buttonClicked.parentElement.parentElement.remove()
//     updateCartTotal()
// }

// function quantityChanged(event) {
//     var input = event.target
//     if (isNaN(input.value) || input.value <= 0) {
//         input.value = 1
//     }
//     updateCartTotal()
// }

// function addToCartClicked(event) {
//     var button = event.target
//     var shopItem = button.parentElement.parentElement
//     var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
//     var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
//     var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
//     addItemToCart(title, price, imageSrc)
//     updateCartTotal()
// }

// function addItemToCart(title, price, imageSrc) {
//     var cartRow = document.createElement('div')
//     cartRow.classList.add('cart-row')
//     var cartItems = document.getElementsByClassName('cart-items')[0]
//     var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
//     for (var i = 0; i < cartItemNames.length; i++) {
//         if (cartItemNames[i].innerText == title) {
//             // alert('This item is already added to the cart')
//             return
//         }
//     }
//     var cartRowContents = `
//         <div class="cart-item cart-column">
//             <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
//             <span class="cart-item-title">${title}</span>
//         </div>
//         <span class="cart-price cart-column">${price}</span>
//         <div class="cart-quantity cart-column">
//             <input class="cart-quantity-input" type="number" value="1">
//             <button class="btn btn-danger" type="button">REMOVE</button>
//         </div>`
//     cartRow.innerHTML = cartRowContents
//     cartItems.append(cartRow)
//     cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
//     cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
// }

// function updateCartTotal() {
//     var cartItemContainer = document.getElementsByClassName('cart-items')[0]
//     var cartRows = cartItemContainer.getElementsByClassName('cart-row')
//     var total = 0
//     for (var i = 0; i < cartRows.length; i++) {
//         var cartRow = cartRows[i]
//         var priceElement = cartRow.getElementsByClassName('cart-price')[0]
//         var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
//         var price = parseFloat(priceElement.innerText.replace('$', ''))
//         var quantity = quantityElement.value
//         total = total + (price * quantity)
//     }
//     total = Math.round(total * 100) / 100
//     document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
// }


