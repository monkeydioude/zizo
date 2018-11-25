import {Renderer} from "gloop/renderer"
import {Updater} from "gloop/updater"
import {Camera} from "./camera"
import {Objects} from "./objects"

export class Isometric {
    map: any = []
    objectUpdater: Updater
    objects: any

    /**
     * Isometric is the main engine managing the isometric rendering of elements.
     * Must be used instead of the canvas Renderer directly
     * 
     * @param {Renderer} renderer 
     * @param {Updater} displayUpdater 
     * @param {Updater} dataUpdater 
     * @param {Camera} camera 
     * @param {config} config 
     */
    constructor(
        public renderer: Renderer,
        public displayUpdater: Updater,
        public dataUpdater: Updater,
        public camera: Camera
    ) {
        this.objectUpdater = new Updater("iso");
        this.objects = new Objects();
    }

    /**
     * start must be run after Isometric engine's declaration in order
     * to work.
     */
    start(): void {
        this.displayUpdater.add("PLAY", this.renderMap.bind(this), "isometricEngineMapDisplay");
        this.dataUpdater.add("PLAY", this.updateObjectPositions.bind(this), "isometricUpdateObjectPosition");
        this.displayUpdater.add("PLAY", this.renderObjects.bind(this), "isometricRenderObjects");
    }

    setMap(map: any): void {
        this.map = map;
    }

    /**
     * renderMap is called by the displayUpdater of the Loop to renders the map.
     * Might change to be working with the "renderObjects" function
     * 
     * @return {number}
     */
    renderMap(): number {
        for (let y = 0; y < this.map.map.length; y++) {
            for (let x = 0; x < this.map.map[y].length; x++) {
                if (!this.map.map[y][x]) {
                    continue;
                }
                this.drawImage(this.map.map[y][x], x, y);
            }
        }
        return 1;
    }

    /**
     * renderObjects is called by the displayUpdater of the Loop to renders various objects on the scene.
     * Use {x:y} coordinates to place the objects and 'z' value to determinate order of display on a same 
     * {x:y} coordinates.
     * 
     * @return {number}
     */
    renderObjects() {
        var objs = null;
        for (let x in this.objects.objects) {
            for (let y in this.objects.objects[x]) {
                for (let z in this.objects.objects[x][y]) {
                    let nx = parseInt(x);
                    let ny = parseInt(y);
                    let nz = parseInt(z);

                    objs = this.objects.get(nx, ny, nz);
                    if (!objs) {
                        continue;
                    }

                    for (let i = 0; i < objs.length; i++) {
                        this.drawImage(objs[i], nx, ny);
                    }
                }
            }
        }
        return 1;
    }

    /**
     * updateObjectPositions is called by the dataUpdater of the Loop.
     * Triggers the updates contained in the objectUpdater
     * 
     * @param {number} T amount of seconds passed from last Loop iteration
     */
    updateObjectPositions(T: number): number {
        this.objects = new Objects();
        // Object entity passed in every update callbacks
        this.objectUpdater.update("PLAY", T, this.objects);
        return 1;
    }

    /**
     * drawImage draws an image on the scene using isometric {x:y} coordinates
     * 
     * @param {Image} img
     * @param {number} x
     * @param {number} y
     */
    drawImage(img: any, x: number, y: number): number {
        if (img === undefined || img === null) {
            return 1;
        }
        var coords = this.camera.getCoordinates().fromTileCoordinates(x, y);
        img.render(this.renderer, coords.x, coords.y);
    }

    getObjectUpdater(): Updater {
        return this.objectUpdater;
    }
}
