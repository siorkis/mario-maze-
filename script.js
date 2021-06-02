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
let itemList_solved = [];
let j = 0;
let solveit;
let bin = 0;
let bin_if = 0;
let skip;
let checker = 0;
let vision;
let bird_coordinates;
let ifList = [];
let if_checker = 0;
let check_if = 0;
let check_for = 0;
let hp = 300;
let dmg;
let best = ['m','m','m','m'];
let real_length = 0;
let solution_to_keep = [];
let win_status = false;
let restring;
let itemList_solved_for_animation = [];
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
    
    restring = string; 
	if(document.getElementById('test')) {
		document.getElementById('test').remove();
	}

	if(document.getElementById(string)){
		
		solveit = document.createElement('button');
		solveit.innerHTML = "Solve It!";
		solveit.classList.add("btn-class");
		itemList_solved = document.getElementById(string).value.split(",");

		console.log(itemList_solved);
		solveit.setAttribute('onclick', 'presolved(itemList_solved)');
		solveit.setAttribute('id', 'test');
		document.body.getElementsByClassName("divBut")[0].appendChild(solveit);
	}
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
	bird_coordinates = [bird[0].getAttribute('posX'), bird[0].getAttribute('posY')];
	target = document.querySelector('[posX = "' + target_coordinates[0] +'"][posY = "' + target_coordinates[1] +'"]');
}


function best_sulution(array){
	best = array;
	hp = best.length * 10;
	return best;
}


