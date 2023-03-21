import { Application, FederatedPointerEvent, Graphics, ICanvas, Sprite, Texture } from 'pixi.js';
import { Room } from './Objects/Room';

import { SVG } from 'pixi-svg';

import objectIncludeTarget from './utils/isObjectIncludeTarget';

const defaultSize = {
	width: 1080,
	height: 720,
};

const canvasElement = document.getElementById("pixi-canvas") as HTMLCanvasElement;

const rooms: Room[] = [];

rooms.push(new Room('Room 1', 245, 225, 194, 76));
rooms.push(new Room('Room 2', 245, 223, 632, 76));
rooms.push(new Room('Room 3', 242, 190, 196, 430));
rooms.push(new Room('Room 4', 245, 215, 636, 414));

const app = new Application({
	view: canvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: defaultSize.width,
	height: defaultSize.height,
});

(globalThis as any).__PIXI_APP__ = app;

// main();
test();

function test() {
	const svgData = '<svg viewBox="0 0 24 24" width="96px" height="96px">    <path d="M22,3.999c-0.78,0.463-2.345,1.094-3.265,1.276c-0.027,0.007-0.049,0.016-0.075,0.023c-0.813-0.802-1.927-1.299-3.16-1.299 c-2.485,0-4.5,2.015-4.5,4.5c0,0.131-0.011,0.372,0,0.5c-3.353,0-5.905-1.756-7.735-4c-0.199,0.5-0.286,1.29-0.286,2.032 c0,1.401,1.095,2.777,2.8,3.63c-0.314,0.081-0.66,0.139-1.02,0.139c-0.581,0-1.196-0.153-1.759-0.617c0,0.017,0,0.033,0,0.051 c0,1.958,2.078,3.291,3.926,3.662c-0.375,0.221-1.131,0.243-1.5,0.243c-0.26,0-1.18-0.119-1.426-0.165 c0.514,1.605,2.368,2.507,4.135,2.539c-1.382,1.084-2.341,1.486-5.171,1.486H2C3.788,19.145,6.065,20,8.347,20 C15.777,20,20,14.337,20,8.999c0-0.086-0.002-0.266-0.005-0.447C19.995,8.534,20,8.517,20,8.499c0-0.027-0.008-0.053-0.008-0.08 c-0.003-0.136-0.006-0.263-0.009-0.329c0.79-0.57,1.475-1.281,2.017-2.091c-0.725,0.322-1.503,0.538-2.32,0.636 C20.514,6.135,21.699,4.943,22,3.999z"/></svg>';

	const svg = new SVG(svgData);

	svg.scale = {x: 7, y: 7};

	svg.interactive = true;

	svg.once('click', () => {
		svg.tint = 0xffaaaa;
		console.log('1');
	});

	app.stage.addChild(svg);
};

function main() {
	const background: Sprite = Sprite.from("back.jpg");
	background.interactive = true;

	app.stage.addChild(background);

	for (const room of rooms) {
		app.stage.addChild(room);
	}

	app.stage.once('click', onClick);
};

function onClick(event: FederatedPointerEvent) {
	const target = event.target;

	for (const room of rooms) {
		const {infoWindow} = room;

		if (infoWindow.visible) {
			if (!objectIncludeTarget(target, room)) {
				infoWindow.visible = false;
			}
		}
	}
};