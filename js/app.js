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
let myStars = 3;
let xmin = 2;
let xsec = 59;
let startTime = new Date();
let timer = 0;
let text = document.getElementById('timer');

//Reload the game if button selected. Thanks w3schools.com and stackoverflow.com
// https://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_event_on
// https://stackoverflow.com/questions/3715047/how-to-reload-a-page-using-javascript
$(document).ready(function(){
    $("button").on("click", function() {
	console.log("The button was clicked.");
	window.location.reload(true);
    });
});

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
 
//Add a timer function. Many thanks to my mentor Kalindi for pointing out:
//https://stackoverflow.com/questions/37187504/javascript-second-counter/37187818 (1st solution)
//https://www.w3schools.com/jsref/met_win_clearinterval.asp (without any of the date part)

function rundownTimer() {
		console.log("Count down is " + xmin);
		xsec = xsec - 1;
		if (xsec == 0){
			xsec = 59;
			xmin = xmin - 1;
		}	
		text.innerText = xmin + ":" + xsec;
		if (xmin == -1) {
			clearInterval(timer);
			text.innerText = "00:00";
		}
}
 
function scoreDisplay(cardCounter) {
	const lastStar = $('.stars');
	//rundownTimer();
	console.log("myStars counter: " + myStars);
	$('.moves').replaceWith('<span class="moves">' + cardCounter + '</span>');
	if (cardCounter == 1) {
			startTime = new Date();
			timer = setInterval(function(){rundownTimer() }, 1000);
			//let timer = setInterval(rundownTimer, 1000);
    }
		
	if (cardCounter == 7) {
		myStars = myStars - 1;
		
		lastStar.children(':nth-last-child(1)').remove(); //remove first of three stars		
	}
	if (cardCounter == 9) {
		myStars = myStars - 1;
		lastStar.children(':nth-last-child(1)').remove(); //remove second of three stars		
		clearInterval(timer);
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
					if (matchedCards.length === 2) {
						clearInterval(timer);
						const endTime = new Date();
						//clearInterval(timer);
						console.log("END Time is: " + endTime);
						let elapsedTime = (endTime - startTime)/ 1000;
						xminutes = Math.floor(elapsedTime / 60);
						elapsedTime %= 60;
						xseconds = Math.floor(elapsedTime);
						gameWinner(myStars, cardCounter, xminutes, xseconds);
						//alert("Good game! You're a winner! "+"Total time = " + xminutes + ":" + xseconds);
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


function gameWinner(myStars, cardCounter, xminutes, xseconds) {
	divModal = $(".modal-content").children('p');
	console.log("Minutes handed = " + xminutes + " Seconds handed = " + xseconds);
	//newStats = ("<p>Total Stars = </p>" + myStars);
	newStats = $("<br><span>Accomplished in </span>" + cardCounter + "<span> moves, giving </span>" + myStars + "<span> star(s).</span>");
	timeStats = $("<br><span>All done in </span>" + xminutes + "<span> minutes and </span>" + xseconds + "<span> seconds.</span>");
	//divModal.append(newStats, timeStats);
	playAgain = $("<br><span>Would you like to play again? </span><button id="myBtn">YES!</button>"); 
	divModal.append(newStats, timeStats, playAgain);
	modal.style.display = "block";
	
	};

//Thanks for major coding for modal goes to w3schools: https://www.w3schools.com/howto/howto_css_modals.asp
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
} 

//Wait for html page to load before starting the game.
window.onload = function() {
	startGame();
};
//alert("Hello - see me");