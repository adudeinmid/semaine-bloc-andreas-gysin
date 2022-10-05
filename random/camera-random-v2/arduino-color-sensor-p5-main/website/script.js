let port, reader, writer;
const col = { r: 0, g: 0, b: 0 }

async function setup() {
	createCanvas(windowWidth, windowHeight);
	noLoop();
	({ port, reader, writer } = await getPort());
	loop();
	readArduino();
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

function draw() {
	background(col.r, col.g, col.b)
}