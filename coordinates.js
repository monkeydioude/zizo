/**
 * Coordinates is used to convert isometric's {x:y} coordinates
 * into Canvas' {x:y} coordinates.
 * Can add Camera coordinates in the conversion.
 * 
 * {icX:icY} describes which {x:y} isometric coordinates the Camera looks at.
 * 
 * {ccX:ccY} describes where the Camera looks at (most likely the center) will be drawn on the canvas.
 * 
 * @param {int} icX isometric X coordinates of the Camera
 * @param {int} icY isometric Y coordinates of the Camera
 * @param {int} ccX canvas X coordinates where the Camera looks at will be drawn
 * @param {int} ccY canvas Y coordinates where the Camera looks at will be drawn
 */
var Coordinates = function(icX, icY, ccX, ccY, tileW, decalX, decalY) {
    this.start = {
        x: 0,
        y: 0
    };
    if (icX === undefined || icY === undefined) {
        icX = 0;
        icY = 0;
    }
    if (ccX === undefined || ccY === undefined) {
        ccX = 0;
        ccY = 0;
    }
    if (tileW === undefined) {
        tileW = 64;
    }
    if (decalX === undefined) {
        decalX = 0
    }
    if ( decalY === undefined) {
        decalY = 0
    }
    this.icX = icX;
    this.icY = icY;
    this.ccX = ccX;
    this.ccY = ccY;
    this.tileW = tileW;
    this.decalX = decalX;
    this.decalY = decalY;
}

/**
 * computeCenter computes icX & icY with ccX & ccY to determine
 * where the graphic engine will start drawing the isometric grid.
 * 
 * @return {this}
 */
Coordinates.prototype.computeCenter = function() {
    this.start = {
        x: this.ccX - this.decalX + ((this.icY - this.icX) * this.decalX),
        y: this.ccY - ((this.icX + this.icY) * this.decalY)
    }
    return this;
}

Coordinates.prototype.getStart = function () {
    return this.start;
}

/**
 * fromTileCoordinates computes and returns the canvas {x:y} coordinates
 * of an isometric tile, from its isometric {x:y} coordinates.
 * 
 * @param {int} x
 * @param {int} y
 */
Coordinates.prototype.fromTileCoordinates = function(x, y) {

    return {
        x: this.start.x + (x * this.tileW) - ((x + y) * this.decalX),
        y: this.start.y + ((x + y) * this.decalY)
    }
}

module.exports = Coordinates;
