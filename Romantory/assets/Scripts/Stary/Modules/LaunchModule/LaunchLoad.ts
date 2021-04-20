import { CacheManager } from "../../../../Framework/Managers/CacheManager";
import { MainNeedLoadRes, ResType } from "../MainModule/MainConst";
import { LoadSkeletonData } from "./LaunchConst";

export default class LaunchLoad {
    private static instance: LaunchLoad = null;
    private loadResList: MainNeedLoadRes[] = [];
    private totalLoadNum: number = 0;
    private progressCallback;
    private compileCallback;
    public static getInstance() {
        if (this.instance == null) {
            this.instance = new LaunchLoad();
        }
        return this.instance;
    }

    /**开始加载*/
    public startLoad(progressCallback, compileCallback): void {
        this.totalLoadNum = this.loadResList.length;
        this.progressCallback = progressCallback;
        this.compileCallback = compileCallback;
        this.load();
    }

    /**加载 */
    private load(): void {
        let resInfo = this.loadResList.pop();
        if (resInfo) {
            this.loadRes(resInfo, (err: Error, asset: any) => {
                this.progressCallback((this.totalLoadNum - this.loadResList.length) / this.totalLoadNum);
                if (asset) {
                    CacheManager.Cache(resInfo.url, asset);
                }
                this.load();
            })
        } else {
            if (this.compileCallback) {
                this.progressCallback((this.totalLoadNum - this.loadResList.length) / this.totalLoadNum);
                this.compileCallback();
            }
        }
    }

    private loadRes(infos: MainNeedLoadRes, callback: Function): void {
        if (!infos.url) {
            callback();
            return;
        }
        if (infos.type == ResType.img) {
            cc.assetManager.loadRemote(infos.url, callback);
        } else {
            let imgUrl = infos.url + ".png";
            let atlasUrl = infos.url + ".atlas";
            let skeletonUrl = infos.url + ".json";
            cc.assetManager.loadRemote(imgUrl, (error: Error, texture: cc.Texture2D) => {
                cc.assetManager.loadRemote(atlasUrl, (error: Error, atlasText: cc.TextAsset) => {
                    cc.assetManager.loadRemote(skeletonUrl, (error: Error, skeletonJson: cc.JsonAsset) => {
                        let spSkeletonData: LoadSkeletonData = {
                            skeletonJson: skeletonJson.json,
                            atlasText: atlasText.text,
                            textures: [texture]
                        }
                        callback(error, spSkeletonData);
                    })
                })
            })
        }
    }

    /**需要加载的图片地址 */
    public setLoadResList(resList: MainNeedLoadRes[]): void {
        this.loadResList = resList;
    }

}