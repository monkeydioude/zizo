export class zObj {
    constructor(public entity: any, public x: number, public y: number, public z: number) {}
}

export class Objects {
    objects: any = []
    zSafeThreshold: number = 3

    exists(x: number, y: number, z: number): boolean {
        return this.objects[x] != undefined
            && Array.isArray(this.objects[x])
            && this.objects[x][y] != undefined
            && Array.isArray(this.objects[x][y])
            && this.objects[x][y][z] != undefined;
    }

    get(x: number, y: number, z: number): any {
        return this.exists(x, y, z) ? this.objects[x][y][z] : null;
    }

    canAddObject(entity: any, x: number, y: number, z: number) {
        return entity !== undefined 
            && x != undefined 
            && y != undefined 
            && z != undefined;
    }

    prepareObjectsArray(x: number, y: number) {
        if (this.objects[x] === undefined) {
            this.objects[x] = [];
            this.objects[x][y] = [];
            return;
        }

        if (this.objects[x][y] === undefined) {
            this.objects[x][y] = [];
        }
    }

    add(entity: any, x: number, y: number, z?: number): boolean {
        let rx = x << 0,
            ry = y << 0

        if (z === undefined) {
            z = 0
        }
        z += this.zSafeThreshold
        if (!this.canAddObject(entity, rx, ry, z)) {
            return false
        }

        this.prepareObjectsArray(rx, ry)
        if (this.objects[rx][ry][z] === undefined) {
            this.objects[rx][ry][z] = []
        }

        this.objects[rx][ry][z].push(new zObj(entity, x, y, z))
        return true
    }
}