import { Application } from "../../../../Framework/Core/Application";
import { Assets } from "../../../../Framework/Core/Assets";
import { ModuleEvent } from "../../../../Framework/Events/ModuleEvent";
import { CacheManager } from "../../../../Framework/Managers/CacheManager";
import { EventManager } from "../../../../Framework/Managers/EventManager";
import { ModuleManager } from "../../../../Framework/Managers/ModuleManager";
import { ResourceManager } from "../../../../Framework/Managers/ResourceManager";
import { StoreManager } from "../../../../Framework/Managers/StoreManager";
import { dispatchFEventWith } from "../../../../Framework/Utility/dx/dispatchFEventWith";
import { Fun } from "../../../../Framework/Utility/dx/Fun";
import { getNodeChildByName } from "../../../../Framework/Utility/dx/getNodeChildByName";
import { ApplicationContext } from "../../Common/ApplicationContext";
import { GameEvent } from "../../Common/GameEvent";
import { ModuleNames } from "../../Common/ModuleNames";
import { LoadSkeletonData } from "../LaunchModule/LaunchConst";
import MainBlock from "./MainBlock";
import { ResType } from "./MainConst";
import MainData from "./MainData";
import { MainModule } from "./MainModule";
import MainPage from "./MainPage";
const { ccclass, property } = cc._decorator;

@ccclass
export default class MainDiscoverPage extends MainPage {
    public banner: cc.Node = null;


    public async init(): Promise<void> {
        let btnAllCategory = getNodeChildByName(this.node, "blockContent/content/btnAllCategory");
        this.banner = getNodeChildByName(this.node, "blockContent/content/banner");
        this.banner.on(cc.Node.EventType.TOUCH_END, this.onClickBanner, this);
        btnAllCategory.on(cc.Node.EventType.TOUCH_END, this.onClicategory, this);
        await super.init();
    }

    private onClickBanner(): void {
        dispatchFEventWith(GameEvent.OpenBookCover, {});
    }

    private onClicategory(): void {
        let mainModel: MainModule = null;
        mainModel = (ModuleManager.GetModule(ModuleNames.MainModule) as MainModule)
        mainModel.enterCategory();
    }

    public async loadUI(): Promise<void> {
        this.loadBannerItems();
        this.loadBlockItems();
    }

    public loadBannerItems() {
        this.banner.removeAllChildren();
        /**只展示一个 */
        let bannerData = MainData.getBannerData()[0];
        if (bannerData.cover.type == ResType.img) {
            if (bannerData.cover.url) {
                this.loadBannerImg(bannerData.cover.url);
            } else {
                this.loadBannerImg("HelloWorld", true);
            }
        } else if (bannerData.cover.type == ResType.spine) {
            if (bannerData.cover.url) {
                this.loadSpineImg(bannerData.cover.url);
            } else {
                this.loadBannerImg("HelloWorld", true);
            }
        }
    }

    private loadBannerImg(url: string, isLocal: boolean = false): void {
        let node: cc.Node = new cc.Node();
        node.setContentSize(cc.size(1080, 500));
        node.addComponent(cc.Sprite)
        node.getComponent(cc.Sprite).sizeMode = cc.Sprite.SizeMode.CUSTOM;
        if (isLocal) {
            ResourceManager.LoadSpriteFrame(url, node.getComponent(cc.Sprite));
        } else {
            ResourceManager.LoadImage(url, node.getComponent(cc.Sprite));
        }
        this.banner.addChild(node);
    }

    private loadSpineImg(url: string): void {
        let iLoadSkeletonData: LoadSkeletonData = CacheManager.GetCache(url);
        let asset = new sp.SkeletonData()
        asset.skeletonJson = iLoadSkeletonData.skeletonJson;
        asset.textures = iLoadSkeletonData.textures
        asset.atlasText = iLoadSkeletonData.atlasText;
        let node: cc.Node = new cc.Node();
        node.addComponent(sp.Skeleton);
        node.getComponent(sp.Skeleton).skeletonData = asset;
        node.getComponent(sp.Skeleton).animation = "animation";
        this.banner.addChild(node);
    }

    private loadBlockItems(): void {
        let blockContent = this.node.getChildByName("blockContent").getChildByName("content");
        let blockDatas = MainData.getBlockData();
        for (let index = 0; index < blockDatas.length; index++) {
            const blockData = blockDatas[index];
            ResourceManager.LoadPrefab('MainModule/MainBlock', Fun((res: string) => {
                let bookItem: cc.Node = StoreManager.NewNode(CacheManager.GetCache(Assets.GetPrefab(res)));
                bookItem.getComponent(MainBlock).show(blockContent, blockData);
                let innerScrollViews = bookItem.getComponent(MainBlock).content.parent.getComponent("NestableScrollViewInner");
                let m_InnerScrollViews = this.node.getChildByName("blockContent").getComponent("NestableScrollViewOuter");
                m_InnerScrollViews.m_InnerScrollViews[index] = innerScrollViews
                innerScrollViews.setOuterScrollView(m_InnerScrollViews);
            }, this));
        }
    }

}