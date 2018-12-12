import {Renderer} from "gloop/renderer"
import {Updater} from "../gloop/updater/updater"
import {Camera} from "./camera"
import {Objects} from "./objects"
import {Asset} from "gloop/assets/asset"

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
        this.objectUpdater = new Updater();
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
                this.renderObject(this.map.map[y][x], x, y);
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
    renderObjects(T: number) {
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
                        let obj = objs[i]
                        this.renderObject(obj.entity, obj.x, obj.y, T);
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
     * @param {Asset} asset
     * @param {number} x
     * @param {number} y
     */
    renderObject(asset: Asset, x: number, y: number, T?: number): number {
        if (asset === undefined || asset === null) {
            return 1;
        }
        var coords = this.camera.getCoordinates().fromTileCoordinates(x, y);
        asset.render(this.renderer, coords.x, coords.y, T);
    }

    getObjectUpdater(): Updater {
        return this.objectUpdater;
    }

    getRenderer(): Renderer {
        return this.renderer
    }

    getCamera(): Camera {
        return this.camera
    }
}
