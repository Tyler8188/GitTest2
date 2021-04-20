import { FView } from "../../../../Framework/Core/FView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Tips extends FView {
    @property(cc.Node)
    bg: cc.Node = null;
    @property(cc.Node)
    txtTips: cc.Node = null;
    private time: number = 0.8;

    public init(info: TipInfo): void {
        this.time = info.time || this.time;
        this.txtTips.getComponent(cc.Label).string = info.text
    }

    public show(p: cc.Node, data?: object): void {
        super.show(p, data);
        cc.tween(this.node).by(this.time, { y: 150 }).to(0.3, { opacity: 0 }).call(() => {
            this.hide();
        }).start()
    }


}