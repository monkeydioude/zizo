import {XY} from 'gloop/xy'

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
export class Coordinates {
    start: XY = new XY(0, 0)
    constructor(
        public icX: number,
        public icY: number,
        public ccX: number,
        public ccY: number,
        public tileW: number,
        public decalX: number,
        public decalY: number) {
    }

    
    /**
     * computeCenter computes icX & icY with ccX & ccY to determine
     * where the graphic engine will start drawing the isometric grid.
     * 
     * @return {this}
     */
    computeCenter(): Coordinates {
        this.start.x = this.ccX + ((this.icY - this.icX) * this.decalX)
        this.start.y = this.ccY - ((this.icX + this.icY) * this.decalY)
        return this
    }

    getStart(): XY {
        return this.start
    }

    /**
     * fromTileCoordinates computes and returns the canvas {x:y} coordinates
     * of an isometric tile, from its isometric {x:y} coordinates.
     * 
     * @param {int} x
     * @param {int} y
     * @returns {XY}
     */
    fromTileCoordinates(x: number, y: number): XY {
        // magic +1 in X coordinqte is not magical. Needed because canvas draw using standard x,y coordinates
        // to draw its image as rectangle from top left corner, but our tiles are not Rectangles,
        // they are Diamonds and the "top left" corner equivalent to a diamond 
        // is actually the "top middle" corner, so we need to start drawing X coordinate 1 decalX before.
        return new XY(
            this.start.x + (x * this.tileW) - ((x + y + 1) * this.decalX),
            this.start.y + ((x + y) * this.decalY)
        )
    }
}