function presolved(){
	reset();
	checker = 1;
	//itemList = document.getElementById(restring).value.split(",");
	for(i=0; i<itemList_solved.length; i++){
		if(itemList_solved[i]=="l") document.getElementById("listbutp").innerHTML+="<img class='arrow' src='media/images/left_1.png' alt='left' width='150px'>";
			else if(itemList_solved[i]=="r") document.getElementById("listbutp").innerHTML+="<img class='arrow' src='media/images/right_1.png' alt='right' width='150px'>";
			else if(itemList_solved[i]=="m") document.getElementById("listbutp").innerHTML+="<img class='arrow' src='media/images/move_1.png' alt='move' width='150px'>";

			else if(itemList_solved[i]=="for") document.getElementById("listbutp").innerHTML+= "<img class='arrow for' src='media/images/for.png'  width='150px'>";
			else if(itemList_solved[i]=="end") document.getElementById("listbutp").innerHTML+= "<img class='arrow for_end' src='media/images/for_end.png'  width='150px'>";
			
			else if(itemList_solved[i]=="if") document.getElementById("listbutp").innerHTML+= "<img class='arrow if' src='media/images/if_2.png'  width='150px'>";
			else if(itemList_solved[i]=="if_end") document.getElementById("listbutp").innerHTML+= "<img class='arrow if_end' src='media/images/if_end.png'  width='150px'>";

	}
	i=0;

	itemList_solved_for_animation = itemList_solved;

	for(var item of itemList_solved){
		if (item == 'for'){
			For(itemList_solved);
			console.log(itemList_solved);

			for (item of itemList_solved){
				if(item == 'if' || item == 'if_end'){
					bin_if++
				}
			}
		// } else if (item == 'if') {
		// 	if_checker++;
		// 	var p = 0; 
		// 	while(itemList_solved[p] != "if"){
		// 		p++;
		// 	}
			
		// 	itemList_solved.splice(p, 1);
			
		// 	while(itemList_solved[p] != 'if_end'){
		// 		itemList_solved.splice(p, 1);
		// 	}

		// 	itemList_solved.splice(p, 1);			
	    }
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

let step = -1;


function move_forward(x, y, itemList, step){		

	step++;

	switch(direction){
		
		case 0:
			vision = document.querySelector('[posX = "' + (+bird_coordinates[0] + 1) + '"][posY = "' + (+bird_coordinates[1]) + '"] ');
			break;
		
		case 1: // down
			vision = document.querySelector('[posX = "' + (+bird_coordinates[0]) + '"][posY = "' + (+bird_coordinates[1] - 1) + '"] ');
			break;
		
		case 2: // left
			vision = document.querySelector('[posX = "' + (+bird_coordinates[0] - 1) + '"][posY = "' + (+bird_coordinates[1]) + '"] ');
			break;
		
		case 3: // up
			vision = document.querySelector('[posX = "' + (+bird_coordinates[0]) + '"][posY = "' + (+bird_coordinates[1] + 1) + '"] ');
			break;

	}

	// if (vision == null || vision.classList.contains('pig')){
	// 	target.classList.remove('pig');
	// 	target.classList.add('pig_attacked');
	// 	setTimeout(function() {
	// 		target.classList.add('pig_attacked');
	// 	}, 1000);
		
	// } else if (!vision.classList.contains('pig') && target.classList.contains('pig_attacked')){
	// 	target.classList.remove('pig_attacked');
	// 	setTimeout(function() {
	// 		target.classList.add('pig');
	// 	}, 1000);	
	// }


		if(itemList[0] == 'for'){
			For(itemList);
			//move_forward(initX, initY, ifList, step);
		}


		if (vision != null){
			if (itemList[0] == 'if' && if_checker == 0 && bin_if > 0 && vision.classList.contains('obst')){
				IF(itemList, ifList);
				let bufer_list_2 = [];
				bufer_list_2 = ifList;
				ifList = bufer_list_2.filter(function () {return true});
				if_checker++;
				if(vision.classList.contains('obst')){
					move_forward(initX, initY, ifList, step);
				}
				
			}  else if(itemList[0] == 'if'){
				var l = 0; 
				
				itemList.splice(l, 1);
				
				while(itemList[l] != 'if_end'){
					itemList.splice(l, 1);
				}

				itemList.splice(l, 1);
			}
		} else {
			if(itemList[0] == 'if'){
				var l = 0; 
				
				itemList.splice(l, 1);
				
				while(itemList[l] != 'if_end'){
					itemList.splice(l, 1);
				}

				itemList.splice(l, 1);
			}
		}

		if(itemList[0]=="l"){
			changeDirection(-1);
			itemList.shift();
			skip--;
			if(check_if == 0 && check_for == 0){
				
				document.getElementById('listbutp').childNodes[step].src="http://localhost/mazenew/media/images/left_2.png";

				setTimeout(function() {
					document.getElementById('listbutp').childNodes[step].src="http://localhost/mazenew/media/images/left_1.png";
				}, 500);
			} 
			
			

			console.log("list after l:"+ itemList);
				
			move_forward(x,y, itemList, step);
				
				
		} 
		///
		
	
		///
		else if(itemList[0]=="r"){
			skip--;
			changeDirection(1);
			itemList.shift();
			
			if(check_if == 0 && check_for == 0){
				document.getElementById('listbutp').childNodes[step].src="http://localhost/mazenew/media/images/right_2.png";

				setTimeout(function() {
					document.getElementById('listbutp').childNodes[step].src="http://localhost/mazenew/media/images/right_1.png";
				}, 500);
			} 
			
			
			

			move_forward(x,y, itemList, step);
			console.log("list after r:"+ itemList);
		}
		else if(itemList[0]=="m"){
			skip--;
			console.log(step);
			console.log(skip);
			
			if(check_if == 0 && check_for == 0){
				document.getElementById('listbutp').childNodes[step].src="http://localhost/mazenew/media/images/move_2.png";

				setTimeout(function() {

					document.getElementById('listbutp').childNodes[step].src="http://localhost/mazenew/media/images/move_1.png";
				}, 500);
			} 	


    	sound_Jump = new sound("media/sounds/jump.mp3");

    	sound_Jump.play();
    
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
				oops();
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
				oops();
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
				oops();
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
				oops();
				}

		}
		console.log(bird_coordinates, target_coordinates); // pizdets

		let obst_target = document.querySelector('[posX = "' + (+bird_coordinates[0]) + '"][posY = "' + (+bird_coordinates[1]) + '"] ');

		if (bird[0].getAttribute('posX') == target.getAttribute('posX') && (bird[0].getAttribute('posY') == target.getAttribute('posY')))
		{
			// if (bufer_list.length < best.length){
			// 	alert('you just beated developer, oh my...');
			// } else 
			if(dmg < hp){				

				target.classList.remove('pig');
				target.classList.remove('pig_attacked');
				target.classList.add('puf')
				setTimeout(function(){target.classList.remove('puf')}, 100); 

				sound_win.play();

				setTimeout(function(){win(3)}, 1000);
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
				itemList = [];
				win_status = true;
				return win_status;


			} else if (dmg > hp){

				bird[0].classList.remove("bird_right");
				bird[0].classList.remove("bird_up");
				bird[0].classList.remove("bird_down");
				bird[0].classList.remove("bird_left");

				bird[0].classList.add('puf')
				setTimeout(function(){bird[0].classList.remove('puf')}, 100);
			
				obst_target.classList.remove("bird_right");
				obst_target.classList.remove("bird_up");
				obst_target.classList.remove("bird_down");
				obst_target.classList.remove("bird_left");

				target.classList.remove('pig');
				target.classList.remove('pig_attacked');
				target.classList.add('pig_damaged');
				setTimeout(function(){obst_target.classList.add('pig_damaged');}, 200);

				sound_loose.play(); 

				setTimeout(function(){win(2)}, 1000);
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

				itemList = [];
				return;

			} else if (dmg == hp){				

				target.classList.remove('pig');
				target.classList.remove('pig_attacked');
				target.classList.add('puf')
				setTimeout(function(){target.classList.remove('puf')}, 100); 

				sound_win.play();

				setTimeout(function(){win(1)}, 1000);
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
				itemList = [];
				win_status = true;
				return win_status;

			} 

			target.classList.remove('pig');
			target.classList.remove('pig_attacked');
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
			  reset();
			}

			// When the user clicks anywhere outside of the modal, close it
			window.onclick = function(event) {
			  if (event.target == modal) {
			    modal.style.display = "none";
			    reset();
			  }
			}
			itemList = [];
			return;

		} else if(obst_target.classList.contains('obst')) {

			console.log(bird[0].classList);
			
			bird[0].classList.remove("bird_right");
			bird[0].classList.remove("bird_up");
			bird[0].classList.remove("bird_down");
			bird[0].classList.remove("bird_left");

			bird[0].classList.add('puf')
			setTimeout(function(){bird[0].classList.remove('puf')}, 100);

			let second_class = bird[0].classList[1];
		
		
			obst_target.classList.remove("bird_right");
			obst_target.classList.remove("bird_up");
			obst_target.classList.remove("bird_down");
			obst_target.classList.remove("bird_left");

			switch(second_class){

				case 'obst1':
					obst_target.classList.remove('obst1');
					obst_target.classList.add('puf');
					setTimeout(function(){obst_target.classList.add('obst1');}, 200);
					break;

				case 'obst2':
					obst_target.classList.remove('obst2');
					obst_target.classList.add('puf');
					setTimeout(function(){obst_target.classList.add('obst2');}, 200);
					break;

				case 'obst3':
					// console.log(obst_target.classList);
					obst_target.classList.remove('obst3');
					
					// console.log(obst_target.classList);
					obst_target.classList.add('puf');

					// console.log(obst_target.classList);
					setTimeout(function(){obst_target.classList.add('obst3');}, 200);
					
					// console.log(obst_target.classList);
					// console.log(bird_coordinates); // 5 6
					// console.log(obst_target.classList);

					break;

				case 'obst4':
					obst_target.classList.remove('obst4');
					obst_target.classList.add('puf');
					setTimeout(function(){obst_target.classList.add('obst4');}, 200);
					break;
			}

			console.log(bird[0].classList);

			// bird[0].classList.add('puf')
			// setTimeout(function(){bird[0].classList.remove('puf')}, 100);
			
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
		
			itemList = [];
			return;

		} else if (itemList[0] == undefined) {
			
			console.log(bird[0].classList);

			// bird[0].classList.add('puf')
			// setTimeout(function(){bird[0].classList.remove('puf')}, 100);
			
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
		}

		return;
			
	}, 1);
		console.log("start x,y:"+bird_coordinates[0], bird_coordinates[1]);
			//bird[0].classList.add('bird_right');
		itemList.shift();
		console.log("list after m:"+ itemList);
		setTimeout(function(){
			move_forward(x, y, itemList, step);
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

function For_start(list, number, index){
	//list.push("for");
	var num = number.toString();
	//list.push(num);
	list[index+1] = num;
}

function For_end(list){
	list.push("end");
}

function For(list){
	var i = 0; //find for
	while(list[i] != "for"){
		i++;
	}
	check_for++;
	// estabilish number
	var count = list[i+1];
	// iterate list till "end"
	var list_for = [];
	i += 2;
	while (list[i] != "end"){
		list_for.push(list[i]);
		i++;
	}
	// insert list number times
	var j = 0;
	while(j != count){
		list_for.forEach(element => list.push(element));
		j++;
	}
	
	skip = list_for.length + 3;
	console.log(skip);
	i = 0; //find for
	j = 0;

	while(list[i] != "for"){
		i++;
	}

	list.splice(i, skip);
	//skip -= 3;
	return skip;
}

function IF(list, list_if){
	var i = 0; //find for
	while(list[i] != "if"){
		i++;
	}
	
	list.splice(i, 1);
	
	while(list[i] != 'if_end'){
		list_if.push(list[i]);
		list.splice(i, 1);
	}

	list.splice(i, 1);

	return list_if;
	
}

function addItem(t){
	
	if(t==-1){
		itemList[j]="l";
		document.getElementById("listbutp").innerHTML+="<img class='arrow l' src='media/images/left_1.png' width='150px'>";
	} else if(t==1){
		itemList[j]="r";
		document.getElementById("listbutp").innerHTML+="<img class='arrow r' src='media/images/right_1.png'  width='150px'>";
	} else if(t==0){
		itemList[j]="m";
		document.getElementById("listbutp").innerHTML+="<img class='arrow m' src='media/images/move_1.png'  width='150px'>";
		
	} else if(t==2){
		bin++;
		if (bin % 2){
			itemList[j] = 'for';
			check_for = 1;
			let iterations = prompt('how many iterations ?', 1);
			For_start(itemList, iterations, j);
			j++;
			document.getElementById("listbutp").innerHTML+="<img class='arrow for' src='media/images/for.png'  width='150px'>";

		} else {
			itemList[j] = 'end';
			//For(itemList);
			document.getElementById("listbutp").innerHTML+="<img class='arrow for_end' src='media/images/for_end.png'  width='150px'>";
			// for [4] m end m l r 
			// for()
			// solved 
		}
	} else if(t==3){
		bin_if++;

		switch(direction){
			
			case 0:
				vision = document.querySelector('[posX = "' + (+bird_coordinates[0] + 1) + '"][posY = "' + (+bird_coordinates[1]) + '"] ');
				break;
			
			case 1:
				vision = document.querySelector('[posX = "' + (+bird_coordinates[0]) + '"][posY = "' + (+bird_coordinates[1] - 2) + '"] ');
				break;
			
			case 2:
				vision = document.querySelector('[posX = "' + (+bird_coordinates[0] - 2) + '"][posY = "' + (+bird_coordinates[1]) + '"] ');
				break;
			
			case 3:
				vision = document.querySelector('[posX = "' + (+bird_coordinates[0]) + '"][posY = "' + (+bird_coordinates[1] + 2) + '"] ');
				break;

		}


		if (bin_if % 2){
			itemList[j] = 'if';
			check_if = 1;
			document.getElementById("listbutp").innerHTML+="<img class='arrow if' src='media/images/if_2.png'  width='150px'>";

		} else {
			itemList[j] = 'if_end';
			document.getElementById("listbutp").innerHTML+="<img class='arrow if_end' src='media/images/if_end.png'  width='150px'>";
						
		}

	}

	j++;
	
}

let initX = 1, initY = 8;

function howl(){
	mySound.play();
}

function reset(){
    j = 0;
    bin = 0;
    bin_if = 0;
    checker = 0;
    itemList = [];
    dmg = 0;
	document.getElementById("listbutp").innerHTML="";
	bird_coordinates = [];
	
	if (bird.length != 0){
		bird[0].classList.remove("bird_right");
		bird[0].classList.remove("bird_up");
		bird[0].classList.remove("bird_down");
		bird[0].classList.remove("bird_left");
	};

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
    return itemList;
}

function win(kakoitoparametr){

	if (kakoitoparametr == 1){
		document.getElementById('winlose').innerHTML = 'Are you winning son ? <br> Oh, yes, you just completed this level';
		document.getElementById('hidden2').value = restring;
	} else if (kakoitoparametr == 0){
		document.getElementById("hidden").value = "";
		document.getElementById('winlose').innerHTML = 'Son?..(ha-ha u lost)';
	} else if (kakoitoparametr == 2){
		document.getElementById("hidden").value = "";
		document.getElementById('winlose').innerHTML = 'You almost killed him! Try harder son..';
	} else if (kakoitoparametr == 3){
		document.getElementById("hidden2").value = restring;
		document.getElementById('winlose').innerHTML = 'You just found the weak spot and beated the developer, oh my... <br> Oh, yes, you just completed this level';
	}

	modal.style.display = "block";

	enableButtons();
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

document.getElementById("myButton").addEventListener("click", howl);
document.getElementById("myButton").onclick = function() {

	disableButtons();
	
	setTimeout(function(){
		
		if (checker == 1){
			for(let i = 0; i < itemList_solved.length; i++){
			    itemList.push(itemList_solved[i]);
			}
		}

		document.getElementById("hidden").value = itemList.toString();


		let bufer_list = [];
		bufer_list = itemList;
		itemList = bufer_list.filter(function () {return true});
		

		for(var item of itemList){
			if (item > 0){
				real_length--;
			} else {
				real_length++;
			}
		}

		dmg = real_length * 10;


		move_forward(initX, initY, itemList, step);
		i=0}, 1000);
		
	
	};


function enableButtons(){
	document.getElementById('listbutp').innerHTML = '';
	for(k=0; k<6; k++){
		document.getElementsByClassName('btn-class')[k].disabled = false;
		document.getElementsByClassName('btn-class')[k].style.cursor = 'pointer';
		document.getElementsByClassName('btn-class')[k].style.borderColor="#1bb5a3";
		document.getElementsByClassName('btn-class')[k].style.backgroundColor="#1bb5a3"; 
	}
}

function disableButtons(){
	console.log(document.getElementsByClassName('btn-class'));
	for(k=0; k<6; k++){
		document.getElementsByClassName('btn-class')[k].disabled = true; 
		document.getElementsByClassName('btn-class')[k].style.cursor = 'default';
		document.getElementsByClassName('btn-class')[k].style.borderColor="#5a968f";
		document.getElementsByClassName('btn-class')[k].style.backgroundColor="#5a968f";
	}
}

function oops(){
	enableButtons();
	alert('Oops, can’t go in there !');
	reset();
}
