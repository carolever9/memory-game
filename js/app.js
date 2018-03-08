/**
 * Memory Game - edition by C.Everett
 * Build card array holding the names of 16 cards.
 */
const cardArray = [
    'anchor',
    'bolt',
    'cube',
    'diamond',
    'paper-plane-o',
    'leaf',
    'bicycle',
    'bomb',
    'diamond',
    'paper-plane-o',
    'anchor',
    'bolt',
    'bomb',
    'cube',
    'bicycle',
    'leaf'
];
/**
 * Create global variables
 * myStars - is used in scoreDisplay() to keep track of how many stars to display as a rating
 * xmin - tracks minutes used in rundownTimer() global to run time throughout play
 * xsec - tracks seconds used in rundownTimer(), global to run time throughout play
 * startTime - uses js Date() function, puts a time stamp when the first card is clicked and play begins and again to calculate total play time
 * timerText - repeatedly inserts the text needed in the html code to continually display the time in rundownTimer()
 * modal - get the modal for displaying end of game statics
 * span - get the <span> element that closes the modal
 */

let myStars = 3;
let xmin = 2;
let xsec = 59;
let startTime = new Date();
let timer = 0;
let timerText = document.getElementById('timer');
const modal = document.getElementById('myModal');
const span = document.getElementsByClassName("close")[0];

/**
 * Reload the game if Refresh button selected. Thanks w3schools.com and stackoverflow.com
 * https://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_event_on
 * https://stackoverflow.com/questions/3715047/how-to-reload-a-page-using-javascript
 */
$(document).ready(function(){
    $("button").on("click", function() {
    window.location.reload(true);
    });
});


/**
 * @description Shuffle the list of cards using the Udacity provided "shuffle" method
 * Shuffle function from http://stackoverflow.com/a/2450976
 * @param {array} array for the cardArray
 * @returns {array} the new shuffled card array
 * Variable 
 * currentIndex - stores the array length, each card value, and a random index used to shuffle
 */

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}


/**
 * @description Set game board up for the start of a new game, display cards on the page
 *   - add each card's HTML to the page
 * @constructor
 * @param {array} cardArray - loop through each card and create its HTML
 */
function loadBoard(cardArray) {
    /**Change all classes back to .card*/
    const classCard = $('.card');

    /**Empty removes any previous card symbols*/
    $(".card").empty();
    $('li').removeClass('card match').addClass('card');
    $('li').removeClass('card open show').addClass('card');

    /**For each card class add a child class using the shuffled card array*/
    classCard.each(function(index) {
        //$( this ).addClass('fa fa-' + cardArray[index]);
        $( this ).addClass(cardArray[index] + index + ' fa fa-' + cardArray[index]);
        index++;
    })
}


/**
 * @description Add a timer displayed on the page that counts down player time
 * Variables 
 * xmin - tracks minutes used in rundownTimer() global to run time throughout play
 * xsec - tracks seconds used in rundownTimer() global to run time throughout play
 * timerText - repeatedly inserts the text needed in the html code to continually display the time as time runs down
 * Many thanks to mentor Kalindi for pointing out:
 * https://stackoverflow.com/questions/37187504/javascript-second-counter/37187818 (1st solution - adapted to count backwards)
 * https://www.w3schools.com/jsref/met_win_clearinterval.asp (without any of the date part)
 */
function rundownTimer() {
    xsec = xsec - 1;
    /**Reset the seconds with each new minute*/
    if (xsec == 0){
        xsec = 59;
        xmin = xmin - 1;
    }
    timerText.innerText = xmin + ":" + xsec;
    /**After the time on the clock, xmin and xsec, runs out the time shows zero*/
    if (xmin == -1) {
        clearInterval(timer);
        timerText.innerText = "00:00";
    }
}


/**
 * @description Update the score criteria on the page as the game is played
 * @param cardCounter is passed in tracking the number of cards clicked so far and used to determine star rating
 * Keep the game page updated with star rating: from 3 down to 1 stars
 * Start the rundownTimer when first card is clicked and store the startTime
 * Increment the number of moves counter and display it on the page
 * Variables 
 * lastStar - used to remove star symbols from the page as total of moves increases
 * myStars - used in scoreDisplay() to keep track of how many stars to display as a rating
 */

