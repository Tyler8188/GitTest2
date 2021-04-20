/*
 * @Author: 
 * @Date: 2021-02-22 19:42:48
 * @Description: 
 * @LastEditTime : 2021-02-22 19:43:42
 * @FilePath: \RomantoryApp\assets\Scripts\Stary\Modules\MainModule\MainBinder.ts
 */

import { Assets } from "../../../../Framework/Core/Assets";
import { FBinder } from "../../../../Framework/Core/FBinder";
import { ModuleEvent } from "../../../../Framework/Events/ModuleEvent";
import { CacheManager } from "../../../../Framework/Managers/CacheManager";
import { EventManager } from "../../../../Framework/Managers/EventManager";
import { ResourceManager } from "../../../../Framework/Managers/ResourceManager";
import { StoreManager } from "../../../../Framework/Managers/StoreManager";
import { JTimer } from "../../../../Framework/Timers/JTimer";
import { dispatchFEventWith } from "../../../../Framework/Utility/dx/dispatchFEventWith";
import { Fun } from "../../../../Framework/Utility/dx/Fun";
import { getNodeChildByName } from "../../../../Framework/Utility/dx/getNodeChildByName";
import { StringUtility } from "../../../../Framework/Utility/StringUtility";
import { GameEvent } from "../../Common/GameEvent";
import { ModuleNames } from "../../Common/ModuleNames";
import { BookShelfItem } from "../BookShelf/BookShelfItem";
import { LoadSkeletonData } from "../LaunchModule/LaunchConst";
import MainBlock from "./MainBlock";
import MainBookItem from "./MainBookItem";
import MainCategoryItem from "./MainCategoryBookItem";
import MainCategoryPage from "./MainCategoryPage";
import { MainPageType, ResType } from "./MainConst";
import MainData from "./MainData";
import MainDiscoverPage from "./MainDiscoverPage";
import MainPage from "./MainPage";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MainBinder extends FBinder {

    private txtTitle: cc.Label;

    private closeBtn: cc.Node;

    private discoverContent: cc.Node;

    private pags: MainPage[] = [];

    private curShowPage: MainPage = null;

    private discoverPage: MainDiscoverPage = null;

    protected initViews(): void {
        super.initViews();
        this.txtTitle = getNodeChildByName(this.asset, "txtTitle", cc.Label);
        this.closeBtn = getNodeChildByName(this.asset, "closeBtn");
        this.discoverContent = getNodeChildByName(this.asset, "discoverContent");
        let categoryContent: cc.Node = getNodeChildByName(this.asset, "categoryContent")
        this.pags[MainPageType.discover] = this.discoverContent.getComponent(MainDiscoverPage);
        this.pags[MainPageType.category] = categoryContent.getComponent(MainCategoryPage);
    }

    /**切换显示页 */
    public changePage(page: MainPageType, data?: any) {
        if (this.curShowPage != null) {
            this.curShowPage.hide();
        }
        if (this.pags[page]) {
            this.pags[page].show(data);
            this.curShowPage = this.pags[page]
        }
    }

    public initShow(): void {
        this.txtTitle.string = "";
        this.addEvents();
        this.changePage(MainPageType.discover);
    }

    protected addEvents(): void {
        this.closeBtn.on(cc.Node.EventType.TOUCH_START, this.closeBtnClick, this);
    }

    private closeBtnClick(): void {
        if (this.curShowPage == this.pags[MainPageType.discover]) {
            EventManager.dispatchEvent(new ModuleEvent(ModuleEvent.HIDE_MODULE, ModuleNames.MainModule));
            cc.director.loadScene("LaunchScene");
        } else if (this.curShowPage == this.pags[MainPageType.category]) {
            this.changePage(MainPageType.discover);
        }

    }
}
