let port, reader, writer;
const col = { r: 0, g: 0, b: 0 }

let width = 1000;
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
	//flexibleSystem(col.r, col.g, col.b);
	flexibleSystem(col.r, col.g, col.b);
	//windowResized();
	
	// DEBUG
	// console.log('red' + col.r);
	// console.log('green' + col.g);
	// console.log('blue' + col.b);


}







function flexibleSystem(a, b, c){

	
	//////////////// FLEXIBLE SYSTEM ////////////////
	const taille = 50;
	const numX = 16;
	const numY = 16;
	
	// creates seeds 
	const seed = a + b + c; 
	console.log('seed = ' + seed);

	//map(a, 0, 255,0, taille/2);
	
	a1 = a + Math.sqrt(a + b);
	b1 = b + Math.sqrt(c + a);
	c1 = c + Math.sqrt(a+b);
	console.log('a1 ='+ a1);

	let translateTest = 50;
	
	//translate(width / 2, height / 2);
	//strokeWeight(strokeW);

	translate(translateTest,translateTest);	
	randomSeed(seed);
	strokeWeight(1);
	
	for( let j =0; j<numY; j++) {
		for( let i =0; i<numX; i++) { // 
			
		const x = i*taille;
		const y = j*taille;

		
		//rotate(frameCount * 0.01);
		//nofill();
		//translate(width/2, translateTest/2);
		stroke(0)
		fill(a,b,c);
		arc(random(x) + c1 , random(y) + c1, taille/2, taille/2, 0, (PI + HALF_PI)* (c1), PIE);
		//pop();
		
		stroke(0);
		fill(0);

		//ellipse(x+a1 ,a1+j,taille,taille);
		line(x +a1,y +b1, x, y + a1);
		// arc - https://editor.p5js.org/adudeinmid/sketches/SBac21Wue
		

		//text('#”‹--+*)(%&',x + b1, y);	



		
	}

	//background(col.r, col.g, col.b);

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