function scoreDisplay(cardCounter) {
    const lastStar = $('.stars');
    /**Display number of moves each time a card is clicked*/
    $('.moves').replaceWith('<span class="moves">' + cardCounter + '</span>');
    /**Start the timer once first card is clicked*/
    if (cardCounter == 1) {
        startTime = new Date();
        /**Uses milliseconds for each second, padded 20ms to track closer to calculated finish time*/
        timer = setInterval(function(){rundownTimer() }, 1020);
    }

    if (cardCounter == 22) {
        myStars = myStars - 1;
        lastStar.children(':nth-last-child(1)').remove(); //remove first of three stars
    }
    if (cardCounter == 34) {
        myStars = myStars - 1;
        lastStar.children(':nth-last-child(1)').remove(); //remove second of three stars
    }
};


/**
 * @description Set up the event listener for a card. When a card is clicked:
 *  - display the card's symbol
 *  - add the card to a *list* of "open" cards
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol
 *    + if all cards have matched, display a message with the final score
 * Many thanks to Luiz Felipe F for advice on this section
 * Variables
 * openCards - creates an array of two cards at a time to check if they match
 * flipIt - temporarily store the class of a card and add it to the openCards array
 * cardMatch - boolean if true change the card class to .match, if false change back to card class
 * matchedCards - array stores all matched cards, once all 16 then launch game winner function
 * cardCounter - store how many times cards are clicked
 * startTime - time stamp from first card clicked
 * endTime - time stamp from last card once all match
 * elapsedTime - subtract startTime from endTime for total seconds then calculate time into minutes and seconds
 * active - To slow down clicking to fast that overrides the games ability
 *     Thanks https://stackoverflow.com/questions/32342175/jquery-for-simple-horizontal-slider/32343478#32343478
 *     Many many thanks to James Tench for suggests to get it working in this application
 */

function showCard() {
    const openCards = [];
    let active = false;
    let flipIt = 'test';
    let cardMatch = false;
    let matchedCards = [];
    let cardCounter = 0;

    /**Always check that class .match is not part of the cards class, then display it*/
    if (active === false) {
        $(document).on('click', '.card:not(.match)', function() {
            if (active == true) {
                return;
            }
            active = true;

            $( this ).toggleClass('open show');
            flipIt = $( this ).attr('class');
            cardCounter += 1;
            scoreDisplay(cardCounter);
            cardMatch = compareCards(flipIt, openCards, cardMatch);

        /**When there are 3 cards remove last*/
        if (openCards.length >= 3) {
            openCards[2].removeClass("open show");
        }   else if (openCards.length === 2) {

            if (cardMatch == false) {
                /**Cards don't match, after 500 milliseconds hide card face, return it to selectable cards
                 * Many thanks to mentor Luiz Felipe F
                 */
                    setTimeout(function() {
                    $(".open:not(.match)").removeClass("open show");
                    }, 500);
            }   else if (cardMatch == true) {
                /**When cards match change class so they can't be clicked again*/
                $(".open.show:not(.match)").addClass("match");
                openCards.forEach(function(word) {
                    matchedCards.push(word);

                    /** When all 16 cards are matched stop the timer, calculate time it took, and send info to gameWinner()*/
                    if (matchedCards.length === 16) {
                        clearInterval(timer);
                        const endTime = new Date();
                        let elapsedTime = (endTime - startTime)/ 1000;
                        xminutes = Math.floor(elapsedTime / 60);
                        elapsedTime %= 60;
                        xseconds = Math.floor(elapsedTime);
                        gameWinner(myStars, cardCounter, xminutes, xseconds);
                    }
                });
            };
            /**Empty the array for player to try to match two more cards*/
            openCards.splice(0, 2);
        }
        active = false;
    });
}};


