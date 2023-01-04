////////////Setting Default cart and books list due to lack of backend!//////////////////////////


cart = {
    '1' : 0,
    '2' : 0,
    '3' : 0,
    '4' : 0
};

booList = {
    '1' : "The Brothers Karamazov",
    '2' : "The Gambler",
    '3' : "Notes From Underground",
    '4' : "Devils"
};


//////////////////////////////////////////////////////////////////////////////////////////////






localStorage.setItem('shoppingCart', JSON.stringify(cart));


ctaSubmit = document.getElementById('ctasubmit');
ctaEmail = document.getElementById('ctaemail');
body = document.getElementById('fordev');
menuButton = document.getElementById('menu');
menu = document.getElementById('menuactive');
cartButton = document.getElementById('cart');
cartBox = document.getElementById('cartactive');



////////////////////Event Listeners/////////////////

addToCartButton = document.getElementsByClassName('addto');
addToCartButton = [...addToCartButton];

menuLines = document.getElementsByClassName('menuline');
menuLines = [...menuLines];


cartButton.addEventListener('click', cartmodal);

menuButton.addEventListener('click', menutoggle);

ctaSubmit.addEventListener('click', subscribe);


menuLines.forEach(element => {
    element.addEventListener('click', menutoggle);
});


addToCartButton.forEach(el => {
    el.firstChild.addEventListener('click', addtocart);
});

//////////////////////////////////////////////////

cartOn = false;
menuOn = false;



///////////////// functions //////////////////////

function menutoggle(){
    
    if (menuOn){
        menu.style.display = "none";
        menuOn = false;
    }else{
        menu.style.display = "block";
        menuOn = true;
    }
}


function subscribe(){
    console.log(ctaEmail.value);
    isValid = ctaEmail.value.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (isValid){
        modalmessage('Thanks for subscribing to our newsletter!');
    }else{
        ctaEmail.value = "";
        ctaEmail.placeholder = "Maybe you should double-check your email!";
    }

    
}







function modalmessage(message){
    modal = document.createElement('div');
    modal.id = "modal";
    modal.style = 'position: absolute; height: 100%; width: 100%; z-index: 10; background-color: rgb(100,100,100,0.5); vertical-align: middle;';
    modalmessagebox = document.createElement('div');
    modalmessagebox.style = 'display: flex; position: absolute; top: 50%; left: 50%; margin: -50px 0 0 -150px ; width: 300px; height: 100px; background-color: white; text-align: center; vertical-align: middle;';
    modaltext = document.createElement('div');
    modaltext.style = 'align-self: center ;';
    modaltext.innerText = message;
    modalbutton = document.createElement('button');
    modalbutton.innerHTML = '<i class="fas fa-thumbs-up"></i>'
    modalbutton.style = 'position: relative; height: 20px; top: 50%; margin-top: -10px;';
    modalbutton.addEventListener('click', ()=>{modal.remove()});
    modalmessagebox.appendChild(modaltext);
    modalmessagebox.appendChild(modalbutton);
    modal.appendChild(modalmessagebox);
    body.prepend(modal);

}





function addtocart(e){
    
    theCart = JSON.parse(localStorage.shoppingCart);

    theCart[e.target.parentNode.parentNode.id]++;

    localStorage.setItem('shoppingCart', JSON.stringify(theCart));
    
}




function cartmodal(){
    alreadyShpped = false;
    
    theCart = JSON.parse(localStorage.shoppingCart);
    cartData = "";
    modal = document.createElement('div');
    modal.id = "modal";
    modal.style = 'position: absolute; height: 100%; width: 100%; z-index: 10; background-color: rgb(100,100,100,0.5); vertical-align: middle;';
    modalmessagebox = document.createElement('div');
    modalmessagebox.style =  'position: absolute; top: 50%; left: 50%; margin: -150px 0 0 -200px ; width: 400px; height: 300px; background-color: white; text-align: center; vertical-align: middle;';
    modalcart = document.createElement('div');
    modalcart.style = 'display: block; width: 100%;';
    
    Object.keys(theCart).forEach(el =>{
        
        if (theCart[el]>0){
            cartData += `<div class = 'cartline'><div class = 'cartitem'>${booList[el]}</div><div class = 'itemnumber'>${theCart[el]}</div><button id = '${el}' class = 'itemdelete' onclick=deleteitem(this)>X</button></div>`;
            alreadyShpped = true;
        }
    });

    cartData += `<button class="proceedbtn">Proceed to payment</button>`;
    modalcart.innerHTML = cartData;
    modalbutton = document.createElement('button');
    modalbutton.innerHTML = 'Continue Shopping'
    modalbutton.style = 'position: relative; height: 20px; top: 50%; margin-top: -10px;';
    modalbutton.addEventListener('click', ()=>{modal.remove()});
    modalmessagebox.appendChild(modalcart);
    modalmessagebox.appendChild(modalbutton);
    modal.appendChild(modalmessagebox);
    
    
    if (alreadyShpped){
        body.prepend(modal);    
    }
    
}

function deleteitem(e){
    theCart = JSON.parse(localStorage.shoppingCart);

    theCart[e.id] = 0;

    localStorage.setItem('shoppingCart', JSON.stringify(theCart));
    modal.remove();
}


