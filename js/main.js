///////////////////////////////////////////Setting localStorage/////////////////////////////////////
var ownLocalStorage = localStorage.getItem('colors-option');
    

if(ownLocalStorage !== null){
    document.documentElement.style.setProperty('--changing-color',ownLocalStorage);
    document.querySelectorAll('.select-box .box .colors span').forEach(clr =>{
        clr.classList.remove('active');

        if(clr.dataset.color === ownLocalStorage){
            clr.classList.add('active')
        } 
    });
}

/////////////////////////////////////////// Starting Select-box/////////////////////////////////////

//Box Settings Section
var getIcon = document.querySelector('.select-box .icons'),
    rightIcon = document.querySelector('.select-box i.right'),
    leftIcon = document.querySelector('.select-box i.left'),
    getBox = document.querySelector('.select-box');

getIcon.onclick = function(){
     getBox.classList.toggle('opened');
     toggling();                                        
}

function toggling(){
    if(getBox.classList.contains('opened')){
        rightIcon.classList.add('hide');
        leftIcon.classList.remove('hide')
    }
    else{leftIcon.classList.add('hide')
         rightIcon.classList.remove('hide');} 
}


///////////////////////////////////////////// Changing Page Color/////////////////////////////////////
var colorsSpan = document.querySelectorAll('.select-box .box .colors span');
    Pagebody = document.querySelector('body'),
    illustration = document.querySelector('.about-us .right img'),
    ownAnimation = localStorage.getItem('animation-option'),
    index = [1,2,3,4];
  
//Removing active classes function
let RemoveActiveClasses = (obj) => {
    for(i=0;i<obj.length;i++){
       if(obj[i].classList.contains('active')){
           obj[i].classList.remove('active')
       }
    } 
}
for(i=0;i<colorsSpan.length;i++){
    colorsSpan[i].onclick = function(){
        RemoveActiveClasses(colorsSpan);
        this.classList.add('active');
        document.documentElement.style.setProperty('--changing-color',this.dataset.color)
            if(this.classList.contains('one')){
                illustration.src = `images/image${index[0]}.png`
            }
            else if(this.classList.contains('two')){
                illustration.src = `images/image${index[1]}.png`
            }
            else if(this.classList.contains('three')){
                illustration.src = `images/image${index[2]}.png`
            }
            else{
                illustration.src = `images/image${index[3]}.png`
            }
         localStorage.setItem('colors-option',this.dataset.color) ; 
         localStorage.setItem('animation-option',illustration.src) ;
    }
}
if(ownAnimation !== null){
    illustration.src = ownAnimation;
}
/////////////////////////////////////////////Changing Header background/////////////////////////////////////////
var myHeader = document.querySelector('.Header'),
    imgArr = [1,2,3,4,5],
    mainLinks = document.querySelectorAll('.container ul li a'),
    onBut = document.querySelector('.select-box .random .on'),
    offBut = document.querySelector('.select-box .random .off'),
    arrowIcon = document.querySelector('.select-box .random .collect i'),
    bgOptions = true,
    theInter,
    i;
//localStorage background
var mainImg = localStorage.getItem('images-option');
if(mainImg !== null){
    if(mainImg === 'true'){
        bgOptions = true;

    }else{
        bgOptions = false;
    }
    
   document.querySelectorAll('.select-box .random span').forEach(element =>{
       element.classList.remove('active')
       if(bgOptions === true){
           onBut.classList.add('active')
       }else
       {offBut.classList.add('active')
        arrowIcon.classList.add('rotate')
        }
   })
}

//Setting changeable backgrounds
function ActiveClasses(){
    if(bgOptions === true){
        theInter = setInterval(() => {
            myHeader.style.backgroundImage = `url(/images/${Math.floor(Math.random()*imgArr.length)}.jpg`
        },2000);
    }
}
//Turning on changeable background option
onBut.onclick = function(){
    this.classList.add('active');
    offBut.classList.remove('active');
    bgOptions = true;
    arrowIcon.classList.remove('rotate');
    ActiveClasses();
    localStorage.setItem('images-option',true)
}

//Turning off changeable background option
offBut.onclick = function(){
    this.classList.add('active');
    onBut.classList.remove('active');
    bgOptions = false;
    arrowIcon.classList.add('rotate');
    clearInterval(theInter);
    localStorage.setItem('images-option',false)
}
ActiveClasses();




//For Navbar
for(i=0;i<mainLinks.length;i++){
 mainLinks[i].onclick = function(){
  RemoveActiveClasses(mainLinks);
   this.classList.add('active');
   let myelm = document.querySelector(this.dataset.section);
     window.scrollTo(0,myelm.offsetTop)
}
}

//handling onloading functions
let skillsSection = document.querySelector('.skills'),
    offTop = skillsSection.offsetTop,
    sectionHeight = skillsSection.offsetHeight,
    Times = document.querySelectorAll('.skills .main span time'),
    getSpan = document.querySelectorAll('.skills .main span');

window.onscroll = function(){

if (this.pageYOffset > offTop + sectionHeight - this.innerHeight) {

   for(i=0;i<getSpan.length;i++){
       getSpan[i].style.width = getSpan[i].dataset.progress;
       Times[i].innerHTML = getSpan[i].dataset.progress
   }
}

//resseting active class on home link
if(window.pageYOffset === 0){
    RemoveActiveClasses(mainLinks);
    mainLinks[0].classList.add('active');
}
}


/////////////////////////////////////////////Products Section/////////////////////////////////////////
let ourProducts = document.querySelectorAll('.products .products-box img'),
    ourSelections = document.querySelector('.products .products-box'),
    arr = Array.from(ourSelections.children);
 for(i=0;i<ourProducts.length;i++){
    ourProducts[i].onclick = function(){
        
     let layOut = document.createElement('div'),
           elements = document.createElement('div'),
           productTitle = document.createElement('h3'),
           productText = document.createTextNode(`Product #${this.dataset.number}`)
           closeIcon = document.createElement('i'),
           layer1 = document.createElement('div'),
           imageOfProduct = document.createElement('img');

    layOut.className = 'popup';
    elements.className = 'all-elements';
    productTitle.appendChild(productText);
    closeIcon.className = 'fa fa-times';
    layer1.className = 'layer1';
    layer1.appendChild(imageOfProduct);
    imageOfProduct.src = `images/pic${this.dataset.number}.jpg`;


     elements.appendChild(productTitle);
     elements.appendChild(closeIcon);
     elements.appendChild(layer1);
     layOut.appendChild(elements);
     document.body.appendChild(layOut)
     
    //make the close icon
       closeIcon.onclick = function(){
        document.body.removeChild(layOut)
       }
    }
}
//resetting page
document.querySelector('.reset').onclick = function(){

    localStorage.removeItem('colors-option');
    localStorage.removeItem('animation-option');
    localStorage.removeItem('images-option');
    window.location.reload();
}

//Responsive
let menu_bar = document.querySelector('.ul-container ul'),
    menu_bar_icon = document.querySelector('.container i');

menu_bar_icon.onclick = function(){
   this.classList.toggle('active');
   menu_bar.classList.toggle('open')
}

//closing menu bar when clicking anywhere in the page

document.addEventListener('click',(e) => {
       if(e.target !== menu_bar_icon && e.target !==menu_bar){
           if(menu_bar.classList.contains('open')){
            menu_bar_icon.classList.toggle('active');
            menu_bar.classList.toggle('open');
           }
       }
})