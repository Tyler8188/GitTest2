const { ccclass, property } = cc._decorator;

import { FView } from "../../../../Framework/Core/FView";
/**
 * 
 * 弹窗
 * 
 */
@ccclass
export default class Alert extends FView {
    @property(cc.Label)
    txtTitle: cc.Label = null;
    @property(cc.Node)
    bg: cc.Node = null;
    @property(cc.Node)
    lyButtons: cc.Node = null;
    @property(cc.Node)
    txtContent: cc.Node = null;

    public init(params: AlertInfo): void {
        this.setTitle(params.title || "提示");
        this.setContentText(params.content);
        this.setButtonInfos(params.buttonInfos);
    }

    private setTitle(title:string){
        this.txtTitle.string = title;
    }

    private setContentText(content: string) {
        this.txtContent.getComponent(cc.Label).string = content;
    }

    private setButtonInfos(infos: AlertButtonInfo[]): void {
        let childs = this.lyButtons.children;
        for (let index = 0; index < childs.length; index++) {
            let btnInfo = infos[index]
            const child = childs[index];
            if (btnInfo) {
                child.active = true
                child.getChildByName("Label").getComponent(cc.Label).string = btnInfo.btnName
                child.on(cc.Node.EventType.TOUCH_START, () => {
                    if (!btnInfo.callback(btnInfo)) {
                        this.hide();
                    }
                })
            } else {
                child.active = false
            }
        }
    }

}