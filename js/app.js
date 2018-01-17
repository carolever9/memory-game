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

function showCard() {
	const openCards = [];
	let flipIt = 'test';
	let cardMatch = false;
	let matchedCards = [];

	$('.card').click(function() {
		$( this ).toggleClass('open show');	
		flipIt = $( this ).attr('class');
		//$( this ).toggleClass('open show').delay(5000);  //not working
		function flip2Back() {
			console.log("now in flip2Back");
			flipIt = $( this ).removeClass('.card').addClass('match');
			console.log($( flipIt ).attr('class'));
		};
		setTimeout(flip2Back, 2000);  //still does not show 2nd card during this delay
		openCards.push(flipIt);
		console.log(flipIt);
		//TODO: remove FOR loop after testing
		openCards.forEach(function(word, num, all) {
			console.log("Show each " + openCards);
		});
		if (openCards.length === 2) {
			console.log(openCards[0]);
			cardMatch = compareCards(flipIt, openCards, cardMatch);
			console.log('2.To match or not ' + cardMatch);
			if (cardMatch == true) {
				console.log("TRUE");
				//$(flipIt).removeClass('open show').addClass('match');
				openCards.forEach(function(word) {
					matchedCards.push(word);
					console.log("Show matches " + matchedCards);
					if (matchedCards.length === 16) {
						alert("Good game! You're a winner!");
					}	
				});
			}	else {
				console.log("FALSE");
				alert("Not a match.");
				//alert("Not a match.").delay(5000); //gets property 'delay' undefined
				//deckClass.find().removeClass('open show');
				//$('li').removeClass('card open show').addClass('card');
			};
				//Empty the array for player to try again.
				openCards.splice(0, 2);
		};
  });	
}

function compareCards(flipIt, openCards, cardMatch, matchedCards) {
	//delay( 800 ); //did not work
	flipBack = $('.deck').children('class');
	//matchedCards = [];
	if (openCards[0] === openCards[1]) {
		$('.deck').find().removeClass('open show')
		$('.deck').find().addClass('match');
		//$(openCards[1]).removeClass('open.show').addClass('.match');
		console.log('Got a match');
		cardMatch = true;
	} else {
		console.log('No match' + flipBack);
		if (flipBack === 'card open show') {
			$( this ).removeClass('card open show').addClass('card');
		};
		deckClass.children().toggleClass('card'); //not working
		//deckClass.find().removeClass('open show');
		//$(openCards[0]).removeClass('open show');
		//$(openCards[1]).removeClass('open show');
		
		//$('li').removeClass('card open show').addClass('card');
		//$('li').removeClass('card.open.show').addClass('card');
		cardMatch = false;
		};
console.log('1.To match or not ' + cardMatch);
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