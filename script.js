"use strict";

//task 1 - 
//1.1: review the code base so that you can explain generally what each line is doing and create a simple diagram illustrating the basic flow.
//1.2: change the colour of the target object from red to green
//1.3: improve the game by updating the target's fixed location so that it is generated randomly during the setup
//1.4: complete the code blocks associated with controlling the snake's direction of tavel; i.e., paint_snake and keypressed functions review the switch instruction.. 
//1.5: update the collision function so that it detects and stops the game if the snake goes outside the width of the viewport; you can use noLoop() to do this as a quick fix
//1.6: update the collision function so that it detects and stops the game if the snake goes outside the height of the viewport
//1.7: reflect, plan and create a function called 'reset' that resets the snake and restarts the action (as if you were to 'refresh' the page).
//1.8: update the target_collected function so that it correctly detects and returns true if the snake 'hits' the target; by returning true the snake will automatically grow 
//1.9: update the target_collected function so that if the snake 'hits' the target the target is removed and repositioned at a new (random) location
//1.10: reflect, plan and create some general improvements, this could include some kind of scoring mechanism (e.g., time based, target based, etc), what else could you do

var vp_width = window.innerWidth; //declare variables to hold the viewport size, set to the window size
var vp_height = window.innerHeight; 


//declare global variables to hold the framework objects
var viewport;

const DIR_UP = 1; //setup values to represent possible directions
const DIR_DOWN = 2;
const DIR_LEFT = 3;
const DIR_RIGHT = 4;

//snake details
var x = vp_width / 2; //set the default starting location for the snake
var y = vp_height / 2;
var dir = DIR_DOWN; //set the default direction of travel for the snake
var bodysize = 20; //set the default body size 
var taillength = 3; //set the defaul body length
var tail = []; //set an array to hold the snake's body segments (squares)


//target details
var target = []; //set an array to how the target coordinates


function get_random(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}


function preload() {
	//p5 defined function
}


function setup() {
	//this p5 defined function runs automatically once the preload function is done
	viewport = createCanvas(vp_width, vp_height); //set the viewport (canvas) size
	viewport.parent("viewport_container"); //move the canvas so it’s inside the target div
	
	target = [ 200, 200 ]; //set the default location for the target as x = 200, y = 200
	frameRate(5);
}


function paint_background() {
	//access the game object for the world, use this as a background image for the game
	background(90, 90, 90); //clear the screen with the specified colour
}


function draw_square(xlocation, ylocation, r = 255, g = 255, b = 255) {
	//this function draws a square at the specified location 
	rectMode(CENTER); //set the mode to use the centre rather than the top,left
	stroke(0, 0, 0); //set the colour of the stroke (outline) using rgb decimal values
	strokeWeight(1); //set the weight of the stoke 1 = very thin
	
	fill(r, g, b); //set the fill colour
	rect(xlocation, ylocation, bodysize, bodysize); //draw the rectangle
}


function target_collected(xlocation, ylocation) {
	//this function should be designed so that it returns true or false depending on whether the snake 'hits' the target
	var collected = false; //set the default value

	return collected;
}


function collision(xlocation, ylocation) {
	//this repeats for each element in the tail	
	var collision = false; //set the default value
	tail.forEach( segment => { //each 'segment' is tested to see if the passed values aleady exist
		if ( segment[0] == xlocation && segment[1] == ylocation ) {
			console.log("tail collision detected!") //a match is found
			collision = true; //update the return condition
		} 
	});
	return collision; //return details on the collision
}


function paint_target() {
	var r = 255, g = 0, b = 0; //set some default colours for the target object
	draw_square(target[0], target[1], r, g, b); //use the draw square function to paint the target
}


function paint_snake() {
	//loop through the tail array and for each item (we've labelled it 'segment' call the draw_square function)
	tail.forEach( segment =>  { 
	//	console.log (segment); 
		draw_square(segment[0], segment[1]); //use the draw square function to pain the snake's tail segment
	} );

	if(tail.length >= taillength) { //as the tail grows start chopping off the first 'bit'
		tail.shift(); //this function causes the first index to be chopped off
	}

	//determine the direction of travel and update the current location 
	switch (dir) {
		case DIR_LEFT: x -= bodysize; break; //modify the current x location
		case DIR_RIGHT: x += bodysize; break;
		case DIR_UP: y -= bodysize; break; //modify the current y location
		case DIR_DOWN: y += bodysize; break;
	}

	//before we add the new segment lets test
	if(collision(x, y) == true) { //a collision was detected
		console.log ("Game over");
		noLoop(); //set the game loop
	} else { //no tail collision detected - lets add the new segment
		tail.push([x, y]); //push (record) the new location into the tail array
		if(target_collected(x, y) == true) { //check to see if the target has been collected
			taillength++; //increase the lenght of the tail
		}
	}
}


function paint_assets() {
	paint_target(); //paint the target asset
	paint_snake(); //paint the snake assets
}


function keyPressed() {
	//this is a p5 defined function the is automatically called if the system detects a key press
	switch (keyCode) { //keyCode is a P5 propery that holds the code for the pressed key
		case LEFT_ARROW: dir = DIR_LEFT; break;
		case RIGHT_ARROW: break;
		case UP_ARROW: break;
		case DOWN_ARROW: break;
	}
}


function draw() {
	//this p5 defined function runs every refresh cycle
	paint_background(); //paint the default background
	paint_assets(); //paint the game assets
}
