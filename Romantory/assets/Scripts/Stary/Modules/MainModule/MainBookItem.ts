// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { FView } from "../../../../Framework/Core/FView";
import { CacheManager } from "../../../../Framework/Managers/CacheManager";
import { ResourceManager } from "../../../../Framework/Managers/ResourceManager";
import { dispatchFEventWith } from "../../../../Framework/Utility/dx/dispatchFEventWith";
import { Fun } from "../../../../Framework/Utility/dx/Fun";
import { GameEvent } from "../../Common/GameEvent";
import { Story } from "./MainConst";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MainBookItem extends FView {
    @property(cc.Label)
    txtName: cc.Label = null;
    @property(cc.Sprite)
    spBg: cc.Sprite = null;

    private data: Story;

    show(p: cc.Node, data?: Story): void {
        super.show(p, data);
        this.data = data;
        if (data.cover) {
            ResourceManager.LoadImage(data.cover, this.spBg);
        }
        this.txtName.string = data.name
    }

    /**添加事件**/
    protected addEvents(): void {
        this.node.on(cc.Node.EventType.TOUCH_END, this.onClick, this);
    }

    onClick() {
        dispatchFEventWith(GameEvent.OpenBookCover, {});
    }


    // update (dt) {}
}
