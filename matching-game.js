	var tilesDouble = [];
	var tilesRandom = [];
	var tiles = [];	
	var tileSrc = [];
	var element = 0;
	var data = [];
	var winner;
function main() {
	data = JSON.parse(json);
	populateTable();

}

function populateTable() {
	
	$("#notification").html("Match all the tiles to win");
	winner = 0;
	
	// Clear all array data from previous game
	for(var i = 0; i < 20; i++){
		tilesDouble[i] = null;
		tilesRandom[i] = null;
		tiles[i] = null;
	}
	
	// Creates array of random image pairs
	var i = 0;
	while (i < 20){
		element = Math.floor( Math.random() * 50 );
		if ( element != 11 ) 
		if ( !tilesDouble.includes( element ) ) {
			tilesDouble[i] = element;
			tilesDouble[i + 1] = element;
			i+=2;
		}
	}
	
	// Create random set of index values
	i = 0;
	while (i < 20){
		element = Math.floor( Math.random() * 20 );
		if ( !tilesRandom.includes( element )) {
			tilesRandom[i] = element;
			i++;
		}
	}
	
	// Assign images to each random image index
	for (var i = 0; i < tilesDouble.length; i++) {
			tiles[tilesRandom[i]] = tilesDouble[i];
	}
	
	// Assign src value to each image from image array
	for(var i = 0; i < tiles.length; i++) {
		tileSrc[i] = data.products[tiles[i]].images[0].src;
	}
	
	// Set each image tile to defaul game start
	for(var i = 0; i < tileSrc.length; i++) {
		$("#i" + i).attr("src", "match-foreground.png");
		$("#tile-" + i).css({"background-color":"rgb(0,255,0)"});
	}	
	
	// Create a counter with each value initialized to zero
	for(var i = 0; i < 20; i++){
		counter[i] = 0;
	}
	
}

// Function to flip each card
var count;
var counter = [];
function flipCard(srcId, imageId) {
	count = srcId;
	if ( counter[count] % 2 == 0) {
		$( imageId ).attr("src", tileSrc[srcId]);
		selectTwo(count);
	}
	if ( counter[count] % 2 != 0)
		$( imageId ).attr("src", "match-foreground.png");
	counter[count]++;
}

// Establish limit on number of cards revealed and call compare()
var limit = 0;
var srcIdOne = 100;
var srcIdTwo = 100;
function selectTwo(srcId) {
	if ( srcIdOne == 100 )
		srcIdOne = srcId;
	if ( srcIdOne != 100 )
		srcIdTwo = srcId;
	limit++;
	if ( limit == 2 ) {
		$("#notification").html("You have selected the maximum two cards");
		compare( srcIdOne, srcIdTwo );
		limit = 0;
		srcIdOne = 100;
		srcIdTwo = 100;
	}
}

// Compare for a match
var removeOne;
var removeTwo;
function compare(srcIdOne, srcIdTwo) {
	if ( tiles[srcIdOne] == tiles[srcIdTwo] ){
		$("#notification").html("A match has been found -- Remove the Tiles");
		removeOne = srcIdOne;
		removeTwo = srcIdTwo;
	}
		//match( srcIdOne, srcIdTwo );
	else
		noMatch();
}

function noMatch() {
	$("#notification").html("No match has been found");
}

function match() {
	$("#notification").html("Select two tiles to match");
	$("#tile-" + removeOne).css({"background-color":"rgb(192,192,192)"});
	$("#i" + removeOne).attr("src", "removed-card.png");
	$("#tile-" + removeTwo).css({"background-color":"rgb(192,192,192)"});
	$("#i" + removeTwo).attr("src", "removed-card.png");
	removeOne = 100;
	removeTwo = 100;
	win();
}

// Identify the winner
function win() {
	winner++;
	$("#match-count").html("Matches found: " + winner);
	if ( winner == 10 )
		$("#notification").html("You have matched all the tiles");
}














