import {Coordinates} from './coordinates'

export class Camera {
    constructor(public coord: Coordinates) {
        this.coord.computeCenter();
    }

    setX(x: number): void {
        this.set(x, this.coord.icY);
    }

    setY(y: number): void {
        this.set(this.coord.icX, y);
    }

    set(x: number, y: number): void {
        this.coord.icX = x;
        this.coord.icY = y;
        this.coord.computeCenter();
    }

    addX(x: number): void {
        this.add(x, 0)
    }

    addY(y: number): void {
        this.add(0, y)
    }

    add(x: number, y: number): void {
        this.coord.icX += x;
        this.coord.icY += y;
        this.coord.computeCenter();
    }

    getCoordinates(): Coordinates {
        return this.coord;
    }
}
