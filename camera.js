var Camera = function(coord) {
    this.coord = coord;
    this.coord.computeCenter();
}

Camera.prototype.setX = function(x) {
    this.set(x, this.coord.icY);
}

Camera.prototype.setY = function(y) {
    this.set(this.coord.icX, y);
}
Camera.prototype.set = function(x, y) {
    this.coord.icX = x;
    this.coord.icY = y;
    this.coord.computeCenter();
}

Camera.prototype.addX = function(x) {
    this.add(x, 0)
}

Camera.prototype.addY = function(y) {
    this.add(0, y)
}

Camera.prototype.add = function(x, y) {
    this.coord.icX += x;
    this.coord.icY += y;
    this.coord.computeCenter();
}
Camera.prototype.getCoordinates = function () {
    return this.coord;
}

module.exports = Camera;