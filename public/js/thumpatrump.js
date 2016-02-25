"use strict";

// (function(){

// declare global variables

var boxes = [];
var animationTime = 2000;
var intervalTime = 1500;
var timerCount = 30;
var bodyCount = 0;
var highScore = 0;
var launchedTrumps = 0;

// build component functions

function loadBoxesInArray() {
	$('.box').each(function(){
		boxes.push($(this));
	});
}

function pickRndmLctn() {
	return boxes[Math.floor(Math.random() * boxes.length)];
}

function enterTrump() {
	var randomLocation = pickRndmLctn();
	$(randomLocation).html('<img src="/img/trumpMole.png" class="trumpMole">');
	$(randomLocation).children().animate({
	    opacity: "1",
	    height: "175px"
	}, animationTime);
	$(randomLocation).addClass("targetBox");
	return randomLocation;
}

function exitTrump(parameter) {
	$(parameter).children().animate({
	    opacity: "0"
	}, 500, function() {
		$(parameter).removeClass("targetBox");
	});
	launchedTrumps++;
}

function mapClickToRndmLctn (clickDiv) {
	var targetClass = $(clickDiv).attr("class");
	if (targetClass == "targetBox") {
		thumpTrump();
	}
}

function startTimer() {
	var intervalId = setInterval(function(){
		if (timerCount <= 0) {
		clearInterval(intervalId);
		}
		$("#timer").text(timerCount);
		timerCount--;
	}, 1000);
}

function logHighScore() {
	if (highScore < bodyCount) {
		highScore = bodyCount;
	}
	return logHighScore();
}

function makeItHarder() {
	if (bodyCount % 5 == 0) {
		animationTime - 500;
		intervalTime - 500;
	}
}

// build sequence functions

function initSequence() {
	var trumpExit = enterTrump();
	setTimeout(function() {
		exitTrump(trumpExit);
	}, intervalTime);
}

// build initation functions / event listeners

$('#startGame').click(function(){
	startTimer();
	var intervalId = setInterval(function(){
		if (timerCount <= 0) {
			clearInterval(intervalId);
			var escTrumps = launchedTrumps - bodyCount;
			$("#escTrumps").text(escTrumps);
			logHighScore();
			$("#highScore").html(highScore);
		}
		initSequence();
	}, intervalTime);
	$(this).hide();
	$('#reset').show();
});

$('#reset').click(function(){
	timerCount = 30;
	bodyCount = 0;
	$(this).hide();
	$("#startGame").show();
});

$('.container').on('click', '.targetBox', function() {
	$(this).removeClass("targetBox");
	$(this).html('');
	$(this).html('<img src="/img/thumpedMole.png" alt="Thwacked!">');
	$(this).children().animate({
		opacity: "0"
	}, 500);
	bodyCount++;
	$("#bodyCount").text(bodyCount);
	makeItHarder();
});

// execute commands on page load

loadBoxesInArray();
$('#reset').hide();

// close IFFE statement
// }());