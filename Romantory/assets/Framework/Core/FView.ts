import { EventManager } from "../Managers/EventManager";
import { DelayFramer } from "../Timers/DelayFramer";
import { Fun } from "../Utility/dx/Fun";
const { ccclass, property } = cc._decorator;

@ccclass
export class FView extends cc.Component {

    public show(p: cc.Node, data?: object): void {
        if (p != null && this.node != null) {
            if (p != this.node.parent) {
                this.node.removeFromParent();
                p.addChild(this.node);
            }
        }
    }

    public hide(data?: object): void {
        if (this.node)
            this.node.removeFromParent();
    }
    /**添加事件**/
    protected addEvents(): void {
    }
    /**移除事件**/
    protected removeEvents(): void {
        EventManager.removeEvent(this);
    }
    /**启动延时处理**/
    protected invalidate(): void {
        DelayFramer.Push(Fun(this.render, this));//this, this.render);
    }
    /**立即进行延时处理**/
    protected onInvalidate(): void {
        DelayFramer.Remove(Fun(this.render, this));
        this.render();
    }
    /**延时处理方法**/
    protected render(): void {

    }
    public onEnable(): void {
        this.addEvents();
    }
    public onDisable(): void {
        //禁能移除render的呼叫
        DelayFramer.Remove(Fun(this.render, this));
        this.removeEvents();
    }
}