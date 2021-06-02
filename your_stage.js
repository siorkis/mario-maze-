let object;
let number = '';
let birdX, birdY, cordX, cordY;
let x, y;
let i = 0;
let coordinates, initial_coordinates;
let target, target_coordinates;
let solveit;
let itemList= [];

var mySound;
var sound_jump;
var sound_win;
var sound_loose;

//sounds
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
    this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}

mySound = new sound("media/sounds/bird_jump.mp3")
sound_win = new sound('media/sounds/stage complete.mp3');
sound_loose = new sound('media/sounds/stage failed.mp3');

//creating table
let field = document.createElement('div');
document.body.appendChild(field);
field.classList.add('field');

for (let i = 1; i < 65; i++){
	let excel = document.createElement('div');
	field.appendChild(excel);
	excel.classList.add('excel');
}

//creating run button
var run = document.createElement('button');
run.setAttribute("id", "myButton");
run.innerHTML="Run!";
run.classList.add("btn-class");
document.body.getElementsByClassName("field")[0].appendChild(run);


let excel = document.getElementsByClassName('excel');
let excel_check;
	x = 1, 
	y = 8;

for (let i = 0; i < excel.length; i++){
	if (x > 8){
		x = 1;
		y--;
	}
	excel[i].setAttribute('posX', x);
	excel[i].setAttribute('posY', y);
	x++;

} 

let string = document.getElementById("stage").value;
function convert(){
	if(document.getElementById('test')) document.getElementById('test').remove();
	restring = string;
	if(document.getElementById(restring)){
		console.log("tsetset");
		solveit = document.createElement('button');
		solveit.innerHTML = "Solve It!";
		solveit.classList.add("btn-class");
		itemList = document.getElementById(restring).value.split(",")
		solveit.setAttribute('onclick', 'presolved(itemList)');
		solveit.setAttribute('id', 'test');
		document.body.getElementsByClassName("divBut")[0].appendChild(solveit);
	}
	array = [...string];

	// for(let i = 0; i < array.length; i++){ //  || 19k 25k 630k 58k 10kk i=2 n = 19
	while (array.length != 0){
		
		if (array[i] != 'k')
		{

			switch (array[i]){
				case '1':
					object = '.bird';
					break;
				case '2':
					object = '.pig';
					break;
				case '3':
					object = 'obst3';
					break;
				case '4':
					object = 'obst1';
					break;
				case '5':
					object = 'obst2';
					break;
				case '6':
					object = 'obst4';
					break;
			}

			array.shift();

			while(array[i] != 'k'){
				number += array[i];
				array.shift();   
			}

			number = +number;

				// 1) get posX posY of exel by +number 
			x = 1, 
			y = 8;

			if (object == '.bird'){
				for (let i = 0; i <= number; i++){	
					if (x > 8){
						x = 1;
						y--;
					}

					birdX = excel[i].getAttribute('posX');
					birdY = excel[i].getAttribute('posY');
					x++;

						// 4) 1) if object == '.bird' -> coordinates = [+posX, +posY]
					
					coordinates = [+birdX, +birdY];
				} 
					excel[number].classList.add('bird_right');

			} else if (object == '.pig'){
				for (let i = 0; i <= number; i++){	
					if (x > 8){
						x = 1;
						y--;
					}

					targetX = excel[i].getAttribute('posX');
					targetY = excel[i].getAttribute('posY');
					x++;

					
					
					target_coordinates = [+targetX, +targetY];
				} 

				// if (number %8 == 0){
					excel[number].classList.add('pig');
				// } else {
				// 	excel[number-1].classList.add('pig');
				// }
				

			}else {
				// for (let i = 0; i < number; i++){	
				// 	if (x > 8){
				// 		x = 1;
				// 		y--;
				// 	}
				// 		// 3) find exel by posX and posY from 1) and give class obst
				// 	cordY = excel[i].getAttribute('posX');
				// 	cordX = excel[i].getAttribute('posY');
				// 	x++;
				// }
				excel[number].classList.add(object);
				excel[number].classList.add('obst');

			}
			// 2) add to .css class: empty obst, obst1 .. obst4
		
		} else {
			array.shift();
			number = '';
		    }

	}
}

convert();

function presolved(){
	//itemList = document.getElementById(restring).value.split(",");
	for(i=0; i<itemList.length; i++){
		if(itemList[i]=="l") document.getElementById("listbutp").innerHTML+="<img class='arrow' src='../media/images/left_1.png' alt='left' width='150px'>";
			else if(itemList[i]=="r") document.getElementById("listbutp").innerHTML+="<img class='arrow' src='../media/images/right_1.png' alt='right' width='150px'>";
			else if(itemList[i]=="m") document.getElementById("listbutp").innerHTML+="<img class='arrow' src='../media/images/move_1.png' alt='move' width='150px'>";
	}
	i=0;
}
//excel[i].classList.add('bird');---------------player
//coordinates = [+birdX, +birdY];

