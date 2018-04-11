var hg;
var huGd;
var gridCoords = [[10,10],[320,10],[630,10],[10,220],[320,220],[630,220],[10,430],[320,430],[630,430]];
function setup(){

  createCanvas(940, 640);     // Initial window size when we built it
  background(0);
  colorMode(HSB);
    
    
  huGd = Array(9);
    
  huGd[0] = new HueGrid(10,10,genePool[0]);
  huGd[1] = new HueGrid(320,10,genePool[1]);
  huGd[2] = new HueGrid(630,10,genePool[2]);
  huGd[3] = new HueGrid(10,220,genePool[3]);
  huGd[4] = new HueGrid(320,220,genePool[4]);
  huGd[5] = new HueGrid(630,220,genePool[5]);
  huGd[6] = new HueGrid(10,430,genePool[6]);
  huGd[7] = new HueGrid(320,430,genePool[7]);
  huGd[8] = new HueGrid(630,430,genePool[8]);
  noStroke(); 
}
function draw(){
    background(0);
	for(let i = 0; i<huGd.length; i++){
		huGd[i].display();
	}
}

//handles keyTyped event
function keyTyped(){
//reset the top left dude 
var index = mouseCheck();
 if(key == 'r'){
   // console.log("r"); 
    genePool[index] = makeNewGrid();//return a new chromosme for the top left
    huGd[index] = new HueGrid(gridCoords[index][0],gridCoords[index][1],genePool[index]);
	 fitness[index] = 0; //since it has been reset the fitness at that index is also reset
    
 }
//mutate the top left
if(key == 'm'){
   // console.log("m");
    genePool[index] = mutate(genePool[index]);
    huGd[index] = new HueGrid(gridCoords[index][0],gridCoords[index][1],genePool[index]);
	fitness[index] = 0; //since it has been reset the fitness at that index is also reset
}
    
if(key == '+' || key == "="){
 console.log("more fit grid:" + mouseCheck());
  
  goodTrait(mouseCheck());
  mostFavorableGrid();//update ui with most favorable grid  
}
if(key == "-"){
 console.log("Less fit grid:" + mouseCheck());  
   badTrait(mouseCheck());
   mostFavorableGrid();  
}
if(key == 'b'){
	breed();b
}
      
}

//handles mouse click events
function mouseClicked(){
	//add a parent
	if(parents.length == 2){
		parents.shift();
		parents.push(mouseCheck());
		document.getElementById("p1").innerHTML = "Grid #" + parents[0];
		document.getElementById("p2").innerHTML = "Grid #" + parents[1];
		document.getElementById('babyButton').disabled = false;
	}
	else{
		parents.push(mouseCheck());
		document.getElementById("p1").innerHTML = "Grid #" + parents[0];
		document.getElementById("p2").innerHTML = "Grid #" + parents[1];
	}
	//console.dir(parents);
}

//returns the index of the grid the mouse is over
function mouseCheck(){
    if(pmouseX < 310){
        if(pmouseY < 212 && pmouseY > 0){
          //console.log("grid 0"); 
            return 0;
        }
        if(pmouseY > 212 && pmouseY < 420){
          //console.log("grid 3"); 
            return 3;
        }
        if(pmouseY > 420){
          //console.log("grid 6");
            return 6;
        }
    }
    if(pmouseX >310 && pmouseX < 640){
        if(pmouseY < 212){
          //console.log("grid 1"); 
            return 1;
        }
        if(pmouseY > 212 && pmouseY < 420){
          //console.log("grid 4");
            return 4;
        }
        if(pmouseY > 420){
          //console.log("grid 7");
            return 7;
        }
    }
    if(pmouseX > 640){
         if(pmouseY < 212){
          //console.log("grid 2");  
             return 2;
        }
        if(pmouseY > 212 && pmouseY < 420){
          //console.log("grid 5");  
            return 5;
        }
        if(pmouseY > 420){
         // console.log("grid 8"); 
            return 8;
        }
    }
}
window.onload = function(){
	alert("Welcome to Genetic Algoritm visualizer! \n\nHover over a grid and press 'r' to reset that grid \n\nHover and press 'm' to mutate a grid\n\nClick on a grid to add it as a parent. Once two parents have been selected you can breed them and their child will appear in grid 0.");
}