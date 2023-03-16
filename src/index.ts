import { Application, FederatedPointerEvent, Sprite } from 'pixi.js';
import { Room } from './Objects/Room';

const defaultSize = {
	width: 1080,
	height: 720,
};

const canvasElement = document.getElementById("pixi-canvas") as HTMLCanvasElement;

const rooms: Room[] = [];

rooms.push(new Room('Room 1', 245, 225, 194, 76));

const app = new Application({
	view: canvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: defaultSize.width,
	height: defaultSize.height,
});

const background: Sprite = Sprite.from("back.jpg");
background.interactive = true;
// background.width = defaultSize.width;
// background.height = defaultSize.height;

app.stage.addChild(background);

for (const room of rooms) {
	app.stage.addChild(room);
}

app.stage.once('click', onClick);

function onClick(event: FederatedPointerEvent) {
	const target = event.target;

	for (const room of rooms) {
		const {infoWindow} = room;

		if (infoWindow.visible) {
			if (infoWindow !== target && room.sprite !== target) {
				infoWindow.visible = false;
				console.log(true);
			}
		}
	}
};