// excel[i].classList.add('pig');---------------target 
// target_coordinates = [+targetX, +targetY];

// excel[number].classList.add('obst');---------obst

initial_coordinates = coordinates;

let bird = [document.querySelector('[posX = "' + coordinates[0] +'"][posY = "' + coordinates[1] +'"]')];

target = document.querySelector('[posX = "' + target_coordinates[0] +'"][posY = "' + target_coordinates[1] +'"]');

let step = -1;


function move_forward(x, y, itemList, step)
{	

	step++;

	console.log(itemList);
	
		if(itemList[0]=="l"){
			changeDirection(-1);
			console.log(step);
			document.getElementById('listbutp').childNodes[step].src="http://localhost/mazenew/media/images/left_2.png";
			//document.getElementById('listbutp').childNodes[step].src="http://localhost/mazenew/media/images/left_1.png"
			itemList.shift();
			console.log("list after l:"+ itemList);
				
			move_forward(x,y, itemList, step);

			
				
				
		} 
		else if(itemList[0]=="r"){
			changeDirection(1);
			itemList.shift();
			console.log(step);
			document.getElementById('listbutp').childNodes[step].src="http://localhost/mazenew/media/images/right_2.png";
			move_forward(x, y, itemList, step);
			console.log("list after r:"+ itemList);
			
		}
		else if(itemList[0]=="m")
		{
			console.log(step);
			document.getElementById('listbutp').childNodes[step].src="http://localhost/mazenew/media/images/move_2.png";
			//document.getElementsById("myButton")[0].disabled = true;
			
    		
    	sound_Jump = new sound("media/sounds/jump.mp3");

    	sound_Jump.play();
    
    	let bird_coordinates = [bird[0].getAttribute('posX'), bird[0].getAttribute('posY')];
		bird[0].classList.remove("bird_right");
		bird[0].classList.remove("bird_up");
		bird[0].classList.remove("bird_down");
		bird[0].classList.remove("bird_left");
		if (direction == 0){
		bird[0].classList.add('bird_right');
		} else if (direction == 1){
			bird[0].classList.add('bird_down');
		} else if (direction == 2){
			bird[0].classList.add('bird_left');
		} else if (direction == 3){
			bird[0].classList.add('bird_up');
		}
		setTimeout(function(){
			bird[0].classList.remove("bird_right");
			bird[0].classList.remove("bird_up");
			bird[0].classList.remove("bird_down");
			bird[0].classList.remove("bird_left");
			
			
		bird.pop();
		
		excel_check = document.querySelector('[posX = "' + (+bird_coordinates[0]) + '"][posY = "' + (+bird_coordinates[1]) + '"] ');
		let logic = !excel_check.classList.contains('obstacle_wood');

		if (direction == 0){ // if direction == right

			excel_check = document.querySelector('[posX = "' + (+bird_coordinates[0] + 1) + '"][posY = "' + (+bird_coordinates[1]) + '"] ');

			if (bird_coordinates[0] < 8 && logic)
			{			
				bird.unshift(document.querySelector('[posX = "' + (+bird_coordinates[0] + 1) + '"][posY = "' + (+bird_coordinates[1]) + '"] '));
				bird[0].classList.add('bird_right');
				bird_coordinates[0] = +bird_coordinates[0] + 1;

			} else {
				alert('Oops, can’t go in there !');
				reset();
				}
				
			excel_check = document.querySelector('[posX = "' + (+bird_coordinates[0] + 1) + '"][posY = "' + (+bird_coordinates[1]) + '"] ');

		}

		if (direction == 2){ // if direction == 'left'
				
			excel_check = document.querySelector('[posX = "' + (+bird_coordinates[0] - 2) + '"][posY = "' + (+bird_coordinates[1]) + '"] ');

			if (bird_coordinates[0] > 0 && logic)
			{
				bird.unshift(document.querySelector('[posX = "' + (+bird_coordinates[0] - 1) + '"][posY = "' + (+bird_coordinates[1]) + '"] '));
				bird[0].classList.add("bird_left");
				bird_coordinates[0] = +bird_coordinates[0] - 1;
			} else {
				alert('Oops, can’t go in there !');
				reset();
				}
			}

		if (direction == 3){ // if direction == up
				
			excel_check = document.querySelector('[posX = "' + (+bird_coordinates[0]) + '"][posY = "' + (+bird_coordinates[1] + 2) + '"] ');

			if (bird_coordinates[1] < 8)
			{
					// bird.classList.remove('bird_up');
				bird.unshift(document.querySelector('[posX = "' + (+bird_coordinates[0]) + '"][posY = "' + (+bird_coordinates[1] + 1) + '"] '));
				bird[0].classList.add('bird_up');
				bird_coordinates[1] = +bird_coordinates[1] + 1;
			} else {
				alert('Oops, can’t go in there !');
				reset();				
				}
			}

		if (direction == 1){ // if direction == down

			excel_check = document.querySelector('[posX = "' + (+bird_coordinates[0]) + '"][posY = "' + (+bird_coordinates[1] - 2) + '"] ');
				
			if (bird_coordinates[1] > 0)
			{
				bird.unshift(document.querySelector('[posX = "' + (+bird_coordinates[0]) + '"][posY = "' + (+bird_coordinates[1] - 1) + '"] '));
				bird[0].classList.add('bird_down');
				bird_coordinates[1] = +bird_coordinates[1] - 1;
			} else {
				alert('Oops, can’t go in there !');
				reset();
				}

		}

		console.log(bird_coordinates, target_coordinates); // pizdets

		if (bird[0].getAttribute('posX') == target.getAttribute('posX') && (bird[0].getAttribute('posY') == target.getAttribute('posY')))
		{
			target.classList.remove('pig');
			target.classList.add('puf')
			setTimeout(function(){target.classList.remove('puf')}, 100); 

			sound_win.play();

			// var msg = new SpeechSynthesisUtterance(); //some voice experiments 
			// msg.text = "Are you winning son?";
			// window.speechSynthesis.speak(msg);

			setTimeout(function(){win(1)}, 1000);
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

			reset();

			return;

		} else if (itemList[0] == undefined && (!bird[0].classList.contains('obst') | 
				   !(bird[0].getAttribute('posX') == target.getAttribute('posX') && (bird[0].getAttribute('posY') == target.getAttribute('posY'))))) {
			//itemList[0] == undefined
			if (bird[0].classList.contains('obst')){

				bird[0].classList.remove("bird_right");
				bird[0].classList.remove("bird_up");
				bird[0].classList.remove("bird_down");
				bird[0].classList.remove("bird_left");

				bird[0].classList.add('puf')
				setTimeout(function(){bird[0].classList.remove('puf')}, 100);
			}
			
			sound_loose.play(); 	

			setTimeout(function(){win(0)}, 1000);
			// When the user clicks on <span> (x), close the modal
			span.onclick = function() {
			  modal.style.display = "none";
			  reset();
			}

			// When the user clicks anywhere outside of the modal, close it
			window.onclick = function(event) {
			  if (event.target == modal) {
			    modal.style.display = "none";
			    reset();
			  }
			}		

			
			// setTimeout(function(){loose()}, 1000);
			// // When the user clicks on <span> (x), close the modal
			// span.onclick = function() {
			//   modalLoose.style.display = "none";
			// }

			// // When the user clicks anywhere outside of the modal, close it
			// window.onclick = function(event) {
			//   if (event.target == modalLos) {
			//     modalLoose.style.display = "none";
			//   }
			// }
		}


		// } else if (itemList[0] == undefined) {
			
		// 	if (bird[0].classList.contains('obst')){

		// 		bird[0].classList.remove("bird_right");
		// 		bird[0].classList.remove("bird_up");
		// 		bird[0].classList.remove("bird_down");
		// 		bird[0].classList.remove("bird_left");

		// 		bird[0].classList.add('puf')
		// 		setTimeout(function(){bird[0].classList.remove('puf')}, 100);
		// 	}
			
		// 	sound_loose.play(); 

			
			

		// 	setTimeout(function(){win()}, 1000);
		// 	// When the user clicks on <span> (x), close the modal
		// 	span.onclick = function() {
		// 	  modal.style.display = "none";
		// 	}

		// 	// When the user clicks anywhere outside of the modal, close it
		// 	window.onclick = function(event) {
		// 	  if (event.target == modal) {
		// 	    modal.style.display = "none";
		// 	  }
		// 	}
		// } 


		return;
			
	}, 1);
		console.log("start x,y:"+bird_coordinates[0], bird_coordinates[1]);
			//bird.classList.add('bird_right');

			//document.getElementsById("myButton")[0].disabled = false;
		itemList.shift();
		console.log("list after m:"+ itemList);
		setTimeout(function(){
			move_forward(x,y, itemList, step);
		}, 750);
	
	} 
}    	


