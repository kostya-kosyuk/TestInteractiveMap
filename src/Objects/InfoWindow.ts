import { Container, Sprite, Text, Graphics, DisplayObject } from "pixi.js";

const margin = 5;
const padding = 10;
const borderRadius = 10;

export class InfoWindow extends Container {
    title: string;
    background: Graphics;
    info: Container[];

    constructor(title: string, sprite: Sprite) {
        super();
        this.title = title;
        this.x = sprite.x + sprite.width + margin;
        this.y = sprite.y;

        this.info = [];

        this.visible = false;

        // Створюємо графічний об'єкт для фону
        this.background = this.addBackground();

        this.addInfoText("++Information++");

        this.addChild(this.background);
        this.addChild(...this.info);

        this.info.forEach(info => {
            this.resize(info);
        });

    }

    addInfoText(text: string) {
        const infoText = new Text(text);

        this.info.push(infoText);

        return infoText;
    };

    addBackground() {
        const background = new Graphics();

        background.beginFill(0xffffff);
        background.drawRoundedRect(0, 0, 200, 100, borderRadius);
        background.endFill();

        background.interactive = true;

        return background;
    };

    resize(object: Container) {
        const width = object.width;
        const height = object.height;

        this.background.width = width + padding * 2;
        this.background.height = height + padding * 2;

        object.position.set(padding, padding);
    }
}