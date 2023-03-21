import { Container, Graphics, Sprite, Texture } from "pixi.js";
import { Coords } from "./Coords";
import { InfoWindow } from "./InfoWindow";

export class Room extends Container {
    title: string;
    coords: Coords;
    sprite: Sprite;
    infoWindow: InfoWindow;
    constructor (
        title: string,
        width: number,
        height: number,
        x: number,
        y: number
    ) {
        super();
        this.title = title;
        this.width = width;
        this.height = height;

        this.coords = this.addCoords(x, y);
        this.sprite = this.addSprite(width, height);
        this.infoWindow = new InfoWindow(`${this.title} infoWindow`, this.sprite);

        this.addChild(this.sprite);
        this.addChild(this.infoWindow);

        this.addBorder(this.sprite);
    };

    addCoords(x: number, y: number) {
        const coords = new Coords(x, y);

        this.position.x = coords.x;
        this.position.y = coords.y;

        return coords;
    };

    addSprite(width: number, height: number) {
        const sprite = new Sprite(Texture.WHITE);

        sprite.alpha = 0;
        sprite.width = width;
        sprite.height = height;

        sprite.interactive = true;
        sprite.on('click', this.onClickSprite);

        return sprite;
    };

    addBorder(object: Container) {
        const border = new Graphics();
        border.lineStyle(2, 0xFF0000);
        border.drawRect(object.x - 1, object.y - 1, object.width + 2, object.height + 2);

        this.addChild(border);
    };

    onClickSprite = () => {
        this.infoWindow.visible = true;
    };

    showinfo() {
        console.log(`${this.title} coords: ${this.position.x}, ${this.position.y}`);
    };
}