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

    add(entity: any, x: number, y: number, z: number): boolean {
        if (z === undefined) {
            z = 0;
        }
        z += this.zSafeThreshold;
        if (!this.canAddObject(entity, x, y, z)) {
            return false;
        }

        this.prepareObjectsArray(x, y);
        if (this.objects[x][y][z] === undefined) {
            this.objects[x][y][z] = [];
        }
        this.objects[x][y][z].push(entity);
        return true;
    }
}