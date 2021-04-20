import { FBinder } from "../../../../Framework/Core/FBinder";
import { ModuleEvent } from "../../../../Framework/Events/ModuleEvent";
import { EventManager } from "../../../../Framework/Managers/EventManager";
import { getNodeChildByName } from "../../../../Framework/Utility/dx/getNodeChildByName";
import { ModuleNames } from "../../Common/ModuleNames";

export class BookCoverBinder extends FBinder {


    private closeBtn: cc.Node;

    protected initViews(): void {
        super.initViews();
        this.closeBtn = getNodeChildByName(this.asset, "btnClose");
    }

    protected addEvents(): void {
        super.addEvents();
        this.closeBtn.on(cc.Node.EventType.TOUCH_START, this.closeBtnClick, this);
    }


    private closeBtnClick(): void {
        EventManager.dispatchEvent(new ModuleEvent(ModuleEvent.HIDE_MODULE, ModuleNames.BookCoverModule));
    }

}