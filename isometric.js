var Updater = require('../updater'),
    Objects = require('./objects');

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
var Isometric = function(renderer, displayUpdater, dataUpdater, camera, config) {
    this.renderer = renderer;
    this.displayUpdater = displayUpdater;
    this.dataUpdater = dataUpdater;
    this.map = [];
    this.camera = camera;
    this.config = config;
    this.objectUpdater = new Updater("iso");
    this.objects = new Objects();
}

/**
 * start must be run after Isometric engine's declaration in order
 * to work.
 */
Isometric.prototype.start = function() {
    this.displayUpdater.add("PLAY", this.renderMap.bind(this), "isometricEngineMapDisplay");
    this.dataUpdater.add("PLAY", this.updateObjectPositions.bind(this), "isometricUpdateObjectPosition");
    this.displayUpdater.add("PLAY", this.renderObjects.bind(this), "isometricRenderObjects");
}

Isometric.prototype.setMap = function(map) {
    this.map = map;
}

/**
 * renderMap is called by the displayUpdater of the Loop to renders the map.
 * Might change to be working with the "renderObjects" function
 * 
 * @return {int}
 */
Isometric.prototype.renderMap = function() {
    for (y = 0; y < this.map.map.length; y++) {
        for (x = 0; x < this.map.map[y].length; x++) {
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
 * @return {int}
 */
Isometric.prototype.renderObjects = function() {
    var objs = null;
    for (var x in this.objects.objects) {
        for (var y in this.objects.objects[x]) {
            for (var z in this.objects.objects[x][y]) {
                x = parseInt(x);
                y = parseInt(y);
                z = parseInt(z);
                objs = this.objects.get(x, y, z);
                if (!objs) {
                    continue;
                }
                for (i = 0; i < objs.length; i++) {
                    this.drawImage(objs[i], x, y);
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
 * @param {int} T amount of seconds passed from last Loop iteration
 */
Isometric.prototype.updateObjectPositions = function(T) {
    this.objects = new Objects();
    // Object entity passed in every update callbacks
    this.objectUpdater.update("PLAY", T, this.objects);
    return 1;
}

/**
 * drawImage draws an image on the scene using isometric {x:y} coordinates
 * 
 * @param {Image} img
 * @param int x
 * @param int y
 */
Isometric.prototype.drawImage = function(img, x, y) {
    if (img === undefined || img === null) {
        return 1;
    }
    var coords = this.camera.getCoordinates().fromTileCoordinates(x, y);
    //coords contain canvas {x:y} coordinates
    this.renderer.drawImage(img, coords.x, coords.y, this.config.tileW, this.config.tileH);
}

Isometric.prototype.getObjectUpdater = function() {
    return this.objectUpdater;
}
 
module.exports = Isometric;
