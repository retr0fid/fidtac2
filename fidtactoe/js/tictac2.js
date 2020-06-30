var origBoard;
const huPlayer = 'O';
const aiPlayer = 'X'
const winCombs = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2],
	
];

const cells = document.querySelectorAll('.cell');
startGame();


function startGame(){
	document.querySelector(".endgame").style.display = "none"
	origBoard = Array.from(Array(9).keys());
	for(var i = 0; i< cells.length; i++){
		cells[i].innerText = "";
		cells[i].style.removeProperty("background");
		cells[i].addEventListener("click",turnClick, false);

	}

}

function turnClick(square){
	if (typeof origBoard[square.target.id] == "num"){
			

	}
	turn(square.target.id, huPlayer);
			if(!checkTie()){
				turn(bestSpot(), aiPlayer);
			}
	
}

function turn(squareId,player){
	origBoard[squareId] = player;
	document.getElementById(squareId).innerText = player;
	let gameWOn = checkWin(origBoard, player);
	if(gameWOn) gameOver(gameWOn)

}

function checkWin(board,player) {
	let plays = board.reduce((a,e,i) =>
	(e === player) ? a.concat(i) : a, []);
	let gameWOn = null;
	for(let [index,win] of winCombs.entries()){
		if(win.every(elem => plays.indexOf(elem)> -1)){
			gameWOn = {index,player: player};
			break;

		}
	}
	return gameWOn;
}


function gameOver(gameWOn){
	for(let index of winCombs[gameWOn.index]){
		document.getElementById(index).style.background = gameWOn.player == huPlayer? "blue":"red";

	}
	for (var i=0; i < cells.length; i++){
		cells[i].removeEventListener('click',turnClick, false)
	}
	declareWInner(gameWOn.player == huPlayer ? "You Win!": "You Lose")
}

function declareWInner(who){
	document.querySelector(".endgame").style.display = "block";
	document.querySelector(".endgame .text").innerText = who;
}

function emptySquare() {
	return origBoard.filter(s => typeof s == "number");
	
}

function bestSpot(){
	return emptySquare()[0];
}

function checkTie(){
	if(emptySquare().length == 0){
		for(var i = 0; i< cells.length; i++){
			cells[i].style.background = "green";
			cells[i].removeEventListener("click", turnClick,false)

		}
		declareWInner("Tie Game!")
		return true;
	}
	return false;
}