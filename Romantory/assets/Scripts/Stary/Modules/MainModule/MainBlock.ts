// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { Assets } from "../../../../Framework/Core/Assets";
import { FView } from "../../../../Framework/Core/FView";
import { CacheManager } from "../../../../Framework/Managers/CacheManager";
import { ResourceManager } from "../../../../Framework/Managers/ResourceManager";
import { StoreManager } from "../../../../Framework/Managers/StoreManager";
import { Fun } from "../../../../Framework/Utility/dx/Fun";
import MainBookItem from "./MainBookItem";
import { BlockData, Story } from "./MainConst";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MainBlock extends FView {
    @property(cc.Label)
    txtTitle: cc.Label = null;
    @property(cc.Node)
    more: cc.Node = null;
    @property(cc.Node)
    content: cc.Node = null;

    public show(p: cc.Node, data?: BlockData): void {
        p.insertChild(this.node, 1);
        this.txtTitle.string = data.title;
        this.more.active = data.hasMore;
        this.addItems(data.storyList);
    }

    addItems(datas: Story[]) {
        ResourceManager.LoadPrefab('MainModule/MainBookItem', Fun((res: string) => {
            for (let i = 0; i < datas.length; i++) {
                let bookItem: cc.Node = StoreManager.NewNode(CacheManager.GetCache(Assets.GetPrefab(res)));
                bookItem.getComponent(MainBookItem).show(this.content, datas[i]);
            }
        }, this));
    }

    /**添加事件**/
    protected addEvents(): void {
        super.addEvents();
        this.more.on(cc.Node.EventType.TOUCH_END, this.onClickMore, this);
    }

    private onClickMore(): void {
        cc.log("click more");
    }

}