let direction=0;
function changeDirection(n){
	if(n==1){
		if(direction>=0 && direction<3){
			direction+=n;
		} else if(direction==3){
			direction=0;
		}
	
	} else{
		if(direction>0&&direction<=3){
			direction+=n;
		} else if(direction==0){
			direction=3;
		}
	}
	
	console.log(n+" "+direction);
}
let steps_num=0;

i=0;
function addItem(t){
	
	if(t==-1){
		itemList[i]="l";
		document.getElementById("listbutp").innerHTML+="<img class='arrow' src='../media/images/left_1.png' alt='left' width='150px'>";
	} else if(t==1){
		itemList[i]="r";
		document.getElementById("listbutp").innerHTML+="<img class='arrow' src='../media/images/right_1.png' alt='right' width='150px'>";
	} else if(t==0){
		itemList[i]="m";
		document.getElementById("listbutp").innerHTML+="<img class='arrow' src='../media/images/move_1.png' alt='move' width='150px'>";
		
	}
	i++;
}

let initX = 1, initY = 8;

function howl(){
	mySound.play();
}

function reset(){
    i = 0;
    itemList = [];
	document.getElementById("listbutp").innerHTML="";
	bird_coordinates = [bird[0].getAttribute('posX'), bird[0].getAttribute('posY')];
	
	bird[0].classList.remove("bird_right");
	bird[0].classList.remove("bird_up");
	bird[0].classList.remove("bird_down");
	bird[0].classList.remove("bird_left");

	coordinates = initial_coordinates;
	bird = [document.querySelector('[posX = "' + initial_coordinates[0] +'"][posY = "' + initial_coordinates[1] +'"]')];
	bird_coordinates[0] = initial_coordinates[0];
	bird_coordinates[1] = initial_coordinates[1];
	bird.unshift(document.querySelector('[posX = "' + (+bird_coordinates[0]) + '"][posY = "' + (+bird_coordinates[1]) + '"] '));
	bird[0].classList.add('bird_right');
	direction = 0;

	target.classList.remove('pig');
	target = document.querySelector('[posX = "' + target_coordinates[0] +'"][posY = "' + target_coordinates[1] +'"]');
	target.classList.add("pig");

    return itemList;
}

