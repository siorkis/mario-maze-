let field = document.createElement('div');
field.id = 'field';
document.body.appendChild(field);
field.classList.add('field');

for (let i = 1; i < 65; i++){
	let excel = document.createElement('div');
	field.appendChild(excel);
	excel.classList.add('excel');
}

let excel = document.getElementsByClassName('excel');

let x = 1, 
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

const bird = document.querySelector('#bird'); 
const pig = document.querySelector('#pig'); 

const obstacle1 = document.querySelector('#obst1');
const obstacle2 = document.querySelector('#obst2');
const obstacle3 = document.querySelector('#obst3');
const obstacle4 = document.querySelector('#obst4');

for (let i = 0; i < 64; i++){
	excel[i].ondragover = allowDrop;
	excel[i].ondrop = drop;
}

function allowDrop(event) {
	event.preventDefault();
}

pig.ondragstart = drag;
bird.ondragstart = drag;
obstacle1.ondragstart = drag;
obstacle2.ondragstart = drag;
obstacle3.ondragstart = drag;
obstacle4.ondragstart = drag;


let a = document.getElementById('field').children;
console.log(a);

function del(){

}

function drag(event){
			event.dataTransfer.setData('id', event.target.id);
}
var cloneid=0;

let itemId;
let itemIdBuffer;
let clone;

function drop(event){
	itemId = event.dataTransfer.getData('id');
		
	if(itemId=="") itemId=clone.id;
	
	if (itemId == 'obst1' | itemId == 'obst2' | itemId == 'obst3'  | itemId == 'obst4' ){
		
		if ( event.target.nodeName !== "IMG") {
			clone = document.getElementById(itemId).cloneNode(true);
			// console.log(clone);
			// console.log(itemId);
			clone.id=itemId+""+cloneid;
			cloneid++;
	        event.target.append(clone); 
			document.getElementById(clone.id).ondragstart = drag;

	    }
	}else{
		if ( event.target.nodeName !== "IMG" ) {
	        this.append(document.getElementById(itemId)); 
	        console.log(itemId);
	    }
	}	
}


function save(){
	var i=0;
	var stage = "";
	var counter = 0;
	for(i=0; i<64; i++){
		if(excel[i].contains(bird)){
			counter++;
			stage += '1'+i+"k";
		} 
		else if(excel[i].contains(pig)){
			counter++;
			stage += '2'+i+"k";
		} 
		else if(excel[i].firstChild){
			if(excel[i].firstChild.id.charAt(4) =='3') stage += '3'+i+"k";
			else if(excel[i].firstChild.id.charAt(4) =='1') stage += '4'+i+"k";
			else if(excel[i].firstChild.id.charAt(4) =='2') stage += '5'+i+"k";
			else if(excel[i].firstChild.id.charAt(4) =='4') stage += '6'+i+"k";
			
		}
		// else stage += '0';

	}
	if(counter == 2){
		document.getElementById('stage_info').value = stage;
		counter = 0;
	} else {
		counter = 0;
		alert("You need to have the mario and the bowser!")
	}
	
	
}	


