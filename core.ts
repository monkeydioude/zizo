import {DisplayUpdater} from "../gloop/updater/displayUpdater"
import {Updater} from "../gloop/updater/updater"
import {Loader} from "../gloop/assets/loader"
import {Isometric} from "./isometric"

export class Core {
    constructor(
        public displayUpdater: DisplayUpdater,
        public dataUpdater: Updater,
        public assets: Loader,
        public isometric: Isometric
        ){}

    getDisplayUpdater(): DisplayUpdater {
        return this.displayUpdater
    }
    getDataUpdater(): Updater {
        return this.dataUpdater
    }
    getAssetsLoader(): Loader {
        return this.assets
    }
    getDisplayEngine(): Isometric {
        return this.isometric
    }
}