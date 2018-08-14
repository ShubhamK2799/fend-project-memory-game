//HTML Elements
let cards = document.getElementsByClassName('card');
let deck = document.getElementById('deck');
let starBox =document.getElementById('stars');
let minBox =document.getElementById('mins');
let secBox =document.getElementById('secs');
let movesBox = document.getElementById('moves');
let textBox = document.getElementById('text');
let commentBox=document.getElementById('comment');
let restartButton = document.getElementsByClassName('restart');
//Variables
// let rotateAnimation = 'rotate 0.3s';
let cardBackground = '#2e3d49';
let selected =[];
let pairedCard=0;
let moves = 0;
let matched =0;
let starRating = 5;
//Timer variables
let timer =-1;
let startingTime = 0;
let totalMins=0;
let totalSecs=0;

//Shuffling the cards
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex].innerHTML;
        array[currentIndex].innerHTML = array[randomIndex].innerHTML;
        array[randomIndex].innerHTML = temporaryValue;
    }
    // console.log(array);
    return array;
}

//Adding event to each card individually
function addEvents(){
    for(let i=0; i<cards.length;i++)
        cards[i].addEventListener('click',whenClicked);
}

function whenClicked(event){
   if (timer ==-1){
        startingTime =(new Date).getTime();
        timer = setInterval(function() {
            let now = (new Date).getTime();
            let delta = now-startingTime;
            // console.log(delta);
            totalMins = Math.floor(delta/(1000*60));
            totalSecs = Math.floor((delta%(60*1000))/1000); 
            minBox.innerHTML =totalMins;
            secBox.innerHTML =totalSecs;
        }, 1000);
    }

    target = event.target;
    // rotate(target);
    if(selected.length%2==0)
        firstCard(target);
    else
        secondCard(target);              
    console.log(selected)    
}


function getIndex(target){
    for (let i=0;i<selected.length;i++)
        if(selected[i].innerHTML==target.innerHTML)
            return i;
    return -1;        
}

function firstCard(target){
    updateScore();
    // console.log(target,selected)
    // console.log('1st card selected')
    target.className = 'card open show';
    selected.push(target);
}


function secondCard(target){
    if(target.className.includes('open')){
        target.className = 'card';
        // rotate(target);
        console.log('same selection')
        selected.splice(getIndex(target),1);
        return
    }
    console.log('2nd card selected');
    updateScore();

    let i = getIndex(target);
    pairedCard = selected[i];
    
    if(pairedCard!=-1){
        console.log(pairedCard)
        console.log("Now Correctly matched!");
        target.className=pairedCard.className='card show match';
        pairedCard.removeEventListener('click',whenClicked);
        target.removeEventListener('click',whenClicked);
        matched++;
        if(matched==8)
            winText();
        selected.splice();
        pairedCard=-1;
    }
    else{
        pairedCard=selected[selected.length-1];
        console.log(pairedCard)
        pairedCard.className=target.className='show open card';
        setTimeout(()=>{
            console.log('Wrong Selection, started shaking');
            target.classList.add('wrong');
            pairedCard.classList.add('wrong');
            setTimeout(() => {
                target.className='card';
                pairedCard.className='card';
                selected.pop(pairedCard);
            }, 300);
        },500);
    }
}
// function rotate(target){
//     target.style.animation= 'none';    
//     target.style.animation= rotateAnimation;        
// }

function updateScore(){
    moves++;
    movesBox.innerText=moves;
    if( moves <9 && moves%2==0){
        starBox.children[0].remove(); 
        starRating--;
        // console.log(moves)
    }
}
function winText(){
    commentBox.style.display='block';
    clearInterval(timer);
    textBox.innerHTML
        =`<p>Congratulations! You Did it!</p>
        <p>Moves :${moves}</p>
        <p>Star  :${starRating}</p>
        <p>Time  :${totalMins}m ${totalSecs}s</p>
        </p>Do you want to play again?</p>`;
}

restartButton[0].addEventListener('click',function(){
    location.reload(true);
})

restartButton[1].addEventListener('click',function(){
    location.reload(true);
})

//Run all the functions
shuffle(cards);
addEvents(cards);
