export class Map {
    map: any = []

    constructor(public matrix: any, public assets: any) {}

    loadMap(): void {
        for (let x = 0; x < this.matrix.length; x++) {
            this.map[x] = [];
            for (let y = 0; y < this.matrix[x].length; y++) {
                this.map[x][y] = this.assets.get(this.matrix[x][y]);
            }
        }
    }
}