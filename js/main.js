var playing = false;
var score, action, timeremainig;
var correctAnswer;

// if we click on the start/reset
document.getElementById('startreset').onclick = function() {
	//if we are playing
	if (playing === true) {
		
		location.reload(); // reload page
	} else { //if we are not playing
		playing = true; //change mode to playing
		score = 0; //set score to 0
		document.getElementById('scorevalue').innerHTML = score;
		document.getElementById('timeremaining').style.visibility = "visible"; //show countdown box
		timeremainig = 60;
		document.getElementById('timevalue').innerHTML = timeremainig;
		document.getElementById('gameover').style.display = "none";
		document.getElementById('btnreset').innerHTML = "Reset Game"; //change button to reset
		
		startCountdown();//start countdown
		
		//generate a new Q&A
		generateQA();
	}
};

//clicking on an answer box
for (var j = 1; j < 5; j++) {
		document.getElementById('box' + j).onclick = function() {
		//check if we are playing
		if (playing == true) {
			if (this.innerHTML == correctAnswer) {
				//correct answer
				score++; // score + 1
				document.getElementById('scorevalue').innerHTML = score;
				//hide wrong box and show correct box
				document.getElementById('wrong').style.display = "none";
				document.getElementById('correct').style.display = "block";
				setTimeout(function(){
					document.getElementById('correct').style.display = "none";
				}, 1000);
				//generate new Q&A
				generateQA();
			} else {
				// wrong answer
				document.getElementById('correct').style.display = "none";
				document.getElementById('wrong').style.display = "block";
				setTimeout(function(){
					document.getElementById('wrong').style.display = "none";
				}, 1000);
			}
		}
	}
};



// function

// start content
;function startCountdown() {
	action = setInterval(function(){
		timeremainig -= 1;
		document.getElementById('timevalue').innerHTML = timeremainig;
		if(timeremainig === 0) { //game over
		   stopCountdown();
			document.getElementById('gameover').style.display = "block";
			document.getElementById('totalscore').innerHTML = score;
			document.getElementById('timeremaining').style.visibility = "hidden";
			document.getElementById('correct').style.display = "none";
			document.getElementById('wrong').style.display = "none";
			playing = false;
			document.getElementById('btnreset').innerHTML = "Start Game";
		   }
	}, 1000);
}

// stop content
;function stopCountdown() {
	clearInterval(action);
}

// generate question and multiple answers
function generateQA() {
	var x = 1 + Math.round(Math.random() * 9);
	var y = 1 + Math.round(Math.random() * 9);
	correctAnswer = x * y;
	document.getElementById('randomquestion').innerHTML = x + 'x' + y;
	var correctPosition = 1 + Math.round(Math.random() * 3);
	document.getElementById('box' + correctPosition).innerHTML = correctAnswer; //fill one box with the correct answer
	var answers = [correctAnswer];
	for (var i = 1; i < 5; i++) {
		if(i !== correctPosition) {
			var wrongAnswer;
			do {
				   wrongAnswer = (1 + Math.round(Math.random() * 9)) * (1 + Math.round(Math.random() * 9)); //a wrong answer
				   }
			while (answers.indexOf(wrongAnswer) > -1); 
			document.getElementById('box' + i).innerHTML = wrongAnswer;
			answers.push(wrongAnswer);
		}
	}
}