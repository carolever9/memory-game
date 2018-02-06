/*
 * Create a list that holds all of your cards
 * Build card array holding the names of 16 cards.
 */
const cardArray = [
	'anchor', 'bolt', 'cube', 'diamond', 'paper-plane-o',
	'leaf', 'bicycle', 'bomb', 'diamond', 'paper-plane-o',
	'anchor', 'bolt', 'bomb', 'cube', 'bicycle', 'leaf'
];
const deckClass = $('.deck');
let xmin = 0;
let xsec = 0;

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
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function loadBoard(cardArray) {
	//Set board up for the start of a new game.
	//Change all classes back to .card
	//TODO: cleanup next 5 lines
	//var deckClass = $('.deck');
	var listTag1 = $('li');
	//var listTag = $(this).find('li');
	var iTag = $('i');
	var classMatch = $('.card.match');
	const classCard = $('.card');

	//Empty removes any previous card symbols
	$(".card").empty();
	$('li').removeClass('card match').addClass('card');
	$('li').removeClass('card open show').addClass('card');

	//For each card class add a child class using the shuffled card array
	classCard.each(function(index) {
		$( this ).addClass('fa fa-' + cardArray[index]);
		index++;
	//console.log("The board is set");
	})
}

//Add a timer function
/*
const input = {hours: 0, minutes: 0, seconds: 0};
let timestamp = new Date(input.hours, input.minutes, input.seconds);
var interval = 1;

setInterval(function () {
    timestamp = new Date(timestamp.getTime() + interval * 1000);     
    $('.countdown2').text(timestamp.getHours()+'h:'+
       timestamp.getMinutes()+'m:'+timestamp.getSeconds()+'s');
}, Math.abs(interval) * 1000);
*/
	//console.log("Time is: " + timestamp + timestamp.input.seconds);

//Add 2nd timer
let startTime = new Date();

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
setInterval(function() {   /// rundownTimer() {
	var xmin = 60;
	let xsec = 00;
	//for (let xmin = 10; xmin > 0; xmin = xmin - 1) {
		console.log("Count down is " + xmin);
		xmin = xmin - 1;
	//$('.timer').replaceWith(xmin + " : " + xsec);
		//	xsec--;
	}, 1000);
//}
 
function scoreDisplay(cardCounter) {
	const lastStar = $('.stars');
	//rundownTimer();
	//console.log("In function counter: " + counter);
	$('.moves').replaceWith('<span class="moves">' + cardCounter + '</span>');
	if (cardCounter == 1) {
			startTime = new Date();
			setInterval();
    }
		
	if (cardCounter == 7) {
		lastStar.children(':nth-last-child(1)').remove(); //remove first of three stars		
	}
	if (cardCounter == 9) {
		lastStar.children(':nth-last-child(1)').remove(); //remove second of three stars		
		clearInterval(myTimer);
	}
};		 
 
function showCard() {
	const openCards = [];
	let flipIt = 'test';
	let cardMatch = false;
	let matchedCards = [];
	let cardCounter = 0
	
	$(document).on('click', '.card:not(.match)', function() {	
		cardCounter += 1;
		//console.log("counter = " + cardCounter);
		scoreDisplay(cardCounter);
		$( this ).toggleClass('open show'); 
			flipIt = $( this ).attr('class');
		//setInterval(interval);	
	
		openCards.push(flipIt);
		//console.log(flipIt);
		if (openCards.length === 2) {
			//console.log(openCards[0]);
			cardMatch = compareCards(flipIt, openCards, cardMatch);
			if (cardMatch == true) {
				//console.log("TRUE");
				$(".open.show:not(.match)").addClass("match");
				openCards.forEach(function(word) {
					matchedCards.push(word);
					console.log("Show matches " + matchedCards);
					if (matchedCards.length === 4) {
						const endTime = new Date();
						console.log("END Time is: " + endTime);
						let elapsedTime = (endTime - startTime)/ 1000;
						xminutes = Math.floor(elapsedTime / 60);
						elapsedTime %= 60;
						xseconds = Math.floor(elapsedTime);
						alert("Good game! You're a winner! "+"Total time = " + xminutes + ":" + xseconds);
					}	
				});
			}	else {
				//console.log("FALSE");
					setTimeout(function() {
						$(".open:not(.match)").removeClass("open show");
					}, 1000);
			};	
				//Empty the array for player to try again.
				openCards.splice(0, 2);
		};
  });	
}

function compareCards(flipIt, openCards, cardMatch, matchedCards) {
	flipBack = $('.deck').children('class');
	if (openCards[0] === openCards[1]) {
		//console.log('Got a match');
		cardMatch = true;
	} else {
		//console.log('No match');
		cardMatch = false;
		};
	return cardMatch;
};

function startGame(){
	console.log("Let's flip some cards.");
	shuffle(cardArray);
	loadBoard(cardArray);
	console.log("Shuffled items: " + cardArray);
	showCard();
};

//Wait for html page to load before starting the game.
window.onload = function() {
	startGame();
};
//alert("Hello - see me");