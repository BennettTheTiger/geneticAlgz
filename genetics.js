var genePool = [];//holds the genes for all of the grids 10 is the master race gene sequence
var fitness = [];
var parents = ["Not Selected","Not Selected"];//holds an array of two parents
 
for(var i = 0; i < 9; i++){
     genePool[i] = makeNewGrid();//returns a new random chromosome  
 }

for(var i = 0; i < 9 ; i++){
  fitness[i] = 0;  
}

//handles the genetics for the hueGrids
var mutateKey = [25,100,360,2,4];

//make a random chromosome
function makeNewGrid(){
 var chromosome = [5];
 chromosome[0] = Math.floor(Math.random()*25);//how much each cell can deviate
 chromosome[1] = Math.floor(Math.random()*100);//how saturated the blocks are
 chromosome[2] = Math.floor(Math.random()*360);//max saturation value 
 chromosome[3] = Math.floor(Math.random()*2);//cirlce or square
 chromosome[4] = Math.floor(Math.random()*4);//what kind of art style
    
    return chromosome;
}

//get a chromosome to mutate
function mutate(chromo){
    var mutateIndex = Math.floor(Math.random()*chromo.length);//pick a random index to mutate
    chromo[mutateIndex] = Math.floor(Math.random()*mutateKey[mutateIndex]);//make a new random number for one gene in the chromosome
    return chromo;//give back the chromosome
}

//Makes a child in the 0 grid spot
function makeBaby(){
	//console.dir(genePool[parents[0]]);//see dad
	//console.dir(genePool[parents[1]]);//see mom
	var tempChromo = [];
	for(var i = 0; i < mutateKey.length; i++){
  		tempChromo[i] = Math.round(mixGene(genePool[parents[0]][i],genePool[parents[1]][i]));
	}
	genePool[0] = tempChromo;
	huGd[0] = new HueGrid(gridCoords[0][0],gridCoords[0][1],genePool[0]);
	//console.dir(genePool[0]);//see child
}

//get the avg of the two genes
function mixGene(p1,p2){
	return (p1 + p2)/2;
}

//favorable traits
function goodTrait(gridIndex){
    fitness[gridIndex]++;
}
//infavorable traits
function badTrait(gridIndex){
    fitness[gridIndex]--;
}
//returns the most favorable grid index
function mostFavorableGrid(){
    var bestGrid = 0;
    var index = 0;
    for(var i = 0; i < fitness.length; i++){
        if(fitness[i] > bestGrid){
         bestGrid = fitness[i];
         index = i;
        }
    }
    //console.log("Most favorable grid is grid:" + index);
	document.getElementById("favGrid").innerHTML = "Grid #" + index;
    return index;
}

function newGen(){
	console.log("making new gernation");
	var mostFitIndex = mostFavorableGrid();
	for(var j = 0; j < fitness.length; j++){
		if(j == mostFitIndex){
			console.log("Dont mutate grid" + j);
		}
		else{
				//make a new grid baby from most elite grid and each grid
				var tempChromo = [];
				for(var i = 0; i < mutateKey.length; i++){
					tempChromo[i] = Math.round(mixGene(genePool[mostFitIndex][i],genePool[j][i]));
				}
				genePool[j] = tempChromo;
				genePool[j] = mutate(genePool[j]);//mutate the new generation to keep some variation over several generations
				fitness[j] = 0; //reset a new grids fitness
				//gridCoords[gridNum][x:0 or y:1];
				huGd[j] = new HueGrid(gridCoords[j][0],gridCoords[j][1],genePool[j]);
			}
	}
	console.log("Done");
}//end new generation