/**
 * @description
 * @param {array} openCards check both cards are a match
 * @param {boolean} cardMatch store the result
 * @returns {boolean} cardMatch
 */

function compareCards(flipIt, openCards, cardMatch) {
    console.log(flipIt);
    let newArray = flipIt.split(' ');
    let idValue = newArray[1];
    let nameValue = newArray[3];
    openCards.push({idValue, nameValue });
        if (openCards.length === 2) {
            let symbol1 = openCards[0].idValue;
            let symbol2 = openCards[1].idValue;
            let name1 = openCards[0].nameValue;
            let name2 = openCards[1].nameValue;
            console.log("symbol1 = " + symbol1 + " symbol2 = " + symbol2);

            if (symbol1 == symbol2) {
                /** Symbols should not match, if they do then same card was clicked twice*/
                cardMatch = false;
                console.log(cardMatch);
            }   else if (symbol1 != symbol2) {
                /** Then check card name for match*/
                if (name1 == name2) {
                    cardMatch = true;
                    console.log("names s/b T = " + cardMatch);
                }   else {
                    cardMatch = false;
                    console.log("names s/b F = " + cardMatch);
                }
            }
        };
    return cardMatch;
};


/**
 * Thanks for major coding for modal goes to w3schools, adapted for this use
 * https://www.w3schools.com/howto/howto_css_modals.asp (button to display it removed)
 * @description Display a modal when all 16 cards are matched, include number of moves it took, star rating, play time
 *   - ask if player would like to play again with a button labeled Yes!
 *   - if not playing again user can click on x or anywhere else to close modal
 * @param {} myStars is the final star count earned depending on number of moves
 * @param {} cardCounter is the total number of cards clicked on to find all the matching cards
 * @param {} xminutes is the total minutes of play time for this round
 * @param {} xseconds is the total seconds of play time for this round
 * Variables
 * modal - Get the modal
 * span - Get the <span> element that closes the modal
 * btn - stores the myBtn html id
 * divModal - identifies the html class .modal-content for children <p> tag
 * newStats - gather the final cardCounter and myStar rating to display in modal
 * timeStats - gather final xminutes and xseconds to display in modal the time it took to play this game
 * playAgain - ask user if they'd like to play again. The myBtn will reload the game board if clicked
 */

function gameWinner(myStars, cardCounter, xminutes, xseconds) {
    divModal = $(".modal-content").children('p');
    /** Load the variables with html tags and final stats to be displayed in the modal*/
    newStats = $("<br><span>Accomplished in </span>" + cardCounter + "<span> moves, earning </span>" + myStars + "<span> star(s).</span>");
    timeStats = $("<br><span>Your time was: </span>" + xminutes + "<span> minutes and </span>" + xseconds + "<span> seconds.</span>");
    playAgain = $('<br><span>Would you like to play again? </span><button id="myBtn">YES!</button>');
    /** Append to the modal html the final stats for number of moves, star rating, the total minutes and secods it took, and ask if they'd like to play again*/
    divModal.append(newStats, timeStats, playAgain);
    modal.style.display = "block";
    /** Variable btn needs positioned here or it causes an error..just saying*/
    const btn = document.getElementById("myBtn");

    /** When the user clicks on <span> (x), close the modal*/
    span.onclick = function() {
    modal.style.display = "none";
    }

    /** When the user clicks anywhere outside of the modal, close it*/
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

    /** When the user clicks on the myBtn [Yes!], the play again button, restart the game*/
    btn.onclick = function() {
        window.location.reload(true);
    }
};


/**
 * @description Call the main functions to set up the game, after the html page loads set up the game
 * cardArray passed to shuffle(), give the cards a new shuffle each time
 * cardArray passed to loadBoard(), loads/displays these cards on the game board
 * In showCard() start event listener for the first card to be clicked by the player
 */

function startGame(){
    console.log("Let's flip some cards.");
    shuffle(cardArray);
    loadBoard(cardArray);
    console.log("Shuffled items: " + cardArray);
    showCard();
};
/** Wait for html page to load before starting the game*/
window.onload = function() {
    startGame();
};