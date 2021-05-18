'use strict';

// var global
let attemptNum = 0;
let maxAttempts = 25;
let attemptNumEl = document.getElementById('attempts');
let products = [];
let productsImgNames = [];
let productssClicks = [];
let productssViews = [];

// creat OBJ

function ProductObj(productName) {

    // this.goatName = goatName.split('.')[0];
    this.productName = productName.split('.')[0];
    this.source = 'img/' + productName;
    this.clicks = 0;
    this.views = 0;
    products.push(this);
    productsImgNames.push(this.productName);
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
// finished compare the random Num for images

 // get the html img src and title
    leImg.setAttribute('src',products[leftImgNum].source);
    miImg.setAttribute('src',products[middleImgNum].source);
    riImg.setAttribute('src',products[rightImgNum].source);

    leImg.setAttribute('title',products[leftImgNum].source);
    miImg.setAttribute('title',products[middleImgNum].source);
    riImg.setAttribute('title',products[rightImgNum].source);

    // ++ to viwe 
    products[leftImgNum].views++ ;
    products[middleImgNum].views++ ;
    products[rightImgNum].views++ ;

    // change the attempt Num
    attemptNumEl.textContent = attemptNum;


}

getImg ();
// console.log(products);


// make image clickabl 

leImg.addEventListener('click',clickabl);
miImg.addEventListener('click',clickabl);
riImg.addEventListener('click',clickabl);

function clickabl(event){              // his function 

    attemptNum++;                              // attempt Num ++

    if(attemptNum <= maxAttempts){             // compare attempt Num with max attempt
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

// the Results
document.getElementById("Results-button").addEventListener('click',btnFunction);


function btnFunction(){                  // btn Function
    
    // let ulElement = document.getElementById('results');
    // let liEl ;



    // for (let i = 0; i < products.length; i++) {
    //     liEl = document.createElement('li');
    //     ulElement.appendChild(liEl);
    //     liEl.textContent = `${products[i].productName} had ${products[i].clicks} votes, and was seen ${products[i].views} times.`
    //     productssClicks.push(products[i].clicks);
    //     productssViews.push(products[i].views);

    
    // }
     
    
    renderOrders();
    settingItems();


    chartRender(); 
}

function renderOrders(){               // fill the li's
     let ulElement = document.getElementById('results');
       let liEl ;



   for (let i = 0; i < products.length; i++) {
     liEl = document.createElement('li');
     ulElement.appendChild(liEl);
     liEl.textContent = `${products[i].productName} had ${products[i].clicks} votes, and was seen ${products[i].views} times.`
     productssClicks.push(products[i].clicks);
     productssViews.push(products[i].views);


    } 
}



function settingItems() {                 // send data to the local

    let data = JSON.stringify(products);
    console.log(data)
    localStorage.setItem('product', data);     // key , value
}

function gettingItems() {                // re take data from local

    let stringObj = localStorage.getItem('product');
    // console.log(stringObj);
    let normalObj = JSON.parse(stringObj);
    // console.log(normalObj);
    if (normalObj !== null) {
        products = normalObj;
    }
    // renderOrders();         // if want keep the li's after refrash
}

// chart code 

function chartRender(){
    var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: productsImgNames,
        datasets: [{
            label: '# of Votes',
            data: productssClicks ,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)'

            ],
            borderWidth: 3
        },{
            label: '# of Viwes',
            data: productssViews ,
            backgroundColor: [
                'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
}

// //////////////////////////////////////////

gettingItems();

