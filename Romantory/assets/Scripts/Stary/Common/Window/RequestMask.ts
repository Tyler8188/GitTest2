// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { FView } from "../../../../Framework/Core/FView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RequestMask extends FView {

    @property(cc.Node)
    sp: cc.Node = null;

    show(p: cc.Node, data?: object) {
        super.show(p, data);
        cc.tween(this.sp).by(2, { angle: -360 }).repeatForever().start()
    }
}
