var Map = function(matrix, assets) {
    this.matrix = matrix;
    this.map = [];
    this.assets = assets;
}

Map.prototype.loadMap = function() {
    for (x = 0; x < this.matrix.length; x++) {
        this.map[x] = [];
        for (y = 0; y < this.matrix[x].length; y++) {
            this.map[x][y] = this.assets.get(this.matrix[x][y]);
        }
    }
}

module.exports = Map;