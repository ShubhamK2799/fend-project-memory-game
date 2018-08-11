//Pick Up Deck and Cards 
let deck = document.getElementById('deck')
let cards = document.getElementsByClassName('card')
let selected =0
let moves = 5;
let movesBox = document.getElementById('moves')
let textBox = document.getElementById('text')
let commentBox=document.getElementById('comment')
let restartButton = document.getElementsByClassName('restart')
console.log(deck,cards)

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976

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

for(var i=0; i<cards.length;i++)
    cards[i].addEventListener('click',whenClicked) // just a function name, pass no parameters otherwise it will be run at the time it is added

function whenClicked(event){
    target = event.target
    if (target.className.includes('match'))
        return
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
    // same selection
    if(target.className.includes('open')){
        target.className = 'card'
        selected=0;
        return
    }
    console.log('2nd card selected')
    if(selected.innerHTML==target.innerHTML){
        console.log(target,selected)
        target.className=selected.className='card show match'
        selected=0;
        // console.log("Now Correctly matched!")
    }
    else{
        if(moves==0){
            gameOver();
            return;
        }
        selected.className=target.className='wrong show open card'
        setTimeout(() => {
            target.className='card'
            selected.className='card'
            console.log(target,selected)
            selected=0;
        }, 1000);
        console.log("Incorrect match")
        moves--;
        updateScore()
    }
}

function updateScore(){
    movesBox.innerText=moves;
}
function gameOver(){
    commentBox.style.display='block'
    textBox.innerText='Game Over! Better Luck Next Time'
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
// addEvents(cards)
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
