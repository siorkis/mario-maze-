var mySound;
var sound_jump;
var sound_win;
var sound_loose;

let k;
let object;
let number = '';
let birdX, birdY, cordX, cordY;
let x, y;
let i = 0;
let coordinates, initial_coordinates;
let target, target_coordinates;
let bird;
let itemList = [];
let j = 0;


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

function convert(string){
	for (let i = 0; i < excel.length; i++){
		if (x > 8){
			x = 1;
			y--;
		}

		excel[i].classList.remove('pig');
		excel[i].classList.remove('bird_right');
		excel[i].classList.remove('bird_up');
		excel[i].classList.remove('bird_down');
		excel[i].classList.remove('bird_left');
		excel[i].classList.remove('obst');
		excel[i].classList.remove('obst1');
		excel[i].classList.remove('obst2');
		excel[i].classList.remove('obst3');
		excel[i].classList.remove('obst4');
		x++;

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
					initial_coordinates = [birdX, birdY];
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
					excel[number].classList.add('pig');
				

			}else {
				
				excel[number].classList.add(object);
				excel[number].classList.add('obst');

			}
		
		} else {
			array.shift();
			number = '';
		    }

	}

	bird = [document.querySelector('[posX = "' + coordinates[0] +'"][posY = "' + coordinates[1] +'"]')];
	target = document.querySelector('[posX = "' + target_coordinates[0] +'"][posY = "' + target_coordinates[1] +'"]');

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

let presavedList = [];


function move_forward(x, y, itemList){		
	console.log(itemList);
		if(itemList[0]=="l"){
			changeDirection(-1);
			itemList.shift();
			console.log("list after l:"+ itemList);
				
			move_forward(x,y, itemList);
				
				
		} 
		else if(itemList[0]=="r"){
			changeDirection(1);
			itemList.shift();
			move_forward(x,y, itemList);
			console.log("list after r:"+ itemList);
		}
		else if(itemList[0]=="m"){

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
				

				if (direction == 0){ // if direction == right

				excel_check = document.querySelector('[posX = "' + (+bird_coordinates[0] + 1) + '"][posY = "' + (+bird_coordinates[1]) + '"] ');

				if (bird_coordinates[0] < 8)
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

			if (bird_coordinates[0] > 0)
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
					// bird[0].classList.remove('bird_up');
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

			setTimeout(function(){win()}, 1000);
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

			return;

		} else if (itemList[0] == undefined) {
			
			if (bird[0].classList.contains('obstcl')){

				bird[0].classList.remove("bird_right");
				bird[0].classList.remove("bird_up");
				bird[0].classList.remove("bird_down");
				bird[0].classList.remove("bird_left");

				bird[0].classList.add('puf')
				setTimeout(function(){bird[0].classList.remove('puf')}, 100);
			}
			
			sound_loose.play(); 

			
			

			setTimeout(function(){win()}, 1000);
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
		}

		return;
			
	}, 1);
		console.log("start x,y:"+bird_coordinates[0], bird_coordinates[1]);
			//bird[0].classList.add('bird_right');
		itemList.shift();
		console.log("list after m:"+ itemList);
		setTimeout(function(){
			move_forward(x,y, itemList);
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


function addItem(t){
	
	if(t==-1){
		itemList[j]="l";
		document.getElementById("listbutp").innerHTML+="<img class='arrow' src='media/images/left_1.png' alt='left' width='150px'>";
	} else if(t==1){
		itemList[j]="r";
		document.getElementById("listbutp").innerHTML+="<img class='arrow' src='media/images/right_1.png' alt='right' width='150px'>";
	} else if(t==0){
		itemList[j]="m";
		document.getElementById("listbutp").innerHTML+="<img class='arrow' src='media/images/move_1.png' alt='move' width='150px'>";
		
	}
	j++;
}

let initX = 1, initY = 8;

function howl(){
	mySound.play();
}

function reset(){
    j = 0;
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
	bird.shift();
	console.log(itemList);
    return itemList;
}

function win(){
	modal.style.display = "block";
	document.getElementById('listbutp').innerHTML = '';
	for(k=0; k<4; k++){
		document.getElementsByClassName('btn-class')[i].disabled = false;
		document.getElementsByClassName('btn-class')[i].style.borderColor="#1bb5a3";
		document.getElementsByClassName('btn-class')[i].style.backgroundColor="#1bb5a3"; 
	}
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

document.getElementById("myButton").addEventListener("click", howl);
document.getElementById("myButton").onclick = function() {
	for(k=0; k<4; k++){
		document.getElementsByClassName('btn-class')[i].disabled = true; 
		document.getElementsByClassName('btn-class')[i].style.borderColor="#5a968f";
		document.getElementsByClassName('btn-class')[i].style.backgroundColor="#5a968f";
	}
	setTimeout(function(){
		// console.log("dupa");
		presavedList = itemList;
		console.log(" afsas: " + presavedList);
		move_forward(initX, initY, itemList);
		i=0}, 1000);
		
	
	};