// function win(kakoitoparametr){
// 	if (kakoitoparametr == 1){
// 		document.getElementById('winlose').innerHTML = 'Are you winning son ?';
// 	} else if (kakoitoparametr == 0){
// 		document.getElementById('winlose').innerHTML = 'Son?..(ha-ha u lost)';
// 	}

// 	modal.style.display = "block";
// 	document.getElementById('listbutp').innerHTML = '';

// 	for(k=0; k<4; k++){
// 		document.getElementsByClassName('btn-class')[k].disabled = false;
// 		document.getElementsByClassName('btn-class')[k].style.cursor = 'pointer';
// 		document.getElementsByClassName('btn-class')[k].style.borderColor="#1bb5a3";
// 		document.getElementsByClassName('btn-class')[k].style.backgroundColor="#1bb5a3"; 
// 	}
// }

function win(kakoitoparametr){

	if (kakoitoparametr == 1){
		document.getElementById('winlose').innerHTML = 'Are you winning son ?';
		// console.log("asa"+ presavedList);
		document.getElementById('hidden2').value = restring;
	} else if (kakoitoparametr == 0){
		document.getElementById("hidden").value = "";
		document.getElementById('winlose').innerHTML = 'Son?..(ha-ha u lost)';
	}

	modal.style.display = "block";

	document.getElementById('listbutp').innerHTML = '';
	for(k=0; k<4; k++){
		document.getElementsByClassName('btn-class')[k].disabled = false;
		document.getElementsByClassName('btn-class')[k].style.cursor = 'pointer';
		document.getElementsByClassName('btn-class')[k].style.borderColor="#1bb5a3";
		document.getElementsByClassName('btn-class')[k].style.backgroundColor="#1bb5a3"; 
	}
}

// Get the modal
var modal = document.getElementById("myModal");
var modalLoose = document.getElementById("myModalLoose");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

document.getElementById("myButton").addEventListener("click", howl);
document.getElementById("myButton").onclick = function() {
	for(k=0; k<4; k++){
		document.getElementsByClassName('btn-class')[k].disabled = true; 
		document.getElementsByClassName('btn-class')[k].style.cursor = 'default';
		document.getElementsByClassName('btn-class')[k].style.borderColor="#5a968f";
		document.getElementsByClassName('btn-class')[k].style.backgroundColor="#5a968f";
	}
	setTimeout(function(){
		//console.log("dupa");
		presavedList = itemList;
		document.getElementById("hidden").value = presavedList.toString();
		move_forward(initX, initY, itemList, step);
		i=0}, 1000);
		
	
	};

function enableButtons(){
	document.getElementById('listbutp').innerHTML = '';
	for(k=0; k<4; k++){
		document.getElementsByClassName('btn-class')[k].disabled = false;
		document.getElementsByClassName('btn-class')[k].style.cursor = 'pointer';
		document.getElementsByClassName('btn-class')[k].style.borderColor="#1bb5a3";
		document.getElementsByClassName('btn-class')[k].style.backgroundColor="#1bb5a3"; 
	}
}

function oops(){
	enableButtons();
	alert('Oops, can’t go in there !');
	reset();
}
