import { Assets } from "../../../../Framework/Core/Assets";
import { CacheManager } from "../../../../Framework/Managers/CacheManager";
import { ModuleManager } from "../../../../Framework/Managers/ModuleManager";
import { ResourceManager } from "../../../../Framework/Managers/ResourceManager";
import { StoreManager } from "../../../../Framework/Managers/StoreManager";
import { Fun } from "../../../../Framework/Utility/dx/Fun";
import { getNodeChildByName } from "../../../../Framework/Utility/dx/getNodeChildByName";
import { ModuleNames } from "../../Common/ModuleNames";
import MainCategoryBookItem from "./MainCategoryBookItem";
import MainCategoryItem from "./MainCategoryBookItem";
import { CategoryStoryData } from "./MainConst";
import MainData from "./MainData";
import { MainModule } from "./MainModule";
import MainPage from "./MainPage";
const { ccclass, property } = cc._decorator;

@ccclass
export default class MainCategoryPage extends MainPage {

    private options: cc.Toggle[] = [];

    private curSelectPageIdx: number = 0;

    private curSelectOptionIdx: number = 0;

    private bookItems: cc.Node[] = [];

    private MainCategoryBookItemPool: cc.NodePool = new cc.NodePool();

    private MainCategoryBookItemPrefab: cc.Prefab = null;

    private static MainCategoryBookItemPath: string = 'MainModule/MainCategoryBookItem';
    private static MainCategoryOptionItemPath: string = 'MainModule/MainCategoryOptionItem';

    public async loadUI(): Promise<void> {
        return new Promise((resolve, reject) => {
            let categoryOptions = MainData.getCategoryOptions()
            for (let index = 0; index < categoryOptions.length; index++) {
                const option = categoryOptions[index];
                ResourceManager.LoadPrefab(MainCategoryPage.MainCategoryOptionItemPath, Fun((res: string) => {
                    let item: cc.Node = StoreManager.NewNode(CacheManager.GetCache(Assets.GetPrefab(res)));
                    item.getChildByName("checkmark").getChildByName("txtTitle").getComponent(cc.Label).string = option.name;
                    item.getChildByName("Background").getChildByName("txtTitle").getComponent(cc.Label).string = option.name;
                    this.node.getChildByName("options").addChild(item);
                    this.options.push(item.getComponent(cc.Toggle));
                    if (index == categoryOptions.length - 1) {
                        ResourceManager.LoadPrefab(MainCategoryPage.MainCategoryBookItemPath, Fun((res: string) => {
                            this.MainCategoryBookItemPrefab = CacheManager.GetCache(Assets.GetPrefab(res))
                            resolve();
                        }, this))
                    }
                }, this));
            }
        })
    }

    public initUI(): void {
        this.initOption();
        this.node.getChildByName("books").on("bounce-bottom", () => {
            this.loadNextPageData();
        })
    }

    public onSelectOption(tg: cc.Toggle): void {
        let idx = this.options.indexOf(tg);
        this.selectOption(idx);
    }

    private loadNextPageData() {
        this.curSelectPageIdx++;
        this.loadCategoryBookItems();
    }

    public selectOption(index: number): void {
        this.curSelectOptionIdx = index;
        this.curSelectPageIdx = 1
        this.storeBookItem();
        this.loadCategoryBookItems()
    }

    private loadCategoryBookItems() {
        let categoryOptions = MainData.getCategoryOptions()
        let categoryOption = categoryOptions[this.curSelectOptionIdx]
        let mainModel: MainModule = ModuleManager.GetModule(ModuleNames.MainModule) as MainModule;
        mainModel.requestGetCategoryStoryList({ categoryId: categoryOption.id, page: this.curSelectPageIdx }, (datas: CategoryStoryData[]) => {
            for (let index = 0; index < datas.length; index++) {
                const data = datas[index];
                let ct = getNodeChildByName(this.node, "books/content");
                let item: cc.Node = this.getCategoryBookItem();
                item.getComponent(MainCategoryBookItem).show(ct, data);
                this.bookItems.push(item);
            }
        });
    }


    private getCategoryBookItem(): cc.Node {
        let node: cc.Node = null;
        if (this.MainCategoryBookItemPool.size() > 0) {
            node = this.MainCategoryBookItemPool.get();
        } else {
            node = cc.instantiate(this.MainCategoryBookItemPrefab);
        }
        return node
    }

    private storeBookItem(): void {
        for (let index = 0; index < this.bookItems.length; index++) {
            const node = this.bookItems[index];
            this.MainCategoryBookItemPool.put(node);
        }
        this.bookItems = [];
    }

    public initOption() {
        this.selectOption(0);
        this.options[0].check();
    }

    onDestroy() {
        CacheManager.RemoveCache(MainCategoryPage.MainCategoryBookItemPath);
        CacheManager.RemoveCache(MainCategoryPage.MainCategoryOptionItemPath);
    }

}