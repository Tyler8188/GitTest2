/*
 * @Author: 
 * @Date: 2021-02-22 19:42:48
 * @Description: 
 * @LastEditTime : 2021-02-22 19:43:42
 * @FilePath: \RomantoryApp\assets\Scripts\Stary\Modules\MainModule\MainBinder.ts
 */

import { FView } from "../../../../Framework/Core/FView";
import { ModuleEvent } from "../../../../Framework/Events/ModuleEvent";
import { dispatchFEventWith } from "../../../../Framework/Utility/dx/dispatchFEventWith";
import { getNodeChildByName } from "../../../../Framework/Utility/dx/getNodeChildByName";
import { GameEvent } from "../../Common/GameEvent";
import { BookShelfInfo } from "./BookShelfInfo";

const { ccclass, property } = cc._decorator;

@ccclass
export class BookShelfItem extends FView {

    private bookIcon: cc.Node = null;

    private bookLabel: cc.Label = null;

    private priceLabel: cc.Label = null;

    private bookInfo: BookShelfInfo = null;

    public onLoad(): void {
        this.bookIcon = getNodeChildByName(this.node, 'BookIcon');
        this.bookLabel = getNodeChildByName(this.node, 'BookLabel', cc.Label);
        this.priceLabel = getNodeChildByName(this.node, 'PriceLabel', cc.Label);
        this.updateShow();
    }

    public initShow(bookInfo: BookShelfInfo): void {
        this.bookInfo = bookInfo;
    }

    protected addEvents(): void {
        super.addEvents();
        this.bookIcon.on(cc.Node.EventType.TOUCH_START, ()=>{
            dispatchFEventWith(GameEvent.OpenBookCover, {});
        }, this)
    }

    public updateShow(): void {
        this.bookLabel.string  = this.bookInfo.name;
        this.priceLabel.string = this.bookInfo.price.toString();
    }
}
