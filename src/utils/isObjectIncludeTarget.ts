import { FederatedEventTarget, DisplayObject } from "pixi.js";

export default function objectIncludeTarget(target: FederatedEventTarget, rootObject: DisplayObject | FederatedEventTarget): boolean {
    if (target === rootObject) {
        return true;
    }

    if (rootObject.children) {
        for (const child of rootObject.children) {
            if (objectIncludeTarget(target, child)) {
                return true;
            }
        }
    }

    return false;
}