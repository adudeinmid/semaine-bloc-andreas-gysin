let port, reader, writer;
const col = { r: 0, g: 0, b: 0 }
let width = 1000;
let height = 1000;
let color;

// ///ASCI CODE TEST///


// var options = [' ','`','.',',-',"':",';_~','"','*|','!l',
// '+=','>','<L','\\i','/^','1?','Jv','r','()cx','7}','sz',
// '3u','2Ckty{','jn','4FVY','5P[]af','qw','Sde','Eo',
// 'NOZ','9HXgh','GTU','$AIm','QW','KM','%8','#06@','bp',
// 'D','&','R','B'];


// ///ASCI CODE TEST///

//0,255 le chiffre 

async function setup() {
	
	cnv = createCanvas(windowWidth, windowHeight); //ASCII
	noLoop();
	({ port, reader, writer } = await getPort());
	loop();
	readArduino();
	//SEB'S CODE ABOVE //



}

///DON'T TOUCH THIS
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
///DON'T !

function draw() {

	background(255);
	flexibleSystem(col.r, col.g, col.b);
	
	// //ASCII
	// image(capture, 0, 0, width, height);
	// if (live) calcCapture();
	
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