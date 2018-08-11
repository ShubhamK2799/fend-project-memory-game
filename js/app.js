//Pick Up Deck and Cards 
let deck = document.getElementById('deck')
let cards = document.getElementsByClassName('card')
let selected =0
let moves = 5;
let matched =0 ;
let stars =document.getElementById('stars')
let shakeAnimation =  'shake 0.3s cubic-bezier(.36,.07,.19,.97) both'
let rotateAnimation = 'rotate 0.3s'
let cardBackground = '#2e3d49'
let movesBox = document.getElementById('moves')
let textBox = document.getElementById('text')
let commentBox=document.getElementById('comment')
let restartButton = document.getElementsByClassName('restart')
console.log(deck,cards)

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex].innerHTML;
        array[currentIndex].innerHTML = array[randomIndex].innerHTML;
        array[randomIndex].innerHTML = temporaryValue;
    }
    console.log(array)
    return array;
    //SWAPPING OF THE INNER CONTENT IS ALLOWED BUT SWAPPING FULL HTML ELEMENT IS NOT ALLOWED!
}

//Event delegations will not work
//cards.forEach(function (element){ its not an array
//cards[i].addEventListener('click',whenClicked(i))

function addEvents(){
    for(var i=0; i<cards.length;i++)
        cards[i].addEventListener('click',whenClicked) 
    // just a function name, pass no parameters otherwise it will be run at the time it is added
}
function whenClicked(event){
    target = event.target
    if(selected!=0)
        secondCard(target)              
    else{
        firstCard(target)
        selected=target
    }    
}

function firstCard(target){
    // console.log(target,selected)
    console.log('1st card selected')
    target.className = 'card open show'
}

function secondCard(target){
    if(target.className.includes('open')){
        target.className = 'card'
        console.log('same selection')
        selected=0;
        return
    }
    console.log('2nd card selected')
    if(selected.innerHTML==target.innerHTML){
        target.className=selected.className='card show match'
        selected.removeEventListener('click',whenClicked)
        target.removeEventListener('click',whenClicked)
        matched++;
        if(matched==8)
            winText()
        selected=0;
        rotate(target)
        console.log("Now Correctly matched!")
    }
    else{
        if(moves==0){
            gameOver();
            return;
        }
        selected.className=target.className='show open card'
        setTimeout(()=>{
            console.log('started shaking')
            target.classList.add('wrong')
            selected.classList.add('wrong')
            setTimeout(() => {
                target.className='card'
                selected.className='card'
                selected=0;
            }, 300);
        },300);
        console.log("Incorrect match")
        moves--;
        updateScore()
    }
}

function shake(target){
    selected.style.animation= 'none'
    target.style.animation= 'none'    
    selected.style.animation= shakeAnimation
    target.style.animation= shakeAnimation        
    selected.style.background='red'
    target.style.background='red'
}
function rotate(target){
    target.style.animation= 'none'    
    target.style.animation= rotateAnimation        
}

function updateScore(){
    movesBox.innerText=moves
    stars.children[moves].remove()
}
function winText(){
    commentBox.style.display='block'
    textBox.innerHTML='Congratulation! You Won!<p>Do you want to play again?</p>'
}
function gameOver(){
    commentBox.style.display='block'
    textBox.innerText='Game Over! Do you want to try again?'
    for(var i=0; i<cards.length;i++)
        cards[i].removeEventListener('click',whenClicked)
}

restartButton[0].addEventListener('click',function(){
    location.reload(true)
})
restartButton[1].addEventListener('click',function(){
location.reload(true)
})

//Run all the functions
shuffle(cards)
addEvents(cards)
