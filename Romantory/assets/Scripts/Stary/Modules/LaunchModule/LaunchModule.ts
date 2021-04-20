/*
 * @Author: 
 * @Date: 2021-02-23 14:51:29
 * @Description: 
 * @LastEditTime : 2021-02-24 09:51:22
 * @FilePath: \RomantoryApp\assets\Scripts\Stary\Modules\LaunchModule\LaunchModule.ts
 */
import { FModule } from "../../../../Framework/Core/FModule";
import { IBinder } from "../../../../Framework/Interfaces/IBinder";
import { WebManager } from "../../../../Framework/Managers/WebManager";
import { HttpMethod } from "../../../../Framework/Network/Web/HttpMethod";
import { addEvent } from "../../../../Framework/Utility/dx/addEvent";
import { ConfigVO } from "../../Common/ConfigVO";
import DownImage from "../../Common/DownImage";
import PopupManager from "../../Common/Window/PopupManager";
import { BookShelfManager } from "../BookShelf/BookShelfManager";
import MainData from "../MainModule/MainData";
import LaunchBinder from "./LaunchBinder";
import { LoginString, Status } from "./LaunchConst";
import LaunchLoad from "./LaunchLoad";

export class LaunchModule extends FModule {
    public static ClassName: string = "LaunchModule";
    public get assets(): any[] { return ["LaunchModule/LaunchBinder"] };
    binder: LaunchBinder
    public constructor() {
        super();
        this.isNeedPreload = false;// 默认不需要预加载资源，只有使用了Mediator管理模块时才起作用
        this.isReleaseAsset = false;// true:销毁模块时释放资源   false:销毁模块时不释放资源
        this.delayReleaseAssetTime = 0;// 销毁模块时延时释放资源，单位ms
    }

    protected createViews(): void {
        super.createViews();
        BookShelfManager.initConfig();
        this.binder = new LaunchBinder();
    }

    protected initViews(): void {
        super.initViews();
        this.binder.setCurStatus(Status.check);
        this.binder.setLoadProgress(0);
        this.requestInit();
    }

    /**
    * 请求app启动加载接口
    * 测试网络通信
    */
    public async requestInit(): Promise<void> {
        let reqBannerUrl = ConfigVO.testURL + "banner";
        let testUrl: string = ConfigVO.testURL + "index";
        let result1: any = await WebManager.GetWebDataAsync(HttpMethod.GET, testUrl);
        let result2: any = await WebManager.GetWebDataAsync(HttpMethod.GET, reqBannerUrl);
        this.binder.setCurStatus(Status.loading);
        cc.log("result1", result1);
        cc.log("result2", result2);
        try {
            result1 = JSON.parse(result1);
            result2 = JSON.parse(result2);
            if (result1.code == 1 && result2.code == 1) {
                let blockData = result1.data.list;
                let bannerData = result2.data.list;
                MainData.setBlockData(blockData);
                MainData.setBannerData(bannerData);
                if (blockData && bannerData) {
                    let resList = MainData.getNeedLoadRes();
                    LaunchLoad.getInstance().setLoadResList(resList);
                    LaunchLoad.getInstance().startLoad((p) => {
                        this.binder.setLoadProgress(p);
                    }, () => {
                        cc.director.loadScene("MainScene");
                    })
                } else {
                    this.showRequestError();
                }
            } else {
                this.showRequestError();
            }
        } catch (error) {
            this.showRequestError();
        }
    }

    showRequestError(text?: string) {
        let params: AlertInfo =
        {
            buttonInfos: [{
                btnName: "Try Again", callback: () => {
                    this.requestInit();
                }
            }],
            title: "Error",
            content: text || "Network error, please try again."
        }
        PopupManager.alert(params);
    }

    protected addEvents(): void {
        super.addEvents();
    }

    public hide(data?: any): void {
        super.hide(data);
    }

}