let port, reader, writer;
const col = { r: 0, g: 0, b: 0 }

let width = 1800;
let height = 1000;

let color;

// let rSlider, gSlider, bSlider;

// let magicSlider;


async function setup() {
	createCanvas(windowWidth, windowHeight);
	noLoop();
	({ port, reader, writer } = await getPort());
	loop();
	readArduino();
	//SEB'S CODE ABOVE //



}

async function readArduino() {
	try {
		while (true) {
			const { value, done } = await reader.read();
			Object.assign(col, JSON.parse(value));

			if (done) {
				// Allow the serial port to be closed later.
				reader.releaseLock();
				break;
			}

		}
	} catch (e) { console.error(e) }
	requestAnimationFrame(readArduino)
}

// function setup(){
// 	createCanvas(width, height);
// 	//capture = createCapture(VIDEO);
// 	//capture.hide();
// 	//frameRate(25);

// 	//console.log(createCapture);

// 	rSlider = createSlider(0, 255, 100);
// 	rSlider.position(width/6, height*0.03);
// 	rSlider.addClass("mySliders");
	
// 	gSlider = createSlider(0, 255, 0);
// 	gSlider.position(width/6 + 100, height*0.03);
// 	gSlider.addClass("mySliders");
   
// 	bSlider = createSlider(0, 255, 255);
// 	bSlider.position(width/6 + 200, height*0.03);
// 	bSlider.addClass("mySliders");

   

// }

function draw() {

	background(col.r, col.g, col.b);
	flexibleSystem();
	//windowResized();
	console.log('red' + col.r);


}







function flexibleSystem(){

	////////////////// CAMERA ////////////////
	//
	////the camera detects a random color in the room and outputs 4 values (r,g,b,a);
	//if (capture.loadedmetadata) {
	//let c = capture.get(0, 0, 100, 200);        
	//}
//
	//let color = capture.get(50,50);
	////let colorInvert;  https://editor.p5js.org/awdriggs/sketches/KMOpsQfDz - color invert
//
	////////////////// CAMERA ////////////////


	// const r = rSlider.value();
	// const g = gSlider.value();
	// const b = bSlider.value();

	// //const magic = magicSlider.value();
	// const magic = rSlider.value() + gSlider.value() + bSlider.value();
	// //console.log(magic);

	//console.log(magicSlider.value());

	
	
	
	//////////////// FLEXIBLE SYSTEM ////////////////
	const taille = 50;
	const numX = width/ taille;
	const numY = height/ taille;
	
	const seed = col.r+ col.g + col.b;




	randomSeed(seed);

	console.log(seed);

	strokeWeight(1);
	
	for( let j =0; j<numY; j++) {
		for( let i =0; i<numX; i++) { // 
			
		const x = i*taille;
		const y = j*taille;

		stroke(0);
		fill(0);

		ellipse(x,y,taille/2,taille/2);

				   
		if( random(seed) < seed/2 ){
		 
		
			// ellipse(x,y,taille/2,taille/2);
			// line(x +taille,y, x, y + taille); 
		
				
		} else {

			push();
			noFill();
			//triangle(x, y, taille, taille, random(width,height), random(width/2,height/2));
			//ellipse(x,y,taille,taille);
			strokeWeight(4);
			//line(x +taille,y, x, y + taille); 
			pop();     
		}
		
	}


}

//rect(width/2,height/2,50,50)

//image(capture, width+40, 0, width/9, (width * capture.height / capture.width)/9);
//image(capture, 0, 0, width/9, (width * capture.height / capture.width)/9);

}

function keyTyped(){

if (key === 's') {

	saveCanvas('selfie', 'png', 1, 25);
	console.log('typed s')
}

}


function windowResized() {
resizeCanvas(windowWidth, windowHeight);
}