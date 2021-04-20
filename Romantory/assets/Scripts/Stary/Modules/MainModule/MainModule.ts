/*
 * @Author: 
 * @Date: 2021-02-19 16:44:50
 * @Description: 游戏開始模块
 * @LastEditTime : 2021-02-19 16:45:53
 * @FilePath: \RomantoryApp\assets\Script\Stary\Modules\MainModule\MainModule.ts
 */

import { FModule } from "../../../../Framework/Core/FModule";
import { WebManager } from "../../../../Framework/Managers/WebManager";
import { HttpMethod } from "../../../../Framework/Network/Web/HttpMethod";
import { Fun } from "../../../../Framework/Utility/dx/Fun";
import { ConfigVO } from "../../Common/ConfigVO";
import PopupManager from "../../Common/Window/PopupManager";
import { BookShelfManager } from "../BookShelf/BookShelfManager";
import MainBinder from "./MainBinder";
import { MainPageType, ReqCategoryStoryListParm } from "./MainConst";
import MainData from "./MainData";

export class MainModule extends FModule {
    public static ClassName: string = "MainModule";
    public get assets(): any[] { return ["MainModule/MainBinder"] };
    protected binder: MainBinder = null;
    public constructor() {
        super();
        this.isNeedPreload = false;// 默认不需要预加载资源，只有使用了Mediator管理模块时才起作用
        this.isReleaseAsset = false;// true:销毁模块时释放资源   false:销毁模块时不释放资源
        this.delayReleaseAssetTime = 0;// 销毁模块时延时释放资源，单位ms
    }

    protected createViews(): void {
        super.createViews();
        this.binder = new MainBinder();
    }

    protected showViews(): void {
        super.showViews();
        this.binder.initShow();
    }

    protected hideViews(): void {
        super.hideViews();
    }

    /**进入分类 */
    public enterCategory(): void {
        let url = ConfigVO.testURL + "category/list"
        this._request(url, null, (data) => {
            MainData.setCategoryOptions(data);
            this.binder.changePage(MainPageType.category);
        })
    }

    /**分类书籍列表 */
    public requestGetCategoryStoryList(params: ReqCategoryStoryListParm, callback: Function): void {
        let url = ConfigVO.testURL + "category/storyList"
        this._request(url, params, (data) => {
            callback(data);
        });
    }

    private async _request(url: string, data: any, callback: Function, isShowMask: boolean = true): Promise<void> {
        let result: any = await WebManager.GetWebDataAsync(HttpMethod.GET, url, data, isShowMask);
        if (result) {
            result = JSON.parse(result);
            if (result.code == 1) {
                callback(result.data.list);
            } else {
                PopupManager.tip({ text: "MainModule requst fail code:" + result.code });
            }
        } else {
            PopupManager.tip({ text: "MainModule requst fail" });
        }
    }




}