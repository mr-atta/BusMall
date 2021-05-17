'use strict';

// var global
let attemptNum = 0;
let maxAttempts = 25;
let attemptNumEl = document.getElementById('attempts');
let products = [];

// creat OBJ

function ProductObj(productName) {

    // this.goatName = goatName.split('.')[0];
    this.productName = productName.split('.')[0];
    this.source = 'img/' + productName;
    this.clicks = 0;
    this.views = 0;
    products.push(this);
}

let productImsge = ['bag.jpg','banana.jpg','bathroom.jpg','boots.jpg','breakfast.jpg','bubblegum.jpg','chair.jpg','cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','water-can.jpg','wine-glass.jpg']

for (let index = 0; index < productImsge.length; index++) {
    new ProductObj (productImsge[index]);
}

//  products Array is full now 

//  Random fun

function randomNum () {
  // random image from 0 to 18 products.length (19)
  return Math.floor(Math.random() * products.length);
}

// get the img html 

let leImg = document.getElementById('leftImg');
let miImg = document.getElementById('middleImg');
let riImg = document.getElementById('rightImg');

// globle var

let leftImgNum;
let middleImgNum;
let rightImgNum;

// get the html img value

function getImg (){
    leftImgNum = randomNum () ;
    middleImgNum = randomNum () ;
    rightImgNum = randomNum () ;

//  don't repeat the images

while (leftImgNum === middleImgNum || middleImgNum === rightImgNum || leftImgNum === rightImgNum){
    leftImgNum = randomNum () ;
    rightImgNum = randomNum () ;
}

    leImg.setAttribute('src',products[leftImgNum].source);
    miImg.setAttribute('src',products[middleImgNum].source);
    riImg.setAttribute('src',products[rightImgNum].source);

    leImg.setAttribute('title',products[leftImgNum].source);
    miImg.setAttribute('title',products[middleImgNum].source);
    riImg.setAttribute('title',products[rightImgNum].source);

    products[leftImgNum].views++ ;
    products[middleImgNum].views++ ;
    products[rightImgNum].views++ ;

    attemptNumEl.textContent = attemptNum;


}




// while (leftImgNum === middleImgNum){
//     leftImgNum = randomNum () ;
// }
// while (middleImgNum === rightImgNum){
//     rightImgNum = randomNum () ;
// }
// while (rightImgNum === leftImgNum){
//     rightImgNum = randomNum () ;
// }

getImg ();
console.log(products);

// make image clickabl

leImg.addEventListener('click',clickabl);
miImg.addEventListener('click',clickabl);
riImg.addEventListener('click',clickabl);

function clickabl(event){
    attemptNum++;

    if(attemptNum <= maxAttempts){
        if(event.target.id === 'leftImg'){
            products[leftImgNum].clicks++ ;
        }else if(event.target.id === 'middleImg'){
            products[middleImgNum].clicks++ ;
        }else if(event.target.id === 'rightImg'){
             products[rightImgNum].clicks++ ;
        }
        getImg ();
    }else if (attemptNum > maxAttempts){
        
     leImg.removeEventListener('click',clickabl);
     miImg.removeEventListener('click',clickabl);
     riImg.removeEventListener('click',clickabl);
    }

        
}

document.getElementById("Results-button").addEventListener('click',btnFunction);


function btnFunction(){
    
  console.log('hello')
    let ulElement = document.getElementById('results');
    let liEl ;
    for (let i = 0; i < products.length; i++) {
        liEl = document.createElement('li');
        ulElement.appendChild(liEl);
        liEl.textContent = `${products[i].productName} had ${products[i].clicks} votes, and was seen ${products[i].views} times.`
    } 
}
