//Pick Up Deck and Cards 
let deck = document.getElementById('deck')
let cards = document.getElementsByClassName('card')
let selected =0
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
shuffle(cards)

deck.addEventListener('click',function(event){
    target = event.target
    if (target.className.includes('match'))
        return
    if(selected!=0)
        secondCard(target)              
    else
        firstCard(target)    
})

function firstCard(target){
    console.log(target,selected)
    console.log('1st card selected')
    target.className = 'card open show'   
    selected=target
}

function secondCard(target){
    console.log('2nd card selected')
    if(selected.innerHTML==target.innerHTML && selected!==target){
        console.log(target,selected)
        target.className= selected.className= 'card match show'
        console.log("Now Correctly matched!")
        selected=0;
    }
    else{
        selected.className=target.className='wrong show open card'
        setTimeout(() => {
            target.className='card'
            selected.className='card'
            console.log(target,selected)
            selected=0;
        }, 1000);
        console.log("Incorrect match")
    }
}

function match(target, selected){
}

